Ex2 = window.Ex2 || {};

Ex2.GUI = function()
{
  let canvas;
    let w, h;
let initModule = function()
{
	 this.canvas = document.getElementById("canvas");
		this.canvas.width = window.innerWidth -30
		this.canvas.height = window.innerHeight-30 ;
        w = 500;
        h = 500;
        Ex2.Logic.initModule();    
        drawBoard();
		document.onkeydown = keyHandler.bind(this);
				

};

function keyHandler(event)
{
		var e = event || window.event;
		if(e.keyCode == '37')
			Ex2.Logic.move('left');
		else if(e.keyCode == '38')
			Ex2.Logic.move('up');
		else if(e.keyCode == '39')
			Ex2.Logic.move('right');
		else if(e.keyCode == '40')
			Ex2.Logic.move('down');
		else if(e.keyCode == '67')
			Ex2.Logic.cheat();
		drawBoard();
		
		
};

let drawBoard = function() {
        let context = this.canvas.getContext('2d');
        const TILE_W = (w-1)/ Ex2.Logic.getCols();
        const TILE_H = (h-1)/ Ex2.Logic.getRows();
       var dist ;
                
        for(let i = 0; i < Ex2.Logic.getRows(); i++)
            for(let j = 0; j < Ex2.Logic.getCols(); j++)
			{
				let val = Ex2.Logic.getCell(i, j); 
				switch(val)
				{
					case 0 :
						context.fillStyle = "gray";
						break;
					case 2:
						context.fillStyle = "#eee4da";
						dist=4;
						break;
					case 4 :
						context.fillStyle = "#ede0c8";
						dist=4
						break;
					
					case 8:
						context.fillStyle = "#f2b179";
						dist=4;
						break;
					
					case 16:
						context.fillStyle = "#f59563";
						dist = 9;
						break;
					
					case 32:
						context.fillStyle = "#f67c5f";
						dist = 9;
						break;
					case 64:
						context.fillStyle = "#f65e3b";
						dist=9;
						break;
							
					case 128:
						context.fillStyle = "#edcf72";
						dist = 13;
						break;
					
					case 256:
						context.fillStyle = "#edcc61";
						dist = 13;
						break;
					
					case 512:
						context.fillStyle = "#edc850";
						dist = 13;
						break;
					
					case 1024:
						context.fillStyle = "#edc53f";
						dist = 19;
						break;
					
					case 2048:
						context.fillStyle = "#edc22e";
						dist = 19;
						break;
					
					
					
				}
				context.fillRect(  j * TILE_W,  i * TILE_H, TILE_W , TILE_H);
				context.strokeStyle ="#778899";
				context.lineWidth = 10;
				context.strokeRect( j * TILE_W,  i * TILE_H, TILE_W , TILE_H);
				if(val!=0)
				{
					context.font = "20px italic bold";
					context.fillStyle = "black";
					context.fillText("" + val,  (j * TILE_W + TILE_W / 2)-dist ,  (i * TILE_H + TILE_H/2)+8);
					
				}
			
              
            }
    };



  return {initModule };

}();