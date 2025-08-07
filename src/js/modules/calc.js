export default function calc() {

	//Робота з КАЛЬКУЛЯТОРОМ
	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	//Пишемо ф-цію для зазначення класів активності
	function initLocalSetigs(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if(elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			};
			if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			};
		});
	};

	initLocalSetigs('#gender div', 'calculating__choose-item_active');
	initLocalSetigs('.calculating__choose_big div', 'calculating__choose-item_active');

	//пишемо ф-ція для підрахунку загального значення
	function calcTotal() {
		if(!sex || !height || !weight || !age || !ratio) {
			// const mes = document.querySelector('.calculating__result');
			result.textContent = '____';
			return;
		}

		if(sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
			//Робимо перевірку на наявність дата-атрибуту при воборі фізичної активності. Якшо такого немає - то це вибір статі по id, так як там немає data-атрибуту. ДЛЯ того, щоб не писати однаковий код для різних елементів
			if(e.target.getAttribute('data-ratio')) {
				ratio = +e.target.getAttribute('data-ratio');
				//Застосовуємо localStorage
				localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
			} else {
				sex = e.target.getAttribute('id');
				localStorage.setItem('sex', e.target.getAttribute('id'));
			}

			elements.forEach(elem => {
				elem.classList.remove(activeClass);
			});

			e.target.classList.add(activeClass);

			calcTotal();
			});
		});
	}

    getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


	//Стровюємо ф-цію, яка буде обробляти кожен окремий input
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			//перевіряємо, які саме дані вводить користувач (вік, вагу...), використовуючи switch..case

			if(input.value.match(/\D/g)) {//якщо користувач ввів НЕ число, то...
				// input.style.border = '3px dashed rgba(255, 99, 71, 0.6)';
				input.style.cssText = `
					transition: .6s all;
					background-color: rgba(255, 99, 71, 0.2);
				`
			} else {
				input.style.cssText = `
				transition: .6s all;
				background-color: #fff;
			`
			}

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
		});

	}

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

};

// module.exports = calc;