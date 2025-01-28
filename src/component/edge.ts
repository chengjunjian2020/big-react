import { FlowInstance } from "@/type";
import { FlowEdgeData } from "@/type/edge";
import Konva from "konva";
import { getBezierPath } from "@/utils/bezier-edge";
import { FlowEdgeSize, FlowNodeColor } from "@/config/default";
import BaseNode from "./BaseNode";

export default class FlowEdge {
  flowEdgeData: FlowEdgeData;
  flowInstance: FlowInstance;
  graphics = new Konva.Group();
  nodesMap: { [key in string]: BaseNode } = {};

  constructor(
    flowEdge: FlowEdgeData,
    nodesMap: { [key in string]: BaseNode },
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
    const { sourcePoint } = sourceNode;
    const { targetPoint } = sourceNode;
    for (const i in sourcePoint) {
      const [points] = getBezierPath({
        sourceX: sourcePoint[i][0] + sourceNode.graphics.getPosition().x,
        sourceY: sourcePoint[i][1] + sourceNode.graphics.getPosition().y,
        targetX: targetPoint[i][0] + targetNode.graphics.getPosition().x,
        targetY: targetPoint[i][1] + targetNode.graphics.getPosition().y,
      });
      const line = new Konva.Line({
        points: points.flat(),
        strokeWidth: FlowEdgeSize.LINE_WIDTH,
        stroke: FlowNodeColor.LINE_COLOR,
        bezier: true,
      });
      this.graphics.add(line);
    }
  }
  render() {
    this.flowInstance.layer.add(this.graphics);
  }
}
