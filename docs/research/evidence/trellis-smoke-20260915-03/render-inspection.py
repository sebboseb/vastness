import os,sys,json,math
from pathlib import Path
os.environ['ATTN_BACKEND']='xformers'
sys.path.insert(0,'/home/vastness/.local/share/vastness-benchmarks/trellis-20260915-02/src/TRELLIS')
import numpy as np
import torch,utils3d,trimesh
from plyfile import PlyData
from PIL import Image,ImageDraw
from trellis.representations import Gaussian,MeshExtractResult
from trellis.utils.render_utils import render_frames
p=Path('/home/vastness/.local/share/vastness-worker/shared/data/artifacts/trellis-smoke-20260915-03')
data=PlyData.read(p/'scene.ply')['vertex'].data
def tensor(names):return torch.tensor(np.column_stack([data[n] for n in names]),device='cuda',dtype=torch.float32)
g=Gaussian(aabb=[0,0,0,1,1,1],scaling_bias=1.,opacity_bias=.5,mininum_kernel_size=0.)
g.from_xyz(tensor(['x','y','z']));g._features_dc=tensor(['f_dc_0','f_dc_1','f_dc_2']).unsqueeze(1)
g._scaling=tensor(['scale_0','scale_1','scale_2']);g.from_rotation(tensor(['rot_0','rot_1','rot_2','rot_3']));g._opacity=tensor(['opacity'])
assert g._features_dc.shape == (len(data),1,3)
assert g._scaling.shape == (len(data),3) and g._opacity.shape == (len(data),1)
mesh=trimesh.load(p/'collider.glb',force='mesh',process=False)
m=MeshExtractResult(torch.tensor(np.asarray(mesh.vertices),dtype=torch.float32,device='cuda'),torch.tensor(np.asarray(mesh.faces),dtype=torch.int64,device='cuda'))
views=[('Front',[0,0,2]),('Side',[2,0,0]),('Back',[0,0,-2]),('Oblique',[1.6,.7,1.6])]
extr=[utils3d.torch.extrinsics_look_at(torch.tensor(pos,dtype=torch.float32,device='cuda'),torch.zeros(3,device='cuda'),torch.tensor([0.,1.,0.],device='cuda')) for _,pos in views]
fov=torch.tensor(math.radians(40),device='cuda');intr=[utils3d.torch.intrinsics_from_fov_xy(fov,fov)]*len(views)
opts={'resolution':512,'bg_color':(.07,.095,.125),'near':.1,'far':10.,'ssaa':1}
with torch.no_grad():
 splats=render_frames(g,extr,intr,opts,verbose=False)['color']
 surfaces=render_frames(m,extr,intr,opts,verbose=False)['normal']
out=Image.new('RGB',(2048,1120),(18,24,32));draw=ImageDraw.Draw(out)
draw.text((20,12),'TRELLIS real GPU rasterization: exported Gaussian PLY / raw mesh GLB, matching cameras',fill='white')
for i,(label,_) in enumerate(views):
 draw.text((i*512+20,38),label,fill='white');out.paste(Image.fromarray(splats[i]),(i*512,62));out.paste(Image.fromarray(surfaces[i]),(i*512,574))
draw.text((20,1095),'Top: anisotropic Gaussian rasterizer. Bottom: mesh normals. Model units; collision and metre scale unassessed.',fill='white')
out.save(p/'gpu-render-inspection.png')
print(json.dumps({'status':'rendered','views':views,'resolution':512,'gaussians':len(data),'meshTriangles':len(mesh.faces),'cameraUp':[0,1,0],'near':.1,'far':10,'fovDegrees':40}))
