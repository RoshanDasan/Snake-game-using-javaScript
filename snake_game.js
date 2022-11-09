//variable declaration
 var canvas = document.getElementById("canvas").getContext("2d")
 var x_position = 180;
 var y_position = 180;
 var next_x_position = 0;
 var next_y_position = 0;
 var food_x_position = 140;
 var food_y_position = 100; 
 var score = 0;
 var snake_length = [];
 var snake_initial = 1;
 var gameStatus = "Ready to start";


//window onload function
window.onload = function ()
{
    document.addEventListener("keydown",control)
    game = setInterval(mainGame,200);

}




//main function
function mainGame()
{
   document.getElementById("score_id").innerHTML = score; // for change the score
   document.getElementById("gameStatus").innerHTML = gameStatus; // for change the game status

   x_position += next_x_position;
   y_position += next_y_position;

   // It gives random places for food
   if (x_position == food_x_position && y_position == food_y_position)
   {
    food_x_position = Math.floor(Math.random()*20)*20;
    food_y_position = Math.floor(Math.random()*20)*20;

    snake_initial++;
    score = score + 10; 
    
   }
   
   // for add snake tail by push function
   snake_length.push({x: x_position , y: y_position});

   while(snake_length.length>snake_initial) //clear unwanted tail
   {
    snake_length.shift();
   }


   // create game space
   canvas.fillStyle="black";
   canvas.fillRect(0,0,400,400);
   
   // loops for create column and row lines
   for(var column =20; column <400; column +=20)
   {
    canvas.moveTo(column,0);
    canvas.lineTo(column,400);
   }
   for(var row =20; row <400; row +=20)
   {
    canvas.moveTo(0,row);
    canvas.lineTo(400,row);
   }
   canvas.strokeStyle ="black"; // column and row color and adding to game space
   canvas.stroke();
   
   // create snake
   canvas.fillStyle="green";

   // loop for increase tail length
   for(var i=0; i<snake_length.length;i++)
   {
   canvas.fillRect(snake_length[i].x, snake_length[i].y, 20,20);
   
   // End game if snake touch the tail
   if(x_position == snake_length[i].x && y_position == snake_length[i].y && snake_initial < 1)
   {
    clearInterval(game);
   }

   // End game if snake touch the border
   if (x_position == 0 || x_position == 380 || y_position == 0 || y_position == 380)
   {
    gameStatus = "GAME OVER !";
    document.getElementById("gameStatus").innerHTML = gameStatus;
    clearInterval(game);
    
   }

   }

   // creating food
   canvas.fillStyle="red";
   canvas.fillRect(food_x_position,food_y_position,20,20);
   
   



}



//control function

function control(e)
{
  switch(e.keyCode)
  {
    case 38:
        next_y_position -=20;
        next_x_position = 0;
        break;
    case 40:
        next_y_position +=20;
        next_x_position = 0;
        break;
    case 39:
        next_x_position +=20;
        next_y_position = 0;
        break;
    case 37:
        next_x_position -=20
        next_y_position = 0;
        break;
  }
  
  // change game status when key was pressed
  if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
  {
    gameStatus = "Game started";
    document.getElementById("gameStatus").innerHTML = gameStatus;
  }
}