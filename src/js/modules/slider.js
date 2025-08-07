function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	//Робота зі слайдерами

	let slideIndex = 1;
	//для розуміння, на яку відстань вже відступили, необхідна нова перемінна
	let offset = 0;

	const slides = document.querySelectorAll(slide),
		  slider = document.querySelector(container),
		  next = document.querySelector(nextArrow),
		  prev = document.querySelector(prevArrow),
		  total = document.querySelector(totalCounter),
		  current = document.querySelector(currentCounter),
		  slidesWrapper = document.querySelector(wrapper),
		  slidesField = document.querySelector(field),
		  width = window.getComputedStyle(slidesWrapper).width;//Використовуємо ComputedStyle для витягнення значення ширини вікна, яке необхідне для показу всіх слайдів. style.width НЕ ПІДХОДЯТЬ, так як Інлайн-стилі не існують для даного елементу


	//Визначаємо нумерацію слайдів
	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent =`0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	//Поміщаємо всі слайди, які є, всередину slidesField
	slidesField.style.width = 100 * slides.length + '%';
	// console.log(slides.length);
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	//Приховуємо зайві слайди для користувача, які виходять за межі wrapper
	// slidesWrapper.style.overflow = 'hidden';
	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		//Задаємо вссім слайдам однакової ширини, шоб вони точно помістилися всередину slidesField
		slide.style.width = width;
	})


	//Робота з навігацією по слайдові. Створення індикаторів (крапок)
	slider.style.position= 'relative';

	const indicators = document.createElement('ol'),
		  dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		//Задаємо атрибут для кожної крапки, прикріплюємо кожну ерапку до певного слайда
		dot.setAttribute('data-slide-to', i + 1);
		for (let i = 0; i < slides.length; i++) {
			dot.classList.add('dot');
		}
		//Створюємо клас активності
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener('click', () => {
		//Коли на останнбому слайді - на початок. Перетворюємо на число
		// if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {//Робимо із строки '500px' значення 500, щоб перейти на перший слайд в кінці (можна за допоиогою регулярних виразів, або методом рядків slice)
		if(offset == (deleteNotDigits(width) * (slides.length - 1))) {//Робимо за допомогою regExp, виконуємо заміну НЕ чисел на пустий рядок (тобто забираємо 'px')
			offset = 0;
		} else {
			//додаємо зміщення
			// offset += +width.slice(0, width.length - 2);
			offset += deleteNotDigits(width);
		}
		slideFieldTransform();

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		setNumOfSlide();

		dotOpacity();
	});

	prev.addEventListener('click', () => {
		//Коли на останнбому слайді - на початок. Перетворюємо на число
		if(offset == 0) {//повертаємо на останній слайд, коли знаходимось на першому слайді
			// offset = +width.slice(0, width.length - 2) * (slides.length - 1);//назначчаємо останній слайд
			offset = deleteNotDigits(width) * (slides.length - 1);//за допомогою ergExp
		} else {
			//додаємо зміщення
			// offset -= +width.slice(0, width.length - 2);
			offset -= deleteNotDigits(width);//за допомогою ergExp
		}
		slideFieldTransform();

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		setNumOfSlide();

		dotOpacity();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			// offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			offset = deleteNotDigits(width) * (slideTo - 1);

			slideFieldTransform();

			setNumOfSlide();

			dotOpacity();

		});
	})

	function slideFieldTransform() {
		slidesField.style.transform = `translateX(-${offset}px)`;
	}

	function setNumOfSlide() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		};
	};

	function dotOpacity() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	};

	function deleteNotDigits(str) {
		return +str.replace(/[^\d.]/g, '');
	};

};

// module.exports = slider;
export default  slider;