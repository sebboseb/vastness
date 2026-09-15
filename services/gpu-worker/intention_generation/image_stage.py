"""Pinned local SDXL-Turbo text conditioning and CPU U2NetP alpha preparation."""
import argparse
import json
import os
from pathlib import Path
import time


def main():
    p = argparse.ArgumentParser()
    for name in ['weights', 'output', 'rembg-weights']:
        p.add_argument('--' + name, type=Path, required=True)
    p.add_argument('--seed', type=int, required=True)
    a = p.parse_args()
    os.environ.update(HF_HUB_OFFLINE='1', TRANSFORMERS_OFFLINE='1', U2NET_HOME=str(a.rembg_weights))
    import torch
    import numpy as np
    from diffusers import StableDiffusionXLPipeline
    from rembg import remove, new_session
    prompt = (a.output / 'image-prompt.txt').read_text()
    torch.cuda.reset_peak_memory_stats()
    start = time.monotonic()
    pipe = StableDiffusionXLPipeline.from_pretrained(str(a.weights), torch_dtype=torch.float16,
             variant='fp16', local_files_only=True, use_safetensors=True).to('cuda')
    torch.cuda.synchronize()
    loaded = time.monotonic()
    token_counts = [len(tokenizer(prompt)['input_ids']) for tokenizer in [pipe.tokenizer, pipe.tokenizer_2]]
    image = pipe(prompt=prompt, num_inference_steps=4, guidance_scale=0.0,
                 height=512, width=512, generator=torch.Generator(device='cuda').manual_seed(a.seed)).images[0]
    torch.cuda.synchronize()
    generated = time.monotonic()
    image.save(a.output / 'source-rgb.png')
    session = new_session('u2netp', providers=['CPUExecutionProvider'])
    rgba = remove(image, session=session)
    alpha = np.asarray(rgba)[..., 3]
    foreground = float((alpha > 127).mean())
    if not 0.01 < foreground < 0.98:
        raise ValueError(f'Background extraction yielded implausible foreground fraction {foreground}')
    rgba.save(a.output / 'source-rgba.png')
    metrics = {'loadSeconds': loaded-start, 'generationSeconds': generated-loaded,
        'alphaSeconds': time.monotonic()-generated, 'tokenCounts': token_counts,
        'tokenLimit': pipe.tokenizer.model_max_length, 'promptTruncated': any(n > pipe.tokenizer.model_max_length for n in token_counts),
        'foregroundFraction': foreground, 'torchPeakAllocatedBytes': torch.cuda.max_memory_allocated(),
        'torchPeakReservedBytes': torch.cuda.max_memory_reserved(), 'torchVersion': torch.__version__,
        'torchCudaVersion': torch.version.cuda, 'gpuName': torch.cuda.get_device_name(),
        'alphaMethod': 'rembg2.0.60-u2netp-cpu'}
    (a.output / 'image-metrics.json').write_text(json.dumps(metrics, indent=2)+'\n')


if __name__ == '__main__':
    main()
