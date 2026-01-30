/* ІМПОРТИ ЗАЛЕЖНОСТЕЙ*/

// Express — фреймворк для створення сервера на Node.js
const express = require('express');

// Path — утиліта для коректної роботи з шляхами до файлів
const path = require('path');

// File System — для читання файлів (db.json)
const fs = require('fs');


/*СТВОРЕННЯ СЕРВЕРНОГО ЗАСТОСУНКУ*/

// Ініціалізуємо express-застосунок
const app = express();

// Порт, на якому буде працювати сервер
const PORT = 3000;


/* MIDDLEWARE (ПРОМІЖНІ ОБРОБНИКИ)*/

/*
 * Дозволяє серверу приймати JSON у body запиту
 * Без цього req.body буде undefined
 */
app.use(express.json());

/*
 * Дозволяє віддавати статичні файли:
 * HTML, CSS, JS, картинки і т.д.
 *
 * Тут вказую корінь проекту,
 * бо index.html, css, images — не в dist
 */
app.use(express.static(path.join(__dirname, '../')));


/* API: ОТРИМАННЯ МЕНЮ*/

/*
 * GET /menu
 * Використовується фронтендом для отримання карток меню
 */
app.get('/menu', (req, res) => {
	try {
		// Читаємо файл db.json
		const data = JSON.parse(
			fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8')
		);

		// Повертаємо тільки масив menu
		res.json(data.menu);
	} catch (error) {
		res.status(500).json({ message: 'Error reading menu data' });
	}
});


/* API: ОБРОБКА ФОРМИ*/

/*
 * POST /requests
 * Приймає дані з форми (name, phone)
 */
app.post('/requests', (req, res) => {
	// Дані, які прийшли з фронтенду
	const formData = req.body;

	// Для наочності просто логимо
	console.log(formData);

	/**
	 * Тут у реальному проекті можна:
	 * - записати в базу
	 * - відправити email
	 * - передати в CRM
	 */

	// Повертаю відповідь клієнту
	res.json(formData);
});


/* FALLBACK-РОУТ (SPA)*/

/*
 * Якщо жоден роут не підійшов —
 * віддаю index.html
 *
 * ВАЖЛИВО:
 * це НЕ app.get('*'), бо в нових версіях Express
 * '*' більше не підтримується
 */
app.use((req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});


/* ЗАПУСК СЕРВЕРА*/

app.listen(PORT, () => {
	console.log(`✅ Server running at http://localhost:${PORT}`);
});