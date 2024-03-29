﻿(function() {
  'use strict';
  var BLOCK_X0, BLOCK_Y0, Blast, Block, FIELD_H, FIELD_W, GAME_FPS, GAME_H, GAME_W, IMAGE_URL, MARGIN_X, MARGIN_Y, NUM_BLOCKTYPE, PIECE_W, Piece, TYPE_I, TYPE_J, TYPE_L, TYPE_O, TYPE_S, TYPE_T, TYPE_Z, createField, fPiece, field, game, initPlay, lineCheck, lineFall, lineFlag, mx2pos, my2pos, playScene, titleScene, randBlockType,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TYPE_I = 0;

  TYPE_O = 1;

  TYPE_S = 2;

  TYPE_Z = 3;

  TYPE_J = 4;

  TYPE_L = 5;

  TYPE_T = 6;

  NUM_BLOCKTYPE = 7;

  GAME_W = 200;

  GAME_H = 320;

  GAME_FPS = 30;

  IMAGE_URL = "./img/image.gif";

  PIECE_W = 12;

  MARGIN_X = PIECE_W * 2;

  MARGIN_Y = PIECE_W * 4;

  BLOCK_X0 = MARGIN_X + PIECE_W * 4;

  BLOCK_Y0 = 10;

  FIELD_W = 10;

  FIELD_H = 20;

  field = [];

  fPiece = [];

  lineFlag = [];

  enchant();

  game = void 0;

  playScene = void 0;

  titleScene = void 0;

  mx2pos = function(x) {
    return (x - 1) * PIECE_W + MARGIN_X;
  };

  my2pos = function(y) {
    return (y - 1) * PIECE_W + MARGIN_Y;
  };

  randBlockType = function() {
    return Math.floor(Math.random() * NUM_BLOCKTYPE);
  };

  Piece = (function(_super) {
    __extends(Piece, _super);

    function Piece(mx, my, blockType) {
      var color, surface;

      this.mx = mx;
      this.my = my;
      this.blockType = blockType;
      Piece.__super__.constructor.call(this, PIECE_W, PIECE_W);
      color = ["rgba(255,   0,   0, 0.8)", "rgba(  0, 255,   0, 0.8)", "rgba(  0,   0, 255, 0.8)", "rgba(  0, 255, 255, 0.8)", "rgba(255,   0, 255, 0.8)", "rgba(255, 255,   0, 0.8)", "rgba(128, 128, 255, 0.8)"];
      surface = new Surface(PIECE_W, PIECE_W);
      surface.context.fillStyle = color[this.blockType];
      surface.fillRect(0, 0, PIECE_W - 1, PIECE_W - 1);
      this.image = surface;
      this.moveTo(PIECE_W * this.mx, PIECE_W * this.my);
    }

    return Piece;

  })(Sprite);

  Block = (function(_super) {
    __extends(Block, _super);

    function Block(blockType) {
      var i, j, p, _i, _j, _ref, _ref1, _ref2;

      this.blockType = blockType;
      Block.__super__.constructor.call(this);
      this.type = blockType;
      this.dir = 0;
      switch (blockType) {
        case TYPE_I:
          this.bPos = [[[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];
          break;
        case TYPE_O:
          this.bPos = [[[1, 1], [1, 1]]];
          break;
        case TYPE_S:
          this.bPos = [[[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]], [[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]]];
          break;
        case TYPE_Z:
          this.bPos = [[[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]], [[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]]];
          break;
        case TYPE_J:
          this.bPos = [[[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 0], [1, 1, 0]], [[1, 1, 1], [0, 0, 1], [0, 0, 0]], [[1, 1, 0], [1, 0, 0], [1, 0, 0]]];
          break;
        case TYPE_L:
          this.bPos = [[[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]], [[1, 1, 1], [1, 0, 0], [0, 0, 0]], [[1, 0, 0], [1, 0, 0], [1, 1, 0]]];
          break;
        case TYPE_T:
          this.bPos = [[[0, 1, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]], [[1, 1, 1], [0, 1, 0], [0, 0, 0]], [[1, 0, 0], [1, 1, 0], [1, 0, 0]]];
          break;
        default:
          throw "Illegal blockType:" + this.blockType;
      }
      this.width = this.bPos[0][0].length;
      this.piece = [];
      for (i = _i = 0, _ref = this.width; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (this.bPos[this.dir][i][j] === 1) {
            p = new Piece(j, i, this.blockType);
            this.addChild(p);
            this.piece.push(p);
          }
        }
      }
      _ref2 = [0, 0], this.mx = _ref2[0], this.my = _ref2[1];
      this.moveTo(BLOCK_X0, BLOCK_Y0);
      playScene.addChild(this);
    }

    Block.prototype.onField = function() {
      var _ref;

      _ref = [5, 1], this.mx = _ref[0], this.my = _ref[1];
      return this.moveTo(mx2pos(this.mx), my2pos(this.my));
    };

    Block.prototype.fixBlock = function() {
      var i, mx, my, _i, _ref, _ref1, _ref2;

      for (i = _i = 0, _ref = this.piece.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _ref1 = [this.piece[i].mx + this.mx, this.piece[i].my + this.my], mx = _ref1[0], my = _ref1[1];
        _ref2 = [mx, my], this.piece[i].mx = _ref2[0], this.piece[i].my = _ref2[1];
        this.piece[i].moveTo(mx2pos(mx), my2pos(my));
        field[my][mx] = 1;
        fPiece[my][mx] = this.piece[i];
        this.removeChild(this.piece[i]);
        playScene.addChild(fPiece[my][mx]);
      }
      return playScene.removeChild(this);
    };

    Block.prototype.spinCheck = function(dir) {
      var dir_next, i, j, _i, _j, _ref, _ref1;

      dir_next = (this.dir + dir + 4) % this.bPos.length;
      for (i = _i = 0, _ref = this.width; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (this.bPos[dir_next][i][j] === 1 ? field[this.my + i][this.mx + j] === 1 : void 0) {
            return false;
          }
        }
      }
      return true;
    };

    Block.prototype.spin = function(dir) {
      var count, i, j, _i, _j, _ref, _ref1;

      this.dir = (this.dir + dir + 4) % this.bPos.length;
      count = 0;
      for (i = _i = 0, _ref = this.width; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (this.bPos[this.dir][i][j] === 1) {
            this.piece[count].mx = j;
            this.piece[count].my = i;
            this.piece[count].moveTo(PIECE_W * j, PIECE_W * i);
            count++;
          }
        }
      }
      return this.moveTo(mx2pos(this.mx), my2pos(this.my));
    };

    Block.prototype.moveCheck = function(dx, dy) {
      var i, mx, my, _i, _ref, _ref1;

      for (i = _i = 0, _ref = this.piece.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _ref1 = [this.piece[i].mx + this.mx + dx, this.piece[i].my + this.my + dy], mx = _ref1[0], my = _ref1[1];
        if (my > FIELD_H + 1 || my < 0 || mx > FIELD_W + 1 || mx < 0 || field[my][mx] === 1) {
          return false;
        }
      }
      return true;
    };

    Block.prototype.fall = function() {
      if (this.moveCheck(0, 1)) {
        this.my += 1;
        this.moveTo(mx2pos(this.mx), my2pos(this.my));
        return true;
      }
      return false;
    };

    Block.prototype.move = function(dir) {
      if (this.moveCheck(dir, 0)) {
        this.mx += dir;
        this.moveTo(mx2pos(this.mx), my2pos(this.my));
        return true;
      }
      return false;
    };

    return Block;

  })(Group);

  lineCheck = function() {
    var b, count, i, j, num, _i, _j, _k;

    count = 0;
    num = 0;
    for (i = _i = FIELD_H; FIELD_H <= 1 ? _i <= 1 : _i >= 1; i = FIELD_H <= 1 ? ++_i : --_i) {
      lineFlag[i] = false;
      for (j = _j = 1; 1 <= FIELD_W ? _j <= FIELD_W : _j >= FIELD_W; j = 1 <= FIELD_W ? ++_j : --_j) {
        if (field[i][j] === 1) {
          count++;
        }
      }
      if (count === FIELD_W) {
        num++;
        lineFlag[i] = true;
        for (j = _k = 1; 1 <= FIELD_W ? _k <= FIELD_W : _k >= FIELD_W; j = 1 <= FIELD_W ? ++_k : --_k) {
          b = new Blast(j, i);
          playScene.removeChild(fPiece[i][j]);
          field[i][j] = 0;
          fPiece[i][j] = null;
        }
      }
      count = 0;
    }
    if (num > 0) {
      game.score_point += num * num * 100;
      return game.score_line += num;
    }
  };

  lineFall = function() {
    var i, j, x, y, _i, _j, _k, _l, _results;

    i = FIELD_H;
    _results = [];
    while (i >= 1) {
      if (lineFlag[i] === false) {
        _results.push(i--);
      } else {
        for (y = _i = i; i <= 2 ? _i <= 2 : _i >= 2; y = i <= 2 ? ++_i : --_i) {
          for (x = _j = 1; 1 <= FIELD_W ? _j <= FIELD_W : _j >= FIELD_W; x = 1 <= FIELD_W ? ++_j : --_j) {
            field[y][x] = field[y - 1][x];
            fPiece[y][x] = fPiece[y - 1][x];
            if (field[y][x] === 1) {
              fPiece[y][x].moveTo(mx2pos(x), my2pos(y));
            }
          }
        }
        for (x = _k = 1; 1 <= FIELD_W ? _k <= FIELD_W : _k >= FIELD_W; x = 1 <= FIELD_W ? ++_k : --_k) {
          field[1][j] = 0;
          fPiece[1][j] = null;
        }
        for (j = _l = i; i <= 2 ? _l <= 2 : _l >= 2; j = i <= 2 ? ++_l : --_l) {
          lineFlag[j] = lineFlag[j - 1];
        }
        _results.push(lineFlag[1] = false);
      }
    }
    return _results;
  };

  createField = function() {
    var fieldGrid, grid, i, j, _i, _j, _ref;

    grid = new Surface(PIECE_W * FIELD_W, PIECE_W * FIELD_H);
    grid.context.fillStyle = "#DDD";
    for (i = _i = 0; 0 <= FIELD_H ? _i < FIELD_H : _i > FIELD_H; i = 0 <= FIELD_H ? ++_i : --_i) {
      for (j = _j = 0; 0 <= FIELD_W ? _j < FIELD_W : _j > FIELD_W; j = 0 <= FIELD_W ? ++_j : --_j) {
        grid.fillRect(PIECE_W * j, PIECE_W * i, PIECE_W - 1, PIECE_W - 1);
      }
    }
    fieldGrid = new Sprite(PIECE_W * FIELD_W, PIECE_W * FIELD_H);
    fieldGrid.image = grid;
    _ref = [MARGIN_X, MARGIN_Y], fieldGrid.x = _ref[0], fieldGrid.y = _ref[1];
    return playScene.addChild(fieldGrid);
  };

  initPlay = function() {
    var i, j, x, y, _i, _j, _k, _l, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results;

    for (y = _i = 0, _ref = FIELD_H + 2; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
      field[y] = [];
      for (x = _j = 0, _ref1 = FIELD_W + 2; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        field[y][x] = 0;
      }
    }
    for (y = _k = 0, _ref2 = FIELD_H + 2; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; y = 0 <= _ref2 ? ++_k : --_k) {
      field[y][0] = field[y][FIELD_W + 1] = 1;
    }
    for (x = _l = 0, _ref3 = FIELD_W + 2; 0 <= _ref3 ? _l < _ref3 : _l > _ref3; x = 0 <= _ref3 ? ++_l : --_l) {
      field[0][x] = field[FIELD_H + 1][x] = 1;
    }
    for (i = _m = 0, _ref4 = FIELD_H + 2; 0 <= _ref4 ? _m < _ref4 : _m > _ref4; i = 0 <= _ref4 ? ++_m : --_m) {
      fPiece[i] = [];
      for (j = _n = 0, _ref5 = FIELD_W + 2; 0 <= _ref5 ? _n < _ref5 : _n > _ref5; j = 0 <= _ref5 ? ++_n : --_n) {
        fPiece[i][j] = null;
      }
    }
    _results = [];
    for (i = _o = 0; 0 <= FIELD_H ? _o < FIELD_H : _o > FIELD_H; i = 0 <= FIELD_H ? ++_o : --_o) {
      _results.push(lineFlag[i] = false);
    }
    return _results;
  };

  Blast = (function(_super) {
    __extends(Blast, _super);

    function Blast(mx, my) {
      Blast.__super__.constructor.call(this, PIECE_W, PIECE_W);
      this.moveTo(mx2pos(mx), my2pos(my));
      this.image = game.assets[IMAGE_URL];
      this.time = 0;
      this.duration = 20;
      this.frame = 0;
      this.addEventListener("enterframe", function() {
        this.time++;
        this.frame = Math.floor(this.time / this.duration * 5);
        if (this.time === this.duration) {
          return this.remove();
        }
      });
      playScene.addChild(this);
    }

    Blast.prototype.remove = function() {
      return playScene.removeChild(this);
    };

    return Blast;

  })(Sprite);

  window.onload = function() {
    game = new Game(GAME_W, GAME_H);
    game = new Core(GAME_W, GAME_H);
    game.fps = GAME_FPS;
    game.keybind(90, "a");
    game.keybind(88, "b");
    game.preload(IMAGE_URL);
    game.score_point = 0;
    game.score_line = 0;
    game.onload = function() {
      Surface.prototype.drawRect = function(x, y, w, h) {
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        return this.context.stroke();
      };
      Surface.prototype.fillRect = function(x, y, w, h) {
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        return this.context.fill();
      };
      game.titleScene = function() {
      var titleScene = new Scene();
      titleScene.backgroundColor = "#FFFFFF";
        var button = new Button("スタート", "white");
          button.width = 30;
          button.height = 10;
          button.moveTo(10,10);
          titleScene.addChild(button);
          button.ontouchend = function() {
            this.replaceScene(playScene);
          };
        var button2 = new Button("操作説明","white");
	  button2.width = 30;
          button2.height = 10;
          button2.moveTo(10,40);
          titleScene.addChild(button2);
          button2.ontouchend = function(){
            this.text = "z: 左回転、y: 右回転\r\n←, →, ↓: ブロック移動\r\n↑: ブロックを一番下まで移動";
          };
      return titleScene;
      };
        game.playScene = function() {
        var block, dkeyCount, fallCount, fallFlag, fallSpan, fallSpeed, nextBlock, rkeyCount;
        var playScene = new Scene();
        playScene.backgroundColor = "#AAA";
        initPlay();
        createField();
        nextBlock = new Block(randBlockType());
        block = new Block(randBlock());
        block.onField();
        game.tick = 0;
        rkeyCount = 5;
        dkeyCount = 5;
        fallFlag = true;
        fallCount = GAME_FPS;
        fallSpeed = GAME_FPS;
        fallSpan = 5;
        playScene.addEventListener(Event.ENTER_FRAME, function() {
          game.tick++;
          rkeyCount--;
          dkeyCount--;
          fallSpan--;
          if (game.tick % fallSpeed === 0) {
            fallFlag = block.fall();
          }
          if (fallFlag) {
            if (game.input.left & dkeyCount <= 0) {
              block.move(-1);
              dkeyCount = 5;
            }
            if (game.input.right & dkeyCount <= 0) {
              block.move(1);
              dkeyCount = 5;
            }
          }
          if (game.input.up) {
            while (block.moveCheck(0, 1)) {
              block.fall();
              fallFlag = true;
              game.score_point += 1;
            }
          }
          if (game.input.down && fallSpan <= 0 && game.tick % fallSpeed > 5) {
            fallFlag = block.fall();
            if (fallFlag) {
              fallSpan = 5;
              game.score_point += 1;
            }
          }
          if (game.input.a && rkeyCount <= 0) {
            if (block.spinCheck(1)) {
              block.spin(1);
              rkeyCount = 5;
            }
          }
          if (game.input.b && rkeyCount <= 0) {
            if (block.spinCheck(-1)) {
              block.spin(-1);
              rkeyCount = 5;
            }
          }
          if (fallFlag === false) {
            if (fallCount === GAME_FPS) {
              block.fixBlock();
              lineCheck();
            }
            if (fallCount === 10) {
              lineFall();
            }
            fallCount--;
            if (fallCount <= 0) {
              if (field[1][4] === 1 || field[1][5] === 1 || field[1][6] === 1 || field[1][7] === 1) {
                alert("score: " + game.score_point);
                game.removeScene(playScene);
                return game.pushScene(playScene);
              } else {
                block = nextBlock;
                block.onField();
                nextBlock = new Block(randBlockType());
                fallCount = GAME_FPS;
                fallFlag = true;
                return game.tick++;
              }
            }
          }
        });
        return playScene;
      };
      return game.replaceScene(titleScene);
    };
    return game.start();
  };

}).call(this);