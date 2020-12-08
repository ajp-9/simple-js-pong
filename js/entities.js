let Entity = class
{
	constructor(position)
	{
		this.position = position;
	}

	update() { this.collision(); }

	collision() {}

	draw(context) { }
}

let Paddle = class extends Entity
{
	constructor(position, player, dimensions = new vec2(25, 150), maxVelocity = 10)
	{
		super(position);
		
		this.dimensions = dimensions;

		this.velocity = 0;
		this.maxVelocity = maxVelocity;

		this.points = 0;

		this.player = player;

		if(player == true) 
			new InputHandler(this);
		else
			this.maxVelocity = 3.5;
	}

	update(game)
	{
		this.position.y += this.velocity;
		this.collision(game);

		if(!this.player)
		{
			if(game.ball.position.y < this.position.y + this.dimensions.y / 2)
				this.moveUp();

			if(game.ball.position.y == this.position.y + this.dimensions.y / 2)
				this.stop();

			if(game.ball.position.y > this.position.y + this.dimensions.y / 2)
				this.moveDown();
		}
	}

	moveUp() { this.velocity = -this.maxVelocity; }

	moveDown() { this.velocity = this.maxVelocity; }

	stop() { this.velocity = 0; }

	collision(game)
	{
		// in screen space
		if(this.position.y < 0 - this.dimensions.y)
		{
			this.position.y = 600;
		}
		if(this.position.y + this.dimensions.y > game.dimensions.y + this.dimensions.y)
		{
			this.position.y = 0 - this.dimensions.y;
		}
	}

	draw(context) { context.fillRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y); }
}

let Ball = class extends Entity
{
	constructor(position, radius = 15, maxVelocity = 5)
	{
		super(position);

		this.startPosition = new vec2(position.x, position.y)

		this.radius = radius;
		this.velocity = new vec2();

		this.maxVelocity = maxVelocity;

		this.newRound();
	}

	update(game)
	{
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.collision(game);
	}

	newRound()
	{
		this.position.x = this.startPosition.x;
		this.position.y = this.startPosition.y;

		if(Math.random() >= 0.5)
			this.velocity.x = this.maxVelocity;
		else
			this.velocity.x = -this.maxVelocity;

		if(Math.random() >= 0.5)
			this.velocity.y = this.maxVelocity;
		else
			this.velocity.y = -this.maxVelocity;
	}

	collision(game)
	{
		// top of screen
		if(0 >= this.position.y - this.radius)
			this.velocity.y = -this.velocity.y;

		// right of screen
		if(game.dimensions.x <= this.position.x + this.radius)
		{
			this.velocity.x = -this.velocity.x;
			game.player_paddle.points++;
			this.newRound();
		}

		// bottom of screen
		if(game.dimensions.y <= this.position.y + this.radius)
			this.velocity.y = -this.velocity.y;

		// left of screen
		if(0 >= this.position.x - this.radius)
		{
			this.velocity.x = -this.velocity.x;
			game.enemy_paddle.points++;
			this.newRound();
		}

		// skips first entity
		for(let i = 1; i < game.entities.length; i++)
		{
			// skips itself
			if(game.entities[i] == this)
				continue;

			if(game.entities[i].position.x + game.entities[i].dimensions.x >= this.position.x - this.radius
			&& game.entities[i].position.x <= this.position.x + this.radius

			&& game.entities[i].position.y + game.entities[i].dimensions.y >= this.position.y - this.radius
			&& game.entities[i].position.y <= this.position.y + this.radius)
			{
				this.velocity.x = -this.velocity.x;

				if(Math.random() >= 0.8)
					this.velocity.y = -this.velocity.y;
			}
		}
	}

	draw(context)
	{
		context.beginPath();
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		context.fill();
	}
}