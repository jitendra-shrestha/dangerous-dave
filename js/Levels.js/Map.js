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
          'GD   D   Z    D    D   D    D       D         D   D                 GGGGGGGGGG  GGGGGGGGGGGG',
          'G                                                           G  G    C           GGGGGGGGGGGG',
          'G+   S   S   SS    S   S   S   S   S     SS   S   S   S             Y           GGGGGGGGGGGG',
          'GQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQff      ffG/         GGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGff    ffG/          GGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGffJTffG/         GGGGGGGGGGGGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGFFFFFFFFFGGGGGGGGGGGGGGG'
        ],
        enemies: [
          {
            x: 37,
            y: 3.5
          },
          {
            x: 55,
            y: 3.5
          }
        ]
      },
      {
        player: {
          x: 1,
          y: 5
        },
        tiles: [
          'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
          'L     TL    D       D    D   D            D  D LR      D   D  D            DL D D  D  D  D D  D  DCLLLLLLLLLLL',
          'L  LLLLL            L              LLL LLLLLLL    WLLLLLLL        DWLLW L  DL LLLLLLLLLLLLL      =LLLLLLLLLLLL',
          'LL       LLL LLLL      L   LLLLL            DL    LL   D     LLL LLL  LDL  DL D                LLLLLLLLLLLLLLL',
          'L*L    LLLD       L        D       L  LD             LLLLLW   L      JLDL  DLLLLLD L LS     L     LLLLLLLLLLLL',
          'L LffLLLD            L  LL         L  LLLLL    LLLLL LR DLWL    L   LLLDL       LL L DLSSSE  SSL  LLLLLLLLLLLL',
          'L DLLLD    L    L  L    LL    LLL  L           L     LW  DWL    LL LL   L  LLLSYL  L  DLLLL  LLLL LLLLLLLLLLLL',
          'L        LLLL   L      LLLL        L  LLLLL L  L LLLLLL LLLL  L              LLLL LL          DL  LLLLLLLLLLLL',
          'L       LLLLLL  L     LLLLLL       L                          L      L  L                        LLLLLLLLLLLLL',
          'LLLLLLLLLLLLLLLLLLLLLLLLLLLLFFFFFFFLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL'
        ],
      }
    ];

    return this.maps[level];
  }
}
