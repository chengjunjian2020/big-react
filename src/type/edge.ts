// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FlowEdgeData<P = any> {
  id: string;
  source: string;
  target: string;
  _path?: Array<P>;
}
