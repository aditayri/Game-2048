Ex2 = window.Ex2 || {};

Ex2.Logic = function()
{
	let ROWS = 4;
	let COLS = 4;
	let SIZE =ROWS*COLS;
	let merged = [];
	let tiles = [];
	let startTiles=2;
	let over = false;
	var ROTATIONS =
	{
		left:  0,
		down:  1,
		right: 2,
		up:    3,
		total: 4
	};
	
	let initModule = function()
	{
		for(var i = 0 ; i < SIZE ; i++)
		{
			tiles[i]=0;
			merged[i]=false;
		}
			start();
	};
	
	let start =function()
	{
		for(var i =0 ; i<startTiles;i++)
		{
			var emptyTiles = getEmpties();
			var selectedTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]	
			tiles[selectedTile]= chooseStartNumber();
		}
	}
	
	let chooseStartNumber = function()// 2 or 4
	{
		return Math.random()<0.5 ? 2:4;
	};
	
	let getEmpties = function() //return the emptie tiles
	{
		var emptyTiles = [];
		for(var i =0; i< SIZE ; i++)
		{
			if(tiles[i]===0)
			{
				emptyTiles.push(i);
			}
		}
		return emptyTiles;
	};
	
	let placeTile = function()//place a new tile in an empty one
	{
		var emptyTiles = getEmpties();
		var selectedTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
		tiles[selectedTile] = chooseStartNumber();
		emptyTiles = getEmpties();
		if(emptyTiles.length===0)
		{
			console.log("No free tiles");
			console.log("check if we have tiles to merge");
			if(nothingLeftToMerge())
			{
				console.log("over");
				over = true;
			}
		}		
		
		
	}
	let nothingLeftToMerge = function() //check if there is no more merging to do
	{
		for(var i =0 ; i <SIZE ; i++)
		{
			if(tiles[i]===tiles[i+COLS])
			{
				console.log("check: "+ tiles[i]  +" = " + tiles[i+COLS] + " ? ")
				return false;
			}
			if(!isAgainstWall(i+1))
			{
				if(tiles[i]===tiles[i+1])
				{
					console.log("check: "+ tiles[i]  +" = " + tiles[i+1] + " ? ")
					return false;
				}
			}
		}
		return true;
	}
	let swap = function(i) //swap between two tiles
	{
		var currentIndex = i;
		var currentTileValue = tiles[i];
		var leftIndex = i - 1;
		var leftTileValue = tiles[i - 1];
		tiles[currentIndex] = leftTileValue;
		tiles[leftIndex] = currentTileValue;
	};
	
	
	let checkForWin = function() //check if we have a tile with value of 2048 
	{
		for(let i =0; i<SIZE; i++)
			if(tiles[i]===2048)
			{
				over =true;
				setTimeout(function()
				{
					alert("YOU WIN!");
				}, 200);
			}
		
	};
	let rotateTimes = function(number) //how many times to rotate the array
	{
		for (number; number > 0; number--)
		{
			rotate();
		}
	};
	let rotate = function() //update the array
	{
		var updatedBoard = [];
		for (var i = 0; i < COLS; i++){
			updatedBoard = updatedBoard.concat(transpose(i).reverse());
		}
		tiles = updatedBoard;
	};
	let transpose = function(i)//change the array
	{
		 var column = [];
		for (i; i < SIZE; i += COLS) 
		{
			column.push(tiles[i]);
		}
		return column;
	};
	let slideAll = function() //slide all tiles
	{
		for (var i = 0; i < SIZE; i++) 
		{
			if (!(tiles[i]===0))
			{
				slide(i);
			}
		}
	};
	let slide = function(index) //slide to left and do or swap or merge
	{
			for (var i = index; !isAgainstWall(i); i--)
			{
				if (tiles[i-1]===0)
				{
					swap(i);
				} 
				else if (tiles[i] === tiles[i - 1] && !merged[i] &&!merged[i-1])
				{
					merge(i);
				}
			}
	};
	let isAgainstWall = function(i)//if a tile is against the wall return true
	{
		return i%COLS===0;
	}
	let merge = function(i) //merge tile i with left tile
	{
		
			var currentIndex = i;
			var leftIndex = i - 1;
			var currentTileValue = tiles[i];
			var leftTileValue = tiles[leftIndex];
			tiles[leftIndex] = leftTileValue + currentTileValue;
			tiles[i] = 0;
			merged[leftIndex]= true;
		
	};
	let cheat = function()// I added a cheat method if you press c you win 
	{
		if(!over)
		{
			var emptyTiles = getEmpties();
			if(emptyTiles.length===0)
			{
				alert("NO MORE EMPTY TILES!!!");
			}
			else
			{
				var selectedTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
				tiles[selectedTile] = 2048;
				over = true;
				setTimeout(function()
				{
					alert("YOU WIN!");
				}, 200);
		
			}	
		}		
	}

	let move = function(direction)//left, right , up down
	{
		
		if(!over)
		{
			var rotationTimes =ROTATIONS[direction];
			rotateTimes(rotationTimes);
			slideAll();
			placeTile();
			rotateTimes((ROTATIONS['total'] - rotationTimes) % COLS);
			if (over) 
			{
				setTimeout(function()
				{
					alert("GAME OVER!");
				}, 200);
			} 		
			else 
			{
					checkForWin();
			}
			mergeReset();
		}
	};
	let mergeReset = function()
	{
		for(var i =0 ; i<SIZE ;i++)
		{
			merged[i]= false;
		}
	}
	
	let getRows = () => ROWS;
    let getCols = () => COLS;
    let getCell = (row, col) => tiles[toInd(row, col)];
	 let toInd = (row, col) => row * COLS + col;
	

    return { initModule, getRows, getCols, getCell,move,placeTile,checkForWin,getEmpties,swap,rotate, rotateTimes,transpose,slideAll,slide,merge,cheat,nothingLeftToMerge,mergeReset, start}

}();