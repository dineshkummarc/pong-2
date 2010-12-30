(function () {
	function Paddle(x, y) {
		this.x = x;
		this.y = y;
		this.width = 15;
		this.height = 100;
	}
	Paddle.prototype.update = function (delta) {};
	Paddle.prototype.render = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	var ctx, width, height, player, enemy;
	width = 640;
	height = 480;
	actors = [];
	actors.push(player = new Paddle(25, 200));
	actors.push(enemy = new Paddle(width - 40, 200));

	ctx = (function () {
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild(canvas);
		return canvas.getContext('2d');
	}());

	function update(delta) {
		actors.forEach(function (actor) {
			actor.update(delta);
		});
		render();
	}

	function render() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);

		actors.forEach(function (actor) {
			actor.render(ctx);
		});
	}

	(function () {
		Date.now = Date.now || (function () {
			return new Date().getTime();
		});
		var lastUpdate = Date.now();

		(function loop() {
			var now = Date.now();
			update(now - lastUpdate);
			lastUpdate = now;
			setTimeout(loop, 10);
		}());
	}());
}());
