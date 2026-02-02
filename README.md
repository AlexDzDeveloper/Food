Food App (Frontend + Backend)

Навчальний full‑stack проєкт з розділеними frontend та backend частинами.
	•	Frontend — статичний сайт (HTML / CSS / JS, Webpack), задеплоєний на LinkHost
	•	Backend (API) — Node.js + Express, задеплоєний на Render

Проєкт демонструє роботу з REST API, асинхронними запитами (fetch), формами та деплоєм backend‑частини в хмару.

⸻

🔗 Live demo
	•	Frontend: https://food.webdevdz.co.ua/
	•	Backend API: https://food-lai0.onrender.com/

⸻

⚙️ Tech stack

Frontend
	•	HTML5
	•	CSS3 (Flexbox, Grid)
	•	JavaScript (ES6+)
	•	Webpack

Backend
	•	Node.js
	•	Express
	•	CORS
	•	JSON

⸻

📂 Project structure

food/
├── server.js          # Express server
├── db.json            # Mock database (menu data)
├── package.json
└── README.md

Frontend збирається окремо та хоститься як статичний сайт.

⸻

🚀 API Endpoints

GET /menu

Повертає список позицій меню у форматі JSON.

Example response:

[
  {
    "img": "img/tabs/vegy.jpg",
    "title": "Меню 'Фітнес'",
    "descr": "Healthy food menu",
    "price": 9
  }
]


⸻

🛠️ Installation & Local run

1️⃣ Clone repository

git clone https://github.com/your-username/food.git
cd food

2️⃣ Install dependencies

npm install

3️⃣ Run server locally

node server.js

Server will be available at:

http://localhost:3000


⸻

☁️ Deployment

Backend — Render

Проєкт задеплоєний на Render як Web Service.

Why Render:
	•	проста інтеграція з GitHub
	•	автоматичні деплої після git push
	•	безкоштовний тариф для навчальних проєктів
	•	HTTPS з коробки

Render settings:
	•	Build Command: npm install
	•	Start Command: node server.js

⚠️ На безкоштовному тарифі сервер може “прокидатись” 5–20 секунд після простою.

⸻

⚠️ Known issues
	•	Safari може кешувати старі версії bundle.js без hash‑іменування
	•	перший запит до backend може бути повільним (free tier Render)

⸻

📌 Future improvements
	•	Надсилання даних форми на email (NodeMailer)
	•	Environment variables (.env)
	•	Cache busting для frontend bundle
	•	Validation & error handling

⸻

👤 Author

Oleksandr D.

Junior Frontend Developer

⸻

This project was created for learning and portfolio purposes.
