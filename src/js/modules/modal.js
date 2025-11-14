function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	//якщо користувач сам відкрив модальне вікно, то вимикаємо автоматичне відкривання модального вікна за допомогою setTimeout
	//робимо перевірку на існування modalTimerId, а потім запускаємо ф-цію
	// console.log(modalTimerId);
	if(modalTimerId) {
		clearInterval(modalTimerId);
	};
};

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	//Відповідає за закриття модального вікна
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	//МОДАЛЬНЕ ВІКНО
	//створюємо МОДАЛЬНЕ ВІКНО та запускаємо його функціонал одразу на декілька тригерів

	// для того, щоб помітити, що декілька елементів на сторінці будуть виконувати однакові функції, їх позначають однаковими data-трибунами

	const showModalWindows = document.querySelectorAll(triggerSelector),
		//   showModalWindow = document.querySelector('[data-modal]'),//варіант для роботи лише з першою кнопкою. Його використовувати нижче в прослушці подій
		modal = document.querySelector(modalSelector);

	showModalWindows.forEach(btn  => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));//стрілкова ф-ція в даному випадку необхідна для того, щоб виклик call-back ф-ції openModal з використанням селектора modalSelector був виконаний тільки після кліка, а не одразу
	});

	//ЧАСТИНА КОДУ НИЖЧЕ, ЯКА ПОТРІБНА В ОБОХ ВИПАДКАХ
	//ПРИНЦИП DRY, використовуємо ф-цію, щоб не повторювати код двічі
	//функція  closeModal буде виконуватися, якщо ми клікаємо на підложку або на хрестик. ТАК ЯК ДИНАМІЧНО СТВОРЕНІ ЕЛЕМЕНТИ НЕ МАЮТЬ ОБРОБНИКІІВ ПОДІЙ, ТО ВИКОРИСТОВУЄМО ДЕЛЕГУВАННЯ (в нашому випадку для елементо по data-атрибуту)
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	//Використовуємо подію keydown для того, щоб модальне вікно також закривалося по клакові на клавішу Esc
	document.addEventListener('keydown', (e) => {
		//відслідковуємо натиск клавіші Esc. Вихід з модального вікна буде виконаний ЛИШЕ при його активності (перевіряємо в умові). Інакше ф-ція closeModal будк використовуватися щоразу, коли будемо натискати клавішу Esc, навіть якшо модальне вікно не буде активним
		if (e.code === 'Escape' && modal.classList.contains('show')) {//використовуємо порівняння коду натиснутої клавіші із кодом, який відповідає клавіші Esc (Escape)
			closeModal(modalSelector);
		}
	});

	//Ф-ція для видалення прослушки події scroll, якщо вона вже відбулася (ПОСИЛАННЯ ПОВИННО БУТИ САМЕ НА Ф-ЦІЮ, ЯКА ВИКЛИКАЄ ДАНУ ПОДІЮ)
	function showModalByScroll() {
		//прирівнюємо положення прокрутки та скрол користувача до висоти сторінки. Якщо вони рівні - відкриваємо модальне вікно
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	//Якщо користувач долистав сторінку до кінця, то відкривається модальне вікно
	window.addEventListener('scroll', showModalByScroll);

};

export default modal;
export {closeModal, openModal};