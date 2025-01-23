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
}
export interface FlowNodeOpts {
  isFirstNode?: boolean;
  isLastNode?: boolean;
}
