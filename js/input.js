let InputHandler = class
{
	constructor(paddle)
	{
		document.addEventListener("keydown", (event) =>
		{
			switch(event.key)
			{
				case 'w':
					paddle.moveUp();
					break;
				case 's':
					paddle.moveDown();
					break;
				default:
					break;
			}
		});

		document.addEventListener("keyup", (event) =>
		{
			switch(event.key)
			{
				case 'w':
					paddle.stop();
					break;
				case 's':
					paddle.stop();
					break;
				default:
					break;
			}
		})
	}
}