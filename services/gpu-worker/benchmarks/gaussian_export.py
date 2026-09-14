"""Export the pinned TRELLIS Gaussian representation into the worker frame."""


def save_gaussian_ply(gaussian, path, transform):
    import numpy as np
    from plyfile import PlyData

    # PLY stores opacity logits. The pinned upstream writer unnecessarily computes
    # logit(sigmoid(z)); float32 sigmoid rounds large finite z to 0/1, yielding
    # infinities. Preserve the original z, including the model's opacity bias.
    logits = (gaussian._opacity + gaussian.opacity_bias).detach().cpu().numpy().reshape(-1)
    if not np.isfinite(logits).all():
        raise ValueError('Model produced nonfinite opacity logits')
    gaussian.save_ply(str(path), transform=transform)
    # Disable mmap before rewriting the same file; keep every other exported field.
    ply = PlyData.read(str(path), mmap=False)
    vertices = ply['vertex'].data
    if len(vertices) != len(logits):
        raise ValueError('Gaussian export changed the opacity record count')
    vertices['opacity'] = logits
    ply.write(str(path))
