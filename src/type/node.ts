import BaseNode from "@/component/BaseNode";
import { FlowInstance } from ".";

export interface FlowNodeData {
  id: string;
  type?: string;
  data?: {
    label?: string;
    src?: string;
  };
  position: {
    x: number;
    y: number;
  };
  isFirstNode?: boolean;
  isLastNode?: boolean;
}
export interface FlowNodeOpts {
  isFirstNode?: boolean;
  isLastNode?: boolean;
}
export type BaseNodeConstructor = new (
  flowNodeData: FlowNodeData,
  flowInstance: FlowInstance
) => BaseNode;

export interface FlowNodeCustom {
  type: string;
  component: BaseNodeConstructor;
}
