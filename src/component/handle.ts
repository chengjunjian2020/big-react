import { FlowNodeOpts } from "@/type/node";
import FlowNode from "./node";

export default class Handle {
  opts: FlowNodeOpts;
  nodeContext?: FlowNode;
  constructor(flowNodeOpts: FlowNodeOpts) {
    this.opts = flowNodeOpts;
  }
}
