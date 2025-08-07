const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		//перетворюємо {formData} в формат JSON
		body: data
	});

	//повертаємо Promise. Прописуємо await, так як не знаємо, скільки даних нам прийде у відповіді, тому чекаємо на їх обробку, і тільки після обробки виконуємо return
	return await res.json();
};

	//Пишемо ф-цію для побудови карточок на сайті із отриманих даних
	const getResource = async (url) => {
		let res = await fetch(url);

		//Вручну обробляємо ситуацію, коли HTTP дає помилку, для того, щоб запустився catch() (reject()) (так як fetch() не буде це вважати помилкою)
/*
		У поверненого Promise є наступні властивості для огляду результату від сервера:
			- .ok() - коли все пройшло успішно
			- status() - попадаємо на повернутий сервером статус (використовуємо код статусу)
 */
		if (!res.ok) {
			//Викидаємо обʼєкт помилки {}, коли все пройшло не ок
			//Створюєится нова помилка, і оператор throw її викидає
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		//повертаємо Promise. Прописуємо await, так як не знаємо, скільки даних нам прийде у відповіді, тому чекаємо на їх обробку, і тільки після обробки виконуємо return
		return await res.json();
	};

export { postData };
export { getResource };