import Konva from "konva";
import "./style.css";
import { FlowInstance, ViewProps } from "./type";
import { FlowNodeData } from "./type/node";
import { FlowEdges } from "./type/edge";
import {
  FlowNodeColor,
  FlowNodeSize,
  FlowTextProperty,
} from "./config/default";
import { createFlowInstance } from "./flowInstance";

export default class FlowGraphic {
  flowInstance: FlowInstance;
  flowNodes: FlowNodeData[] = [];
  FlowEdges: FlowEdges[] = [];
  constructor(viewOpts: ViewProps) {
    this.flowInstance = createFlowInstance(viewOpts);
  }
  setNodes(nodes: FlowNodeData[]) {
    this.flowNodes = nodes;
  }
  setEdges(edges: FlowEdges[]) {
    this.FlowEdges = edges;
  }
  render() {
    this.renderNode();
  }
  renderNode() {
    //绘制整个流程图  然后支持html填充
    const { layer } = this.flowInstance;
    for (const i in this.flowNodes) {
      const node = this.flowNodes[i];
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
      const point = new Konva.Circle({
        x: rect.width() / 2,
        y: Number(i) === this.flowNodes.length - 1 ? 0 : rect.height(),
        radius: FlowNodeSize.radiusSize,
        fill: FlowNodeColor.CIRCLE_COLOR,
      });
      group.add(rect);
      group.add(text);
      group.add(point);
      layer.add(group);
    }
  }
}
