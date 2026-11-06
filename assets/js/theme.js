(function () {
	'use strict';

	var root = document.documentElement;
	var KEY = 'theme';
	var systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

	function saved() {
		try {
			var value = localStorage.getItem(KEY);
			return value === 'dark' || value === 'light' ? value : null;
		} catch (e) {
			return null;
		}
	}

	function current() {
		return root.getAttribute('data-theme') || (systemDark && systemDark.matches ? 'dark' : 'light');
	}

	var choice = saved();
	if (choice) {
		root.setAttribute('data-theme', choice);
	}

	function syncButton(button) {
		var dark = current() === 'dark';
		button.setAttribute('aria-pressed', dark ? 'true' : 'false');
		button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
	}

	document.addEventListener('DOMContentLoaded', function () {
		var button = document.querySelector('.theme-toggle');
		if (!button) {
			return;
		}
		syncButton(button);

		button.addEventListener('click', function () {
			var next = current() === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try {
				localStorage.setItem(KEY, next);
			} catch (e) {
			}
			syncButton(button);
		});

		if (systemDark && systemDark.addEventListener) {
			systemDark.addEventListener('change', function () {
				syncButton(button);
			});
		}
	});
})();
