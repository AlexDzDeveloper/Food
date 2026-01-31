// // 0. Імпортую потрібні модулі
// const express = require('express');   // фреймворк для створення веб‑сервера
// const path = require('path');         // модуль для роботи з файловими шляхами
// const fs = require('fs');             // модуль для читання/запису файлів

// // 1. Створюю додаток Express
// const app = express();                // створюємо екземпляр сервера
// const PORT = 3000;                    // порт, на якому буде працювати сервер

// // 2. Middleware (проміжні обробники)
// // Цей middleware дозволяє Express автоматично парсити JSON‑дані, які приходять у тілі POST‑запитів (req.body).
// app.use(express.json());

// // 3. Статичні файли
// // Кажу Express: "все, що лежить у папці src — доступне напряму з кореня /"
// app.use(express.static(
//   path.join(__dirname, '..', 'src')
// ));

// // Якщо збірка JS лежить у dist, роблю її доступною з /dist
// app.use('/dist', express.static(
//   path.join(__dirname, '..', 'dist')
// ));

// // 4. API‑ендпоінти
// // GET /menu — повертає список меню з db.json
// app.get('/menu', (req, res) => {
//   // читаю файл db.json
//   const data = fs.readFileSync(
//     path.join(__dirname, '..', 'db.json'),
//     'utf-8'
//   );

//   // паршу JSON і відправляю тільки поле menu
//   res.json(JSON.parse(data).menu);
// });

// // POST /requests — приймає дані від користувача
// app.post('/requests', (req, res) => {
//   // виводимо дані, які користувач відправив у запиті, в консоль
//   console.log('Отримано дані від користувача:', req.body);

//   // відповідаємо клієнту, що все ок
//   res.status(200).json({ status: 'ok' });
// });

// // 5. Головна сторінка
// // GET / — повертає index.html як стартову сторінку
// app.get('/', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '..', 'src', 'index.html')
//   );
// });

// // 6. Запуск сервера
// // Слухаю порт 3000 і виводжу повідомлення в консоль
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


// 0. Імпортую потрібні модулі
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 1. Створюю додаток Express
const app = express();

// 👉 важливо для Render
const PORT = process.env.PORT || 3000;

// 👉 визначаємо середовище
const isProduction = process.env.NODE_ENV === 'production';

// 2. Middleware
app.use(cors());            // 👈 дозволяє запити з іншого домену
app.use(express.json());

// 3. Статичні файли (ТІЛЬКИ локально)
if (!isProduction) {
  app.use(express.static(
    path.join(__dirname, '..', 'src')
  ));

  app.use('/dist', express.static(
    path.join(__dirname, '..', 'dist')
  ));
}

// 4. API
app.get('/menu', (req, res) => {
  const data = fs.readFileSync(
    path.join(__dirname, '..', 'db.json'),
    'utf-8'
  );

  res.json(JSON.parse(data).menu);
});

app.post('/requests', (req, res) => {
  console.log('Отримано дані:', req.body);
  res.status(200).json({ status: 'ok' });
});

// 5. HTML (ТІЛЬКИ локально)
if (!isProduction) {
  app.get('/', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', 'src', 'index.html')
    );
  });
}

// 6. Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});