function hamburger() {
	const burger = document.querySelector('.header__hamburger'),
		  overlay = document.querySelector('.overlay');

	burger.addEventListener('click', () => {
		document.body.classList.toggle('menu-open');
	});

	overlay.addEventListener('click', () => {
		document.body.classList.remove('menu-open');
	});

}

export default hamburger;
