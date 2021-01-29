class LevelMap {
  constructor(level) {
    this.maps = [
      {
        player: {
          x: 2,
          y: 8
        },
        tiles: [
          'BBBBBBBBBBBBBBBBBBBG',
          'BP               RBG',
          'B  D   D   T   D  BG',
          'B  B   B   B   B  BG',
          'BD   D   D   D   DBG',
          'BB   B   B   B   BBG',
          'BD     D          BG',
          'B   BBBB   BBBBBB BG',
          'B+         B=     BG',
          'BBBBBBBBBBBBBBBBBBBG'
        ]
      },
      {
        player: {
          x: 1,
          y: 8
        },
        tiles: [
          'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB      ',
          'BR     D            P         BB               =BB      ',
          'B                       BBBBB BB BBBBBBBBBBBBBBBBB      ',
          'B-  -        -         BB     BB     BSSS  SS SS        ',
          'B       ---   B       BB  BBBBBBBBB  BS S S   S S       ',
          'B --     B   TB ----- B  BB PB    B  BSSS S   SS        ',
          'B        B -  B       B B    B  B B BBS   S   S S       ',
          'B   --- RB    B DDDDD B B BB B BB    BS    SS S S       ',
          'B        BD  -B       B   BP   PB  BPB                  ',
          'BBBFFFFFFBFFFFBWWWWWWWBBBBBBBBBBBBBBBBFFFFFFFFFFFF      '
        ]
      },
      {
        player: {
          x: 2,
          y: 5
        },
        tiles: [
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGA Y \\GGGGGGGGGGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGE    =GA  Y \\GGGGGGGGGGGGGGGGGG',
          'GQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ         GA Y Y  Y   GGGGGGGGGGGG',
          'GD   D   Z    D    D   D    D       D   D    D    D     D           GGGGGGGGGG  GGGGGGGGGGGG',
          'G                                                           G  G    C           GGGGGGGGGGGG',
          'G+   S   S   SS    S   S   S   S    S   SS   S   S   S               Y          GGGGGGGGGGGG',
          'GQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQff      ffG/         GGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGff    ffG/          GGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGffJTffG/         GGGGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGFFFFFFFFFGGGGGGGGGGGGGGG'
        ],
      }
    ];

    return this.maps[level];
  }
}
