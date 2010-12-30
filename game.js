(function () {
	function Paddle(x, y) {
		this.x = x;
		this.y = y;
	}
	Paddle.prototype.update = function () {};
	Paddle.prototype.render = function (ctx) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(x, y, this.width, this.height);
	};

	var ctx, width = 640, height = 480;

	ctx = (function () {
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild(canvas);
		return canvas.getContext('2d');
	}());

	function update() {}
	function render() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);
	}

	render();
}());
