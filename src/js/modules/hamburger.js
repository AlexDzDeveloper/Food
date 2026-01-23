function hamburger() {
	const burger = document.querySelector('.header__hamburger'),
		  burgerLineTop = burger.querySelector('.top'),
		  burgerLineMiddle = burger.querySelector('.long'),
		  burgerLineBottom = burger.querySelector('.bottom'),
	 	  sidepanel = document.querySelector('.sidepanel'),
		  headerLinks = document.querySelector('.header__links'),
		  overlay = document.querySelector('.overlay');

	burger.addEventListener('click', () => {
		burger.classList.add = 'active';
		console.log('click');
		active();

		// burger.classList.contains('active') ?
	})
	function active() {
		burger.style.zIndex = '18';
		burgerLineMiddle.style.display = 'none';
		burgerLineTop.style.transform = 'rotate(45deg) translateY(13px)';
		burgerLineTop.style.transition = 'transform 0.5s ease';
		burgerLineBottom.style.transform = 'rotate(-45deg) translateY(-13px)';
		burgerLineBottom.style.transition = 'transform 0.5s ease';
		burgerLineBottom.style.backgroundColor = 'red';
		burgerLineTop.style.backgroundColor = 'red';
		headerLinks.style.display = 'block';
		headerLinks.style.zIndex = '18';
		sidepanel.style.display = 'flex';
		sidepanel.style.zIndex = '17';
		overlay.style.zIndex = '16';
	}

	// function close() {
	// 	burger.style.
	// }
}

export default hamburger;
