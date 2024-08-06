window.onload = () => {
	document.body.addEventListener("mousemove", function (event) {
		let cursor = document.getElementById("cursor");

		let x = event.pageX + cursor.width - 30;
		let y = event.pageY + 0;

		cursor.style.left = x;
		cursor.style.top = y;
	});
}
