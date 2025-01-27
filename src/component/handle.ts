import { FlowNodeData } from "@/type/node";
import { FlowInstance } from "@/type";

export default class Handle {
  flowNodeData: FlowNodeData;
  flowInstance: FlowInstance;
  constructor(flowNodeData: FlowNodeData, flowInstance: FlowInstance) {
    this.flowNodeData = flowNodeData;
    this.flowInstance = flowInstance;
  }
}
