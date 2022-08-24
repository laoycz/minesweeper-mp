import Matrix from "./Matrix";
import _ from "lodash";

export function distribute(minesCount: number, width: number, height: number) {
  const a = Array(minesCount).fill(-1);
  const b = Array(width * height - minesCount).fill(0);
  const c = a.concat(b);
  return _.chunk(_.shuffle(c), width);
}

export function fill(matrix: Matrix<number>) {
  return matrix.map((value, i) => {
    if (value == -1) return -1;
    return matrix
      .neighbors(i)
      .map((a) => matrix.get(a))
      .filter((a) => a == -1).length;
  });
}

export type status = "close" | "open" | "flag";
export function fillStatus(matrix: Matrix<number>) {
  return matrix.map((value) => {
    return [value, "close"] as [number, status];
  });
}
