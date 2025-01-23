import {
  FlowNodeColor,
  FlowNodeSize,
  FlowTextProperty,
} from "@/config/default";
import { flowInstance } from "@/flowInstance";
import { FlowNodeData, FlowNodeOpts } from "@/type/node";
import Konva from "konva";
import Handle from "./handle";

export default class FlowNode extends Handle {
  nodeData: FlowNodeData;
  shape: Konva.Group;
  constructor(data: FlowNodeData, flowNodeOpts: FlowNodeOpts) {
    super(flowNodeOpts);
    this.nodeContext = this;
    this.shape = new Konva.Group({
      ...data.position,
    });
    this.nodeData = data;
  }
  render() {
    const node = this.nodeData;
    const { layer } = flowInstance;
    const group = new Konva.Group({
      ...node.position,
    });
    const rect = new Konva.Rect({
      strokeWidth: FlowNodeSize.STORE_WIDTH,
      stroke: FlowNodeColor.STORE_COLOR,
      width: FlowNodeSize.WIDTH,
      height: FlowNodeSize.HEIGHT,
    });
    const text = new Konva.Text({
      text: node.data?.label || "",
      width: FlowNodeSize.WIDTH,
      height: FlowNodeSize.HEIGHT,
      fontSize: FlowNodeSize.FONT_SIZE,
      padding: FlowTextProperty.PADDING,
      align: FlowTextProperty.ALIGN,
      verticalAlign: FlowTextProperty.VERCTIL_ALIGN,
    });
    group.add(rect);
    group.add(text);
    layer.add(group);
  }
}
