function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//Tabs

	//  Таби (вкладки) – це і є той елемент інтерфейсу, який дозволяє користувачеві перемикатися між контентом, розбитим на кілька секцій. У веб-таби - це просто набір посилань або інших HTML елементів, які візуально зазвичай оформлюють у вигляді вкладок або групи кнопок.

	//1. Маємо написати ф-цію, яка буде приховувати непотрібні в даний момент ТАБИ
	//2. Показати необхідний ТАБ (в нашому випадку змінити каринку та відповідний до неї текст)
	//3. Назначити обробники подій на меню справа (Де вказаний стиль харчування)
	let tabs = document.querySelectorAll(tabsSelector),
			tabContent = document.querySelectorAll(tabsContentSelector),
			tabsParrent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabContent.forEach((item) => {
			//приховуємо контент на сайті за допомогою інлайн-стилів
			// item.style.display = 'none';

			//те ж саме за допомогою класів - ПРІОРИТЕТНІШЕ

			item.classList.add('hide');//добавдяємо клас hide
			item.classList.remove('show', 'fade');//видаляємо клас show та fade - для того, щоб в майбутньому дана анімація знову відтворювалась
		});

		tabs.forEach(item => {
			item.classList.remove(activeClass);//видаляємо клас активності в ТАБІВ
		})
	};

	function showTabContent(i = 0) {//присвоюємо значення за замовчуванням 0 (стандарт ES6). Якщо приходить якийсь інший аргумент - підставиться він

		//показуємо необхідний ТАБ за допомогою інлайн-стилів
		// tabContent[i].style.display = 'block';

		//те ж саме з використанням класів - ПРІОРИТЕТНІШЕ
		tabContent[i].classList.add('show', 'fade');//+ добавляємо клас анімації
		tabContent[i].classList.remove('hide');

		tabs[i].classList.add(activeClass);//додаємо до необхідного ТАБА клас активності в ТАБІВ
	};

	hideTabContent();
	showTabContent();//робимо активним перший ТАБ за замовчуванням

	tabsParrent.addEventListener('click', (event) => {
		//якщо ми часто використовуємо target, то записуємо його в перемінну
		const target = event.target;


		//визначаємо номер елемента зі списку, по якому був виконаний клік, і по даному номеру викликаємо функцію showTabContent
		//виконуємо це за допомогою звичайного перебору, так як tabs — це псевдо []
		// якщо елемент, який знаходиться в даному псевдо масиві, збігається із елементом, по якому користувач виконав click, Тоді беремо його номер та показуємо на сторінці
		if (target && target.classList.contains(tabsSelector.slice(1))) {//використовуємо метод slice для того, щоб не було помилки і видалити крапку, так як тут звернення безповередньо до класу
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			})
		}
	});
}

// module.exports = tabs;
export default tabs;