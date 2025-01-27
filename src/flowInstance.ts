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
const flowInstanceMap: { [key in string]: FlowInstance } = {};
function createFlowInstance(viewOpts: ViewProps) {
  if (!flowInstanceMap[viewOpts.id]) {
    const flowInstance = new FlowInstance(viewOpts);
    return flowInstance;
  }
  return flowInstanceMap[viewOpts.id];
}
export { flowInstanceMap, createFlowInstance };
