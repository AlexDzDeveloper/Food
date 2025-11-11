require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

// import 'slick-slider';//приклад використання slick-slider, імпортуючи його із нод-пакета. Таким чином не потрібно додатково завантажувати і підключати додатковий файл скриптів

import calc from './js/modules/calc';
import cards from './js/modules/cards';
import forms from './js/modules/forms';
import modal from './js/modules/modal';
import slider from './js/modules/slider';
import tabs from './js/modules/tabs';
import timer from './js/modules/timer';
import {openModal} from './js/modules/modal';

//назначаємо глобальний обробник подій DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
	//Автоматичне відкриття модального вікна, коли користувач пробув на сторінці 10сек
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
/* 	const calc = require('./modules/calc'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		modal = require('./modules/modal'),
		slider = require('./modules/slider'),
		tabs = require('./modules/tabs'),
		timer = require('./modules/timer'); */

	calc();
	cards();
	forms('form', modalTimerId);
	modal('[data-modal]', '.modal', modalTimerId);
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2027-01-11');
	slider({//порушуємо порядок передання аргументів для впевненості в деструктуризації
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});

});

const myModule = require('./js/main');

const myModuleInstance = new myModule();

myModuleInstance.hello();
myModuleInstance.goodbye();