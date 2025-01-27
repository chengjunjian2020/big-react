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

export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export type Coordinate = Array<[number, number]>;
