import { FlowInstance } from "@/type";
import { FlowEdgeData } from "@/type/edge";
import Konva from "konva";
import FlowNode from "./node";
import { getBezierPath } from "@/utils/bezier-edge";
import { FlowEdgeSize, FlowNodeColor } from "@/config/default";

export default class FlowEdge {
  flowEdgeData: FlowEdgeData;
  flowInstance: FlowInstance;
  graphics = new Konva.Group();
  nodesMap: { [key in string]: FlowNode } = {};

  constructor(
    flowEdge: FlowEdgeData,
    nodesMap: { [key in string]: FlowNode },
    flowInstance: FlowInstance
  ) {
    this.flowEdgeData = flowEdge;
    this.flowInstance = flowInstance;
    this.nodesMap = nodesMap;
    this.updateChildren();
  }
  updateChildren() {
    const flowEdge = this.flowEdgeData;
    const sourceNode = this.nodesMap[flowEdge.source];
    const targetNode = this.nodesMap[flowEdge.target];
    const sourcePoint = sourceNode.bottomPoint;
    const targetPoint = sourceNode.topPoint;
    const [points] = getBezierPath({
      sourceX: sourcePoint[0] + sourceNode.graphics.getPosition().x,
      sourceY: sourcePoint[1] + sourceNode.graphics.getPosition().y,
      targetX: targetPoint[0] + targetNode.graphics.getPosition().x,
      targetY: targetPoint[1] + targetNode.graphics.getPosition().y,
    });
    const line = new Konva.Line({
      points: points.flat(),
      strokeWidth: FlowEdgeSize.LINE_WIDTH,
      stroke: FlowNodeColor.LINE_COLOR,
      bezier: true,
    });
    // 启动动画
    this.graphics.add(line);
  }
  render() {
    this.flowInstance.layer.add(this.graphics);
  }
}
