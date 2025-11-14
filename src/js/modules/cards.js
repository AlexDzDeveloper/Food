import { getResource } from "../services/services";

function cards() {
	//Використовуємо класи для карточок
	//Використовуємо rest-оператор, так як в майбутньому нам може знадобитись створювати більшу к-сть класів, ніж 1 (для зміни розміру вікна наприклад)
	class MenuCard {
		constructor (src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;//це []
			this.parent = document.querySelector(parentSelector);
			this.transfer = 37;//курс для конвертації, в майбутньому тут буде курс приходити з НБУ
			this.changeToUAN();
		}

		//Пишемо конвертація на гривню з долара
		changeToUAN() {
			this.price *= this.transfer;
		}

		//Пишемо метод для формування верстки картки
		render() {
			//cтворюємо блок. в який будемо розміщувати нащу верстку
			const element = document.createElement('div');

			//пишемо умову для перевірки, чи заданий при створені нового елементу за допомогою class MenuCard клас для батьківського елемента, в який ми будемо засосувати нашу верстку
			//так як rest-оператору не можна задати значення за замовчуванням і в this.classes ми не можкмо виконати перевірку оператором || або (тому, шо тоді це буде тип рядок, і до нього не можна буде застосувати метод forEach нижче), ТОМУ МИ ВВИЕОРИСТОВУЄМО ЗВИЧАЙНУ ПЕРЕВІРКУ
			if (this.classes.length === 0) {//робимо перевірку, так як метод classes у будь-якому випадку поверне масив, навіть пустий. Тому перевіряємо довжину масиву
				this.element = 'menu__item';//задаємо клас за замовчуванням
				element.classList.add(this.element);
			} else {
				//обробляємо []classes, проходимось по кожному елементу всередині, дістаємо назву даного класу і підʼєднуємо до створеного div
				this.classes.forEach(className => element.classList.add(className));
			}

			//динамічно формуємо структуру за допомогою innerHTML
			element.innerHTML = `
				<img src=${this.src} alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Ціна:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;

		//використовуємо батьківський елемент DOM, поміщаємо в нього наш блок
		this.parent.append(element);
		}
	};

	//створюємо новий {} із продуктом, та викликаємо на ньому метод render()
	/*
		можливий синтаксис
		const div = new MenuCard();
		div.render();
	*/



	getResource('http://localhost:3000/menu')
		.then(data => {
			//Використовуємо деструктуризацію, щоб код не розтягувався
			data.forEach(({img, altimg, title, descr, price}) => {
				//перебираємо масив із даними, які прийшли від сервера, рендеримо їх на клієнті
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	//Використання бібліотеки axios для роботи із запитами
	//Перевагою даної бібліотеки є те, шо вона автоматично конверткє дані в json формат, побудована на промісах, повернений {} з даними більш змістовний - містить config, headers, status, request, data, statusText
/* 	axios.get('http://localhost:3000/menu')
		.then(obj => {
			obj.data.forEach(({img, altimg, title, descr, price}) => {
				//перебираємо масив із даними, які прийшли від сервера, рендеримо їх на клієнті
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */

	//Альткрнативний код без використання класів
	//пишемо ф-цію, яка буде відповідати за створення карточок на сторінці (якщо дані карточки будуть записані тільки 1 раз, якщо багато - то краще використати Class)
/* 	getResource('http://localhost:3000/menu')
	.then(data => createCard(data));
	function createCard(data) {
		data.forEach(({img, altimg, title, descr, price}) => {
			const element = document.createElement('div');

			element.classList.add('menu__item');

			element.innerHTML = `
				<img src=${img} alt="${altimg}">
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price * 37}</span> грн/день</div>
				</div>
			`;

			document.querySelector('.menu .container').append(element);
		})
	} */
}

// module.exports = cards;
export default cards;