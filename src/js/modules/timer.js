function timer(id, deadline = '2026-01-11') {
	//Timer
	//ЗАПУСКАЄМО ТАЙМЕР ЗВОРОТНЬОГО ВІДЛІКУ

	// const deadline = '2025-09-20';//точка відліку або ЧАС, КОЛИ ЗАКІНЧУЄТЬСЯ АКЦІЯ

	function getTimeRemaining(endtime) {

		let days, hours, minutes, seconds;
		//ОТРИМУЄМО РІЗНИЦЮ між датами
		const t = Date.parse(endtime) - Date.parse(new Date());//отримуємо числове значення в мілісекундах, віднімаючи від заданої дати поточну дату

		if (t < 0) {
			days = hours = minutes = seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));//Отримуємо кількість днів до закінчення дати deadline, розділивши і округливши дані з t на к-сть мілісекунд в 1 дні
			hours = Math.floor((t / (1000 * 60 * 60) % 24));//спочатку отримуємо к-сть днів, а далі в залишку отримуємо години, використовуючи оператор % і записуємо ціле число годин
			minutes = Math.floor((t / 1000 / 60) % 60 );//аналлогічно отримуємо остаток хвилин і записуємо їх в хвилини на сторінці
			seconds = Math.floor((t / 1000) % 60);
		}


		//ПОВЕРТАЄМО отримані дані днів, годин, хвилин та секунд для можливості їх використання в новій ф-ції, яка буде слідкувати за зміною даних на сторінці
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		}
	}

	//створимо функцію, яка буде прописувати на початку цифру 0 у випадку, якщо число менше 10 (наприклад, 05, а не 5)
	function getZero(num) {
		let item = document.querySelectorAll('.timer__block span');

		// console.log(item);
		if (num > 0 && num < 10) {
			return `0${num}`;

		} else if (num === 0) {
			// item.style.color = 'red';
			item.forEach((i) => {
				i.classList.add('red');
			})
			return `0${num}`;
		} else if (num < 0) {
			// item.style.color = 'red';
			return '00';
		} else {
			return num;
		}
	}

	//пишемо ф-цію, яка буде встановлювати наш таймер на сторінку
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  timeInterval = setInterval(updateClock, 1000);// запускаємо функцію та оновлюємо дані на сторінці щосекунди

		updateClock();//запускаємо функцію вручну, щоб одразу показувало правильні значення, а не ті, які вказані в верстці

		//Пише нову ф-цію, яка буде ОНОВЛЮВАТИ дані нашого таймера щосекунди
		function updateClock() {
			//Розраховуємо час, який залишився конкретно в цю секунду
			const t = getTimeRemaining(endtime);//результат ф-ції getTimeRemaining - {} з необхідними величинами

			//Розміщуємо отримані дані на сторінці за допомогою innerHTML або textContent
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			// зупиняємо таймер, коли дія акції закінчилась
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	//ЗАПУСКАЄМО ф-цію
	setClock(id, deadline);//перемінна deadline може бути як в самому скрипті, так і приходити нам із серверу
};

// module.exports = timer;
export default timer;