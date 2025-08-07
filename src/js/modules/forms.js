import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
	//Робота з відправкою форм
	//Так як форм 2, то ми обертаємо все в function(), яку і будемо викликати при відправці конкретної форми

	//Forms
	const forms = document.querySelectorAll(formSelector);

	//Створюємо повідомлення для сповіщення користувача про стан після відправки форми
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Дякуємо, скоро ми з вами звʼяжемось.',
		failure: 'Упс... Щось пішло не так...'
	};

	//Підвʼязуємо під нашу форми function postData()
	forms.forEach(item => {
		bindPostData(item);
	})

	//Так як дані від сервера можуть відрізнятися для різних продуктів (наприклад, ціна, посилання на продукт, текст), і для того, щоб їх можна було коректно вводити за допомогою адмін-панелі, і відображати на клієнті, то функціонал спілкування з сервером краще обернути в окрему ф-цію
	//postData робить запит на сервер за допомогою fetch(), отримує відповідь від серверу (наприклад, що пост пройшов успішно), трансформує відповідь у JSON
	//Використовуємо async/await для того, щоб поєднати використання асинхронного коду, який буде у вигляді відповіді сервера, із синхронним кодом (перемінна res буде пуста до момнту, поки не прийде відповідь від сервера, і в такиму випадку ми не зможемо перетворити відповідь сервера у формат json, поки її не буде -> буде помилка)
	/*
		Оператори async/await ЗАВЖДИ використовуються разом:
			- async прописується перед самою функцією, в якій є комбінація СИНХРОННОГО ТА АСИНХРОННОГО КОДУ
			- await прописується перед участком коду, відповідь на який потрібно дочекатися від серверу -- асинхронний участок коду
	*/



	//пишемо ф-цію, яка буде приймати дані
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();//відміняємо стандартну поведінку браузера - ПЕРЕЗАГРУЗКУ СТОРІКИ при відправці форми. ОБОВʼЯЗКОВО ВКАЗУЄТЬСЯ НА ПОЧАТКУ

			//Динамічно створюємо новий блок для відповіді користувачу на стан відправки форми
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			//відправдяємо повідомлення у вигляді картинки, що йде завантаження
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
				margin-top: 15px;
			`;
			// form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);


			/*
			//З використанням XMLHttpRequest
				const request = new XMLHttpRequest();
				request.open('POST', 'server.php');
			*/




			//ЗАГОЛОВОК ДЛЯ ФОРМИ
			/*
				Якщо ми будемо використовувати зв'язку XMLHttpRequest та form-data, то заголовок нам не потрібно установлювати, так як він буде встановлений автоматично. Якщо ми установимо заголовок вручну, то дані ми не отримаємо

				request.setRequestHeader('Content-type', 'multipart/form-data');
				*/

			//Якщо ми використовуємо формат JSON, то ЗАГОЛОВОК ОБОВʼЯЗКОВО ПОТРІБЕН
			// request.setRequestHeader('Content-Type', 'application/json');

			//використовуємо {formData}, який буде організовувати всі дані, які ввів користувач
			//Для того, щоб formData працював, в розмітці сторінки в input ОБОВʼЯЗКОВО має бути вказаний атрибут name="(імʼя)", інакше formData не зможе сформувати {}
			//для JSON, збираємо всі дані з нашої форми
			const formData = new FormData(form);

			//перебираємо {formData}, поміщаємо дані  в звичайний {}
			//для JSON
/* 			const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			}) */

			//Варіант перетворення formData в формат json
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			//перетворюємо {formData} в формат JSON
			// const json = JSON.stringify(object);

			//Відправляємо форму. Так як це відправка, то вже є body. В нашому випадку це {formData}
			// request.send(formData);

			//для відправки фоми в форматі JSON синтаксис наступний:
			// request.send(json);

			//повертаємо Promise із postData і обробляємо його
			// postData('http://localhost:3000/requests', JSON.stringify(object))
			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				//кастомізуємо відповідь користувачу в залежності від статусу, вікористовуючи модальне вікно
				showThanksModal(message.success);
				//Видаляємо блок про успішне відправлення форми
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {
				//Очищаємо форму
				form.reset();
			})

			//Тепер при відправці форми дані, які ввів користувач, заповнюючи форму на сайті, у нас зʼявляються у файлі db.json в [] requests

/* 			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					//кастомізуємо відповідь користувачу в залежності від статусу, вікористовуючи модальне вікно
					showThanksModal(message.success);
					//Очищаємо форму
					form.reset();
					//Видаляємо блок про успішне відправлення форми
					statusMessage.remove();
				} else {
					showThanksModal(message.failure);
				}
			}) */
		})
	}

	//Оформлення відповіді користувачеві, зміна вмісту модального вікна

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		//приховуємо модальне вікно
		prevModalDialog.classList.add('hide');
		//відкриваємо модальне вікно, формуємо його структуру
		openModal('.modal', modalTimerId);

		//Наповнюємо модальне вікно новим вмістом
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		//поміщаємо елемент на сторінку
		document.querySelector('.modal').append(thanksModal);

		//Через певний час повертаємо старе модальне вікно з його вмістом, а вікно вдячності видаляємо (необхвдно у випадку, коли користувач знову захоче заповнити форму)
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
	}

	/* 	//Для прикладу
	//Отримуємо доступ до бази даних (в нашому випадку файл db.json), і робимо з нього звичайний {}
	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res)); */


};

export default forms;