import { vec3 } from 'gl-matrix';

export class Sierpinski {
  generate(
    size = 20,
    iterations = 2,
    grid = 3,
    holes = [4, 10, 12, 13, 14, 16, 22],
  ) {
    this.size = size;
    this.grid = grid;
    this.iterations = iterations;
    this.holes = holes;
    const divisor = 1 / this.grid;
    let cubeSize = this.size * divisor;
    let positions = [vec3.create()];

    let tmp;
    for (let i = 0; i < this.iterations; i += 1) {
      tmp = [];

      for (let j = 0; j < positions.length; j += 1) {
        const position = positions[j];
        tmp = tmp.concat(
          this.sponge(position, cubeSize, this.grid, this.holes),
        );
      }

      cubeSize *= divisor;

      positions = tmp;
    }

    const centerOffset = this.size / 2 - this.logarithmicScale() / 2;

    positions.forEach(position => {
      position[0] -= centerOffset;
      position[1] -= centerOffset;
      position[2] -= centerOffset;
    });

    return positions;
  }

  sponge(position, cubeSize, grid, holes) {
    let i = 0;
    const positions = [];

    for (let levels = 0; levels < grid; levels += 1) {
      for (let rows = 0; rows < grid; rows += 1) {
        for (let columns = 0; columns < grid; columns += 1) {
          if (!this.inList(i, holes)) {
            const positionNew = vec3.create();
            positionNew[0] = position[0] + rows * cubeSize;
            positionNew[1] = position[1] + levels * cubeSize;
            positionNew[2] = position[2] + columns * cubeSize;
            positions.push(positionNew);
          }
          i += 1;
        }
      }
    }

    return positions;
  }

  inList = (val, list) => {
    let result = false;
    let item;

    for (let i = 0; i < list.length; i += 1) {
      item = list[i];
      if (item === val) {
        result = true;
        break;
      }
    }
    return result;
  };

  logarithmicScale() {
    return this.size / this.grid ** this.iterations;
  }
}

export const jerusalem = [
  7,
  11,
  12,
  13,
  17,
  27,
  32,
  35,
  36,
  37,
  38,
  39,
  42,
  47,
  51,
  52,
  53,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  71,
  72,
  73,
  77,
  81,
  82,
  83,
  85,
  86,
  87,
  88,
  89,
  91,
  92,
  93,
  97,
  107,
  111,
  112,
  113,
  117
];
