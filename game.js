(function () {
	var ctx;

	ctx = (function () {
		var canvas = document.createElement('canvas');
		canvas.width = 640;
		canvas.height = 480;
		document.body.appendChild(canvas);
		return canvas.getContext('2d');
	}());
}());
