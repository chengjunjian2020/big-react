import {
  FLOW_NODE_HANDLE_TYPE,
  FlowNodeColor,
  FlowNodeHandleType,
  FlowNodeSize,
  FlowTextProperty,
} from "@/config/default";
import { FlowInstance } from "@/type";
import { FlowNodeData } from "@/type/node";
import Konva from "konva";
import Handle from "./handle";

export default class FlowNode extends Handle {
  graphics = new Konva.Group();
  topPoint: number[] = [];
  bottomPoint: number[] = [];
  constructor(flowNodeData: FlowNodeData, flowInstance: FlowInstance) {
    super(flowNodeData, flowInstance);
    this.flowInstance = flowInstance;
    this.updateChildren();
  }
  updateChildren() {
    const node = this.flowNodeData;
    const graphics = this.graphics;
    graphics.position({ x: node.position.x, y: node.position.y });

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
      verticalAlign: FlowTextProperty.VERTICAL_ALIGN,
    });
    const topCirclePoint = new Konva.Circle({
      radius: FlowNodeSize.RADIUS_SIZE,
      x: rect.width() / 2,
      y: 0,
      fill: FlowNodeColor.CIRCLE_COLOR,
    });
    topCirclePoint.setAttr(FLOW_NODE_HANDLE_TYPE, FlowNodeHandleType.TARGET);
    this.topPoint = Object.values(topCirclePoint.getPosition());
    const bottomCirclePoint = new Konva.Circle({
      radius: FlowNodeSize.RADIUS_SIZE,
      x: rect.width() / 2,
      y: rect.height(),
      fill: FlowNodeColor.CIRCLE_COLOR,
    });
    bottomCirclePoint.setAttr(FLOW_NODE_HANDLE_TYPE, FlowNodeHandleType.SOURCE);
    this.bottomPoint = Object.values(bottomCirclePoint.getPosition());

    if (!node.isFirstNode) {
      graphics.add(topCirclePoint);
    }
    if (!node.isLastNode) {
      graphics.add(bottomCirclePoint);
    }
    graphics.add(rect);
    graphics.add(text);
  }
  render() {
    this.flowInstance.layer.add(this.graphics);
  }
}
