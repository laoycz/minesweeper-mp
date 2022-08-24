import Matrix from "./Matrix";
import { distribute, fill, fillStatus } from "./Zone";

export type status = "play" | "win" | "lose";

class Game {
  public zone;
  public status: status;

  constructor() {
    const matrix = new Matrix(distribute(99, 16, 30));
    this.zone = fillStatus(fill(matrix));
    this.status = "play";
  }

  open([x, y]: [number, number]) {
    if (this.status != "play") return;

    const [number, status] = this.zone.get([x, y]);
    if (status == "open") {
      if (
        number ==
        this.zone
          .neighbors([x, y])
          .filter(([ix, iy]) => this.zone.get([ix, iy])[1] == "flag").length
      ) {
        this.zone
          .neighbors([x, y])
          .filter(([ix, iy]) => this.zone.get([ix, iy])[1] == "close")
          .forEach(([ix, iy]) => {
            this.open([ix, iy]);
          });
      }
      return;
    }

    if (status == "close") {
      this.zone.set([x, y], [number, "open"]);

      if (number == -1) {
        this.lose();
      }
      if (number == 0) {
        this.zone
          .neighbors([x, y])
          .filter(([ix, iy]) => this.zone.get([ix, iy])[1] == "close")
          .forEach(([ix, iy]) => {
            this.open([ix, iy]);
          });
      }
    }

    const strip = this.zone.matrix.flat();
    if (
      strip.filter((a) => a[0] != -1).filter((a) => a[1] != "close").length == 0
    ) {
      this.win();
    }
  }

  flag([x, y]: [number, number]) {
    const [number, status] = this.zone.get([x, y]);
    if (status == "open") return this.open([x, y]);
    if (status == "close") {
      return this.zone.set([x, y], [number, "flag"]);
    }
    if (status == "flag") {
      return this.zone.set([x, y], [number, "close"]);
    }
  }

  win() {
    this.status = "win";
  }

  lose() {
    this.status = "lose";
  }
}

export default Game;
