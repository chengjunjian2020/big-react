import "./style.css";
import { FlowInstance, ViewProps } from "./type";
import { BaseNodeConstructor, FlowNodeCustom, FlowNodeData } from "./type/node";
import { createFlowInstance } from "./flowInstance";
import FlowNode from "./component/node";
import { FlowEdgeData } from "./type/edge";
import FlowEdge from "./component/edge";
import BaseNode from "./component/BaseNode";

export default class FlowGraphic {
  flowInstance: FlowInstance;
  nodes: BaseNode[] = [];
  private nodesMap: { [key in string]: BaseNode } = {};
  flowEdges: FlowEdge[] = [];
  customNodeMap: { [key in string]: BaseNodeConstructor } = {};

  constructor(viewOpts: ViewProps) {
    this.flowInstance = createFlowInstance(viewOpts);
  }
  addNodeType(nodes: FlowNodeCustom | FlowNodeCustom[]) {
    const tempNodeList = Array.isArray(nodes) ? nodes : [nodes];
    for (const flowNode of tempNodeList) {
      this.customNodeMap[flowNode.type] = flowNode.component;
    }
  }
  buildNodeFromData(nodeData: FlowNodeData[]) {
    for (const i in nodeData) {
      const data = nodeData[i];
      const { customNodeMap } = this;
      let node;
      if (customNodeMap[data.type as string]) {
        node = new customNodeMap[data.type as string](data, this.flowInstance);
      } else {
        node = new FlowNode(
          {
            ...data,
            isFirstNode: data.id === nodeData[0]?.id,
            isLastNode: data.id === nodeData[nodeData.length - 1]?.id,
          },
          this.flowInstance
        ) as BaseNode;
      }

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
      edge.render();
    }
  }
}
