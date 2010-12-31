(function () {
	var Keyboard, ctx, width, height, player, enemy, ball;
	
	function createArray(length, defaultValue) {
		return new Array(length).join('x').split('x').map(function () {
			return defaultValue;
		});
	}

	Keyboard = (function () {
		var keys = createArray(256, 0);

		function captureKey(key) {
			return key === 13 || (key >= 32 && key <= 40);
		}

		return ({
			KEY_ENTER: 13,
			KEY_SPACE: 32,
			KEY_UP: 38,
			KEY_DOWN: 40,

			onKeyDown: function (event) {
				if (!captureKey(event.keyCode)) {
					return;
				}
				keys[event.keyCode & 0xff] = 1;
				event.preventDefault();
				return false;
			},

			onKeyUp: function (event) {
				if (!captureKey(event.keyCode)) {
					return;
				}
				keys[event.keyCode & 0xff] = 0;
				event.preventDefault();
				return false;
			},

			isKeyDown: function (key) {
				return keys[key & 0xff] === 1;
			}
		});
	}());

	function Rect(x, y, width, height) {
		this.reset = function () {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		};
		this.reset();
	}
	Rect.prototype.update = function (delta) {};
	Rect.prototype.render = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.x | 0, this.y | 0, this.width, this.height);
	};

	width = 640;
	height = 480;

	actors = [];
	actors.push(player = new Rect(25, 200, 15, 100));
	actors.push(enemy = new Rect(width - 40, 200, 15, 100));
	actors.push(ball = new Rect((width / 2) - 7, (height / 2) - 7, 15, 15));

	player.update = function (delta) {
		if (Keyboard.isKeyDown(Keyboard.KEY_DOWN)) {
			this.y += .35 * delta;
		} else if (Keyboard.isKeyDown(Keyboard.KEY_UP)) {
			this.y -= .35 * delta;
		}
		this.y = Math.max(0, Math.min(height, this.y));
	};

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
