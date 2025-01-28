import { Coordinate, FlowInstance } from "@/type";
import { FlowNodeData } from "@/type/node";
import Konva from "konva";

abstract class BaseNode {
  flowNodeData: FlowNodeData;
  flowInstance: FlowInstance;
  abstract graphics: Konva.Group;
  abstract sourcePoint: Coordinate;
  abstract targetPoint: Coordinate;
  abstract updateChildren(): void;
  abstract render(): void;
  constructor(flowNodeData: FlowNodeData, flowInstance: FlowInstance) {
    this.flowNodeData = flowNodeData;
    this.flowInstance = flowInstance;
  }
}

export default BaseNode;
