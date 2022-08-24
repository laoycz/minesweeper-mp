class Matrix<T> {
  public matrix: T[][];
  width: number;
  height: number;

  constructor(matrix: T[][]) {
    this.matrix = matrix;
    this.width = matrix[0].length;
    this.height = matrix.length;
  }

  neighbors([x, y]: [number, number]) {
    return (
      [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ] as [number, number][]
    ).filter(
      ([ix, iy]) => ix >= 0 && iy >= 0 && ix < this.width && iy < this.height
    );
  }

  get([x, y]: [number, number]) {
    return this.matrix[y][x];
  }

  set([x, y]: [number, number], value: T) {
    this.matrix[y][x] = value;
  }

  map<T1>(func: (value: T, i: [number, number]) => T1) {
    return new Matrix(
      this.matrix.map((row, y) => row.map((cell, x) => func(cell, [x, y])))
    );
  }
}

export default Matrix;
