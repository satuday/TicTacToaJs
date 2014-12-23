function TicTacToaBoard(){
	this.depth = 0;
	this.boxes = [];
	this.boxes[0] = 0;
	this.boxes[1] = 0;
	this.boxes[2] = 0;
	this.boxes[3] = 0;
	this.boxes[4] = 0;
	this.boxes[5] = 0;
	this.boxes[6] = 0;
	this.boxes[7] = 0;
	this.boxes[8] = 0;
	this.Clone = function(){
		var newBoard = new TicTacToaBoard();
		newBoard.depth = this.depth;
		newBoard.boxes = this.boxes.slice(0);
		return newBoard;
	}
}

//X = 1, O = -1, empty = 0;
function GetMinMax(board, player){
	board.depth += 1;
	//currentPlayer = (player || 1);
	var moves = GetAvailableMoves(board);
	var val = GetBoardValue(board);
	if(moves.length == 0 || val ==  100 || val == -100){
		return val;
	}

	
	if(player == 1){
		var bestVal = -100;		
		for (var i = 0; i < moves.length - 1; i++) {
			var b = board.Clone();
			b.boxes[moves[i]] = 1;
			var val = GetMinMax(b, -1);
			bestVal = Math.max(val, bestVal);
		 	
		};
		return bestVal;
	}
	else{
		var bestVal = 100;		
		for (var i = 0; i < moves.length - 1; i++) {
			var b = board.Clone();
			b.boxes[moves[i]] = -1;
			var val = GetMinMax(b, 1);
			bestVal = Math.min(val, bestVal);
		 	
		};
		return bestVal;
	}
}

function GetAvailableMoves(board){
	var moves = [];
	for (var i = 0; i < board.boxes.length; i++) {
		if(board.boxes[i] == 0){
			moves.push(i);
		}

	}

	return moves;
}

function GetBoardValue(board){
	if((board.boxes[0] == 1 && board.boxes[1] == 1 && board.boxes[2] == 1) ||
		(board.boxes[3] == 1 && board.boxes[4] == 1 && board.boxes[5] == 1) ||
		(board.boxes[6] == 1 && board.boxes[7] == 1 && board.boxes[8] == 1) ||
		(board.boxes[0] == 1 && board.boxes[3] == 1 && board.boxes[6] == 1) ||
		(board.boxes[1] == 1 && board.boxes[4] == 1 && board.boxes[7] == 1) ||
		(board.boxes[2] == 1 && board.boxes[5] == 1 && board.boxes[2] == 1) ||
		(board.boxes[0] == 1 && board.boxes[4] == 1 && board.boxes[8] == 1) ||
		(board.boxes[2] == 1 && board.boxes[4] == 1 && board.boxes[6] == 1) ){
		return 100;
	}
	else if((board.boxes[0] == -1 && board.boxes[1] == -1 && board.boxes[2] == -1) ||
		(board.boxes[3] == -1 && board.boxes[4] == -1 && board.boxes[5] == -1) ||
		(board.boxes[6] == -1 && board.boxes[7] == -1 && board.boxes[8] == -1) ||
		(board.boxes[0] == -1 && board.boxes[3] == -1 && board.boxes[6] == -1) ||
		(board.boxes[1] == -1 && board.boxes[4] == -1 && board.boxes[7] == -1) ||
		(board.boxes[2] == -1 && board.boxes[5] == -1 && board.boxes[2] == -1) ||
		(board.boxes[0] == -1 && board.boxes[4] == -1 && board.boxes[8] == -1) ||
		(board.boxes[2] == -1 && board.boxes[4] == -1 && board.boxes[6] == -1) ){
		return -100;
	}
	return 0;
}

function GetBestMove(board){
	var p = -1;
	var bestVal = -100;
	var moves = GetAvailableMoves(board);
	for (var i = 0; i < moves.length; i++) {
		var b = board.Clone();
		b.boxes[moves[i]] = 1;
		var val = GetMinMax(b, -1);
		console.log(i + ':' + val);
		if(val > bestVal){
			bestVal = val;
			p = moves[i];
		}
	};
}


var board1 = new TicTacToaBoard();
board1.boxes[4] = -1;

var b = GetBestMove(board1);
console.log(b);