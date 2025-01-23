import Konva from "konva";

export interface ViewProps {
  width: number;
  height: number;
  id: string;
}
export interface FlowInstance {
  graphic: Konva.Stage;
  layer: Konva.Layer;
}
