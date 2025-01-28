import {
  FlowNodeColor,
  FlowNodeSize,
  FlowTextProperty,
} from "@/config/default";
import { Coordinate, FlowInstance } from "@/type";
import { FlowNodeData } from "@/type/node";
import Konva from "konva";
import Handle from "./handle";
import BaseNode from "./BaseNode";

export default class FlowNode extends Handle implements BaseNode {
  graphics = new Konva.Group();
  sourcePoint: Coordinate = [];
  targetPoint: Coordinate = [];
  constructor(flowNodeData: FlowNodeData, flowInstance: FlowInstance) {
    super(flowNodeData, flowInstance);
    this.updateChildren();
  }
  getShapeGraphics() {
    const rect = new Konva.Rect({
      strokeWidth: FlowNodeSize.STORE_WIDTH,
      stroke: FlowNodeColor.STORE_COLOR,
      width: FlowNodeSize.WIDTH,
      height: FlowNodeSize.HEIGHT,
    });
    return rect;
  }
  getShapeText() {
    const node = this.flowNodeData;
    const text = new Konva.Text({
      text: node.data?.label || "",
      width: FlowNodeSize.WIDTH,
      height: FlowNodeSize.HEIGHT,
      fontSize: FlowNodeSize.FONT_SIZE,
      padding: FlowTextProperty.PADDING,
      align: FlowTextProperty.ALIGN,
      verticalAlign: FlowTextProperty.VERTICAL_ALIGN,
    });
    return text;
  }
  updateChildren() {
    const node = this.flowNodeData;
    const graphics = this.graphics;
    graphics.position({ x: node.position.x, y: node.position.y });

    const rect = this.getShapeGraphics();
    const text = this.getShapeText();

    const topCirclePoint = new Konva.Circle({
      radius: FlowNodeSize.RADIUS_SIZE,
      x: rect.width() / 2,
      y: 0,
      fill: FlowNodeColor.CIRCLE_COLOR,
    });
    const targetPoint = Object.values(topCirclePoint.getPosition());
    this.targetPoint = [[targetPoint[0], targetPoint[1]]];
    const bottomCirclePoint = new Konva.Circle({
      radius: FlowNodeSize.RADIUS_SIZE,
      x: rect.width() / 2,
      y: rect.height(),
      fill: FlowNodeColor.CIRCLE_COLOR,
    });
    const sourcePoint = Object.values(bottomCirclePoint.getPosition());
    this.sourcePoint = [[sourcePoint[0], sourcePoint[1]]];

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
