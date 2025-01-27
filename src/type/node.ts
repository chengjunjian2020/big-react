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
