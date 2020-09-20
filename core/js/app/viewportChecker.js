const isElementInViewport = (el) => {

	//special bonus for those using jQuery
	if (typeof jQuery === `function` && el instanceof jQuery) {
		el = el[0];
	}

	let rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
};

export { isElementInViewport };
