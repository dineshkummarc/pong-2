(function () {
	var Keyboard, ctx, width, height, player, enemy;
	Keyboard = (function () {
		var keys = new Array(256).join('x').split('x').map(function () {
			return 0;
		});

		return ({
			KEY_ENTER: 13,
			KEY_SPACE: 32
			KEY_UP: 38,
			KEY_DOWN: 40,

			onKeyDown: function (event) {
				console.log(event.keyCode);
				keys[event.keyCode & 0xff] = 1;
				event.preventDefault();
				return false;
			},

			onKeyUp: function (event) {
				keys[event.keyCode & 0xff] = 0;
				event.preventDefault();
				return false;
			},

			isKeyDown: function (key) {
				return keys[key & 0xff] === 1;
			}
		});
	}());

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

	width = 640;
	height = 480;
	actors = [];
	actors.push(player = new Paddle(25, 200));
	actors.push(enemy = new Paddle(width - 40, 200));

	ctx = (function () {
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.tabIndex = 0;
		canvas.addEventListener('keydown', Keyboard.onKeyDown, false);
		canvas.addEventListener('keyup', Keyboard.onKeyUp, false);
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
