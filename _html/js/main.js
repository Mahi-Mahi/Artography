/* MAIN JS */

// DISABLE HOVER WHILE SCROLL
var disableHoverOnScroll = function() {
	var body = document.body,
		timer,
		addEvent = window.attachEvent || window.addEventListener;
	addEvent('scroll', function() {
		clearTimeout(timer);
		if (!body.classList.contains('disable-hover')) {
			body.classList.add('disable-hover');
		}
		timer = setTimeout(function() {
			body.classList.remove('disable-hover');
		}, 500);
	}, false);
};


// DOCUMENT READY
jQuery(document).ready(function() {
	disableHoverOnScroll();
});

// WINDOW LOAD
jQuery(window).load(function() {

});