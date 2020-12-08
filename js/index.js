let game = new Game();

function gameLoop(timestamp)
{
	game.update();

	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);