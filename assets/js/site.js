(function () {
	'use strict';

	var year = document.querySelector('.js-year');
	if (year) {
		year.textContent = new Date().getFullYear();
	}

	var name = document.querySelector('.hero-started .title');
	var role = document.querySelector('.hero-started .role');
	if (!name || !role) {
		return;
	}

	function textBox(el) {
		var range = document.createRange();
		range.selectNodeContents(el);
		return range;
	}

	function fitRole() {
		role.style.fontSize = '';
		var nameRange = textBox(name);
		if (name.getBoundingClientRect().height > parseFloat(getComputedStyle(name).fontSize) * 1.5) {
			return;
		}
		role.style.whiteSpace = 'nowrap';
		var nameWidth = nameRange.getBoundingClientRect().width;
		var roleWidth = textBox(role).getBoundingClientRect().width;
		if (nameWidth > 0 && roleWidth > 0) {
			var size = parseFloat(getComputedStyle(role).fontSize) * nameWidth / roleWidth;
			role.style.fontSize = size.toFixed(2) + 'px';
			roleWidth = textBox(role).getBoundingClientRect().width;
			role.style.fontSize = (size * nameWidth / roleWidth).toFixed(2) + 'px';
		}
		role.style.whiteSpace = '';
	}

	var pending;
	function schedule() {
		cancelAnimationFrame(pending);
		pending = requestAnimationFrame(fitRole);
	}

	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(fitRole);
	}
	window.addEventListener('load', fitRole);
	window.addEventListener('resize', schedule);
	fitRole();
})();
