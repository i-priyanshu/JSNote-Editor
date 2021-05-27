export type CellTypes = "code" | "text";

export interface Cell {
  id: string;
  type: "code" | "text";
  content: string;
}
