let Game = class
{
	constructor(dimensions = new vec2(900, 600))
	{
		this.canvas = document.getElementById("canvas");
		this.canvas.width  = dimensions.x;
		this.canvas.height = dimensions.y;
		this.context = this.canvas.getContext("2d");
		this.dimensions = dimensions;

		this.player_paddle = new Paddle(new vec2(0, 300 - 75), true);
		this.enemy_paddle = new Paddle(new vec2(this.dimensions.x - 25, 300 - 75), false);
		this.ball = new Ball(new vec2(this.dimensions.x / 2, this.dimensions.y / 2));

		this.entities = [new Entity()];
		this.entities.push(this.player_paddle);
		this.entities.push(this.enemy_paddle);
		this.entities.push(this.ball);
	}

	update()
	{
		if(this.player_paddle.points >= 5)
		{
			this.context.fillStyle = "rgba(0,185,0,1)"
			this.context.font = "50px Arial";
			this.context.fillText("You win!", this.dimensions.x / 2 - 100, 150);
			this.context.font = "30px Arial";
			this.context.fillText("Reload the page to play again.", this.dimensions.x / 2 - 190, 200);
		}
		else if(this.enemy_paddle.points >= 5)
		{
			this.context.fillStyle = "rgba(255,0,0,1)"
			this.context.font = "50px Arial";
			this.context.fillText("You lose!", this.dimensions.x / 2 - 100, 150);
			this.context.font = "30px Arial";
			this.context.fillText("Reload the page to play again.", this.dimensions.x / 2 - 190, 200);
		}
		else
		{
			this.context.fillStyle = "rgba(255,255,255,1)"
			this.context.fillRect(0, 0, this.dimensions.x, this.dimensions.y);	

			for(let i = 0; i < this.entities.length; i++)
			{
				this.context.fillStyle = "rgba(0,0,0,1)";
				this.entities[i].update(game);
				this.entities[i].draw(this.context);
			}
		}

		this.context.fillStyle = "rgba(0,0,0,1)"
		this.context.font = "30px Arial";
		this.context.fillText("Player Points: " + this.player_paddle.points, 10, 35);
		this.context.fillText("Enemy Points: " + this.enemy_paddle.points, this.dimensions.x - 230, 35);
	}
}