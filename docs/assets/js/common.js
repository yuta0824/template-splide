// ローディング判定;
window.addEventListener("load", function () {
	document.body.setAttribute("data-loading", "true");
});

// ローディング判定が機能しなかった場合の保険
window.setTimeout(function () {
	document.body.setAttribute("data-loading", "true");
}, 3000);

//375px 未満は JS で viewport を固定する
(function () {
	const viewport = document.querySelector('meta[name="viewport"]');

	function switchViewport() {
		const value =
			window.outerWidth > 375
				? "width=device-width,initial-scale=1"
				: "width=375";
		if (viewport.getAttribute("content") !== value) {
			viewport.setAttribute("content", value);
		}
	}
	addEventListener("resize", switchViewport, false);
	switchViewport();
})();
