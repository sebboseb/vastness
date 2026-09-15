import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as pc from 'playcanvas';
import {buildThresholdView} from './threshold-view.ts';
import {acceptComposition,express,freshWorld} from './threshold-state.ts';
test('semantic fixture reveals detail on approach and safely resets after Seek',t=>{
 const canvas={id:'threshold-fixture-check',width:800,height:600};const app=new pc.AppBase(canvas as HTMLCanvasElement);const options=new pc.AppOptions();options.graphicsDevice=new pc.NullGraphicsDevice(canvas);options.componentSystems=[pc.RenderComponentSystem];options.resourceHandlers=[];app.init(options);t.after(()=>app.destroy());
 const view=buildThresholdView(app as pc.Application),seek=acceptComposition(express(freshWorld(),'seek',[0,1.65,-9]));view.compose(seek);view.update(seek,1,[0,1.65,-9]);const focus=view.result.findByName('revealed focus') as pc.Entity;assert.equal(focus.enabled,false);view.update(seek,1,[0,1.65,-20]);assert.equal(focus.enabled,true);const mark=focus.children[0] as pc.Entity;assert.ok((mark.render!.meshInstances[0].material as pc.StandardMaterial).opacity>.9);
 const seekHeight=Math.max(...view.result.children.map(e=>e.getLocalPosition().y));
 const ascend=acceptComposition(express(freshWorld(),'ascend',[0,1.65,-9]));view.compose(ascend);view.update(ascend,1,[0,1.65,-9]);assert.ok(Math.max(...view.result.children.map(e=>e.getLocalPosition().y))>seekHeight+1);
 view.compose(seek);view.compose(freshWorld());assert.doesNotThrow(()=>view.update(freshWorld(),0,[0,1.65,-9]));assert.equal(view.result.enabled,false);
});
