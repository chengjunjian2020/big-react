import Konva from "konva";
import { ViewProps } from "./type";

class FlowInstance {
  graphic: Konva.Stage;
  layer: Konva.Layer;
  constructor(viewOpts: ViewProps) {
    const stage = new Konva.Stage({
      container: viewOpts.id,
      width: viewOpts.width,
      height: viewOpts.height,
    });
    const layer = new Konva.Layer();
    stage.add(layer);
    this.graphic = stage;
    this.layer = layer;
  }
}
let flowInstance: FlowInstance;
function createFlowInstance(viewOpts: ViewProps) {
  if (!flowInstance) {
    flowInstance = new FlowInstance(viewOpts);
    return flowInstance;
  }
  return flowInstance;
}
export { flowInstance, createFlowInstance };
