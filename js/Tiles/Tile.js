class Tile {
  /**
   *
   * @param {char} tile - character of tile
   * returns true if it is included
   */
  static isSolid(tile) {
    return ["B", "+", "-", "G", "Q", "L", "A"].includes(tile);
  }

  /**
   *
   * @param {char} tile - character of tile
   * returns true if it is included
   */
  static isPickable(tile) {
    return ["T", "P", "D", "R", "J", "Z", "C", "Y", "E"].includes(tile);
  }

  /**
   *
   * @param {char} tile - character of tile
   * returns true if it is included
   */
  static isLethal(tile) {
    return ["W", "F", "S", "f"].includes(tile);
  }

  /**
   *
   * @param {char} tile - character of tile
   * returns values of given tile
   */
  static scoreValue(tile) {
    if (!["P", "D", "R", "E", "C", "Y", "T"].includes(tile)) return 0;

    const values = {
      C: 345,
      D: 55,
      E: 221,
      P: 50,
      R: 175,
      T: 1000,
      Y: 500,
    };

    return values[tile];
  }
}

Tile.size = 32;
