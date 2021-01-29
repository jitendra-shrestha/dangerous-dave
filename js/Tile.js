class Tile {
  static isSolid(tile) {
    return ['B', '+', '-', 'G', 'Q', 'L','A'].includes(tile);
  }

  static isPickable(tile) {
    return ['T', 'P', 'D', 'R', 'J', 'Z', 'C', 'Y', 'E'].includes(tile);
  }

  static isLethal(tile) {
    return ['W', 'F', 'S','f'].includes(tile);
  }

  static scoreValue(tile) {
    if (!['P', 'D', 'R', 'E', 'C', 'Y', 'T'].includes(tile)) return 0;

    const values = {
      
      C: 300,
      D: 100,
      E: 200,
      P: 50,
      R: 150,
      T: 1000,
      Y: 500
      
    }

    return values[tile];
  }
}

Tile.size = 32;
