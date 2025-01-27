import "./style.css";
import { FlowInstance, ViewProps } from "./type";
import { FlowNodeData } from "./type/node";
import { createFlowInstance } from "./flowInstance";
import FlowNode from "./component/node";
import Konva from "konva";
import { FlowEdgeData } from "./type/edge";
import FlowEdge from "./component/edge";

export default class FlowGraphic {
  flowInstance: FlowInstance;
  nodes: FlowNode[] = [];
  private nodesMap: { [key in string]: FlowNode } = {};
  flowEdges: FlowEdge[] = [];

  constructor(viewOpts: ViewProps) {
    this.flowInstance = createFlowInstance(viewOpts);
  }

  buildNodeFromData(nodeData: FlowNodeData[]) {
    for (const i in nodeData) {
      const data = nodeData[i];
      const node = new FlowNode(
        {
          ...data,
          isFirstNode: data.id === nodeData[0]?.id,
          isLastNode: data.id === nodeData[nodeData.length - 1]?.id,
        },
        this.flowInstance
      );
      this.nodes.push(node);
      this.nodesMap[data.id] = node;
    }
  }
  buildEdge(edges: FlowEdgeData[]) {
    for (const edge of edges) {
      const edgeInstance = new FlowEdge(edge, this.nodesMap, this.flowInstance);
      this.flowEdges.push(edgeInstance);
    }
  }

  setEdges(edges: FlowEdge[]) {
    this.flowEdges = edges;
  }

  render() {
    for (const node of this.nodes) {
      node.render();
    }
    for (const edge of this.flowEdges) {
      console.log(edge);
      edge.render();
    }
  }
}
