// Hamburger menu

var i = 0;

$("#hamburger-menu").on('click', function(){
	if (i==0) {
		$("#header-menu").css("display", "flex").fadeIn();
		i++;
	}	
	else{
		$("#header-menu").fadeOut(function(){
			$("#header-menu").css("display", "none")});
			i=0;
	}	
});

$(window).resize(function(){
	if (window.screen.width > 910) {
		$("#header-menu").css("display", "flex");
		i=0;
	}
	else {
		$("#header-menu").css("display", "none");
		i=0;
	}
});

// Сourse block

$(document).ready(function(){
	$('.course-block').slick({
		// dots: true,
		arrows: false,
		infinite: true,
		speed: 700,
		// fade: true,
		// cssEase: 'linear',
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		variableWigth: true,
		// centerMode: true,
		// centerPadding: '0px',
		responsive: [
			{
			breakpoint: 851,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				dots: true
			}
			},
			{
			breakpoint: 651,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true
			}
			}
		]
	});
  });

// Feadback block

function Feedback(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.feedback')
	};

	// Carousel objects
	this.sldrList = this.sldrRoot.querySelector('.feedback-block');
	this.sldrElements = this.sldrList.querySelectorAll('.feedback-item');
	this.sldrElemFirst = this.sldrList.querySelector('.feedback-item');
	// this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	// this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('div.feedback-circle-block');

	// Initialization
	this.options = Feedback.defaults;
	Feedback.initialize(this)
};

Feedback.defaults = {

	// Default options for the carousel
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,     // Автоматическое пролистывание
	interval: 10000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Feedback.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			// this.leftArrow.style.display = 'none'
		};
		// this.rightArrow.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.display = 'flex';
	this.sldrElements[prevElement].style.display = 'none';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Feedback.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			// this.rightArrow.style.display = 'none'
		};
		// this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.display = 'flex';
	this.sldrElements[prevElement].style.display = 'none';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Feedback.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#b3b3b3; cursor:pointer;'
};

Feedback.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#767676; cursor:default;'
};

Feedback.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; // Количество элементов

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= 1) {   // Отключить навигацию
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		// that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // показать первый элемент
		that.sldrElemFirst.style.display = 'flex';
	};

	if(!that.options.loop) {
		// that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	/*if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};*/

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let n=0; n<that.elemCount; n++) {
			sum += '<div class="feedback-circle"></div>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('div.feedback-circle');
		// Назначаем точкам обработчик события 'click'
		for(let m=0; m<that.elemCount; m++) {
			that.indicatorDotsAll[m].addEventListener('click', function() {
				diffNum = Math.abs(m - that.currentElement);
				if(m < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(m > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если m == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let n=1; n<that.elemCount; n++) {
			that.dotOn(n)
		}
	}
};

new Feedback();

// Mentors block

function Mentors(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.mentors')
	};

	// Carousel objects
	this.sldrList = this.sldrRoot.querySelector('.mentors-block');
	this.sldrElements = this.sldrList.querySelectorAll('.mentors-item');
	this.sldrElemFirst = this.sldrList.querySelector('.mentors-item');
	// this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	// this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('div.mentors-circle-block');

	// Initialization
	this.options = Mentors.defaults;
	Mentors.initialize(this)
};

Mentors.defaults = {

	// Default options for the carousel
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,     // Автоматическое пролистывание
	interval: 10000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Mentors.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			// this.leftArrow.style.display = 'none'
		};
		// this.rightArrow.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.display = 'flex';
	this.sldrElements[prevElement].style.display = 'none';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Mentors.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			// this.rightArrow.style.display = 'none'
		};
		// this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.display = 'flex';
	this.sldrElements[prevElement].style.display = 'none';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Mentors.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#b3b3b3; cursor:pointer;'
};

Mentors.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#767676; cursor:default;'
};

Mentors.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; // Количество элементов

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= 1) {   // Отключить навигацию
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		// that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // показать первый элемент
		that.sldrElemFirst.style.display = 'flex';
	};

	if(!that.options.loop) {
		// that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	/*if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};*/

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let n=0; n<that.elemCount; n++) {
			sum += '<div class="mentors-circle"></div>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('div.mentors-circle');
		// Назначаем точкам обработчик события 'click'
		for(let m=0; m<that.elemCount; m++) {
			that.indicatorDotsAll[m].addEventListener('click', function() {
				diffNum = Math.abs(m - that.currentElement);
				if(m < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(m > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если m == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let n=1; n<that.elemCount; n++) {
			that.dotOn(n)
		}
	}
};

new Mentors();

/*
// Feadback block

$("#feedback-circle1").on('click', function(){
	$("#feedback-item1").css("display", "flex").fadeIn();
	$("#feedback-circle1").css("background-color", "#767676");
	$("#feedback-item2").css("display", "none").fadeOut();
	$("#feedback-circle2").css("background-color", "#b3b3b3");
	$("#feedback-item3").css("display", "none").fadeOut();
	$("#feedback-circle3").css("background-color", "#b3b3b3");
});
$("#feedback-circle2").on('click', function(){
	$("#feedback-item1").css("display", "none").fadeOut();
	$("#feedback-circle1").css("background-color", "#b3b3b3");
	$("#feedback-item2").css("display", "flex").fadeIn();
	$("#feedback-circle2").css("background-color", "#767676");
	$("#feedback-item3").css("display", "none").fadeOut();
	$("#feedback-circle3").css("background-color", "#b3b3b3");
});
$("#feedback-circle3").on('click', function(){
	$("#feedback-item1").css("display", "none").fadeOut();
	$("#feedback-circle1").css("background-color", "#b3b3b3");
	$("#feedback-item2").css("display", "none").fadeOut();
	$("#feedback-circle2").css("background-color", "#b3b3b3");
	$("#feedback-item3").css("display", "flex").fadeIn();
	$("#feedback-circle3").css("background-color", "#767676");
});
*/
/*
// Mentors block

$("#mentors-circle1").on('click', function(){
	$("#mentors-item1").css("display", "flex").fadeIn();
	$("#mentors-circle1").css("background-color", "#767676");
	$("#mentors-item2").css("display", "none").fadeOut();
	$("#mentors-circle2").css("background-color", "#b3b3b3");
	$("#mentors-item3").css("display", "none").fadeOut();
	$("#mentors-circle3").css("background-color", "#b3b3b3");
});
$("#mentors-circle2").on('click', function(){
	$("#mentors-item1").css("display", "none").fadeOut();
	$("mentors-circle1").css("background-color", "#b3b3b3");
	$("#mentors-item2").css("display", "flex").fadeIn();
	$("#mentors-circle2").css("background-color", "#767676");
	$("#mentors-item3").css("display", "none").fadeOut();
	$("#mentors-circle3").css("background-color", "#b3b3b3");
});
$("#mentors-circle3").on('click', function(){
	$("#mentors-item1").css("display", "none").fadeOut();
	$("#mentors-circle1").css("background-color", "#b3b3b3");
	$("#mentors-item2").css("display", "none").fadeOut();
	$("#mentors-circle2").css("background-color", "#b3b3b3");
	$("#mentors-item3").css("display", "flex").fadeIn();
	$("#mentors-circle3").css("background-color", "#767676");
});
*/
/*
// Сourse block

function Сourse(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.course')
	};

	// Carousel objects
	this.sldrList = this.sldrRoot.querySelector('.course-block');
	this.sldrElements = this.sldrList.querySelectorAll('.course-items');
	this.sldrElemFirst = this.sldrList.querySelector('.course-items');
	// this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	// this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('div.course-circle-block');

	// Initialization
	this.options = Сourse.defaults;
	Сourse.initialize(this)
};

Сourse.defaults = {

	// Default options for the carousel
	loop: true,     // Бесконечное зацикливание слайдера
	auto: true,     // Автоматическое пролистывание
	interval: 10000, // Интервал между пролистыванием элементов (мс)
	arrows: true,   // Пролистывание стрелками
	dots: true      // Индикаторные точки
};

Сourse.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			// this.leftArrow.style.display = 'none'
		};
		// this.rightArrow.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.display = 'flex';
	this.sldrElements[prevElement].style.display = 'none';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Сourse.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			// this.rightArrow.style.display = 'none'
		};
		// this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.display = 'flex';
	this.sldrElements[prevElement].style.display = 'none';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Сourse.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#b3b3b3; cursor:pointer;'
};

Сourse.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#767676; cursor:default;'
};

Сourse.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; // Количество элементов

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= 1) {   // Отключить навигацию
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		// that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // показать первый элемент
		that.sldrElemFirst.style.display = 'flex';
	};

	if(!that.options.loop) {
		// that.leftArrow.style.display = 'none';  // отключить левую стрелку
		that.options.auto = false; // отключить автопркрутку
	}
	else if(that.options.auto) {   // инициализация автопрокруки
		setAutoScroll();
		// Остановка прокрутки при наведении мыши на элемент
		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	/*if(that.options.arrows) {  // инициализация стрелок
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};*//*

	if(that.options.dots) {  // инициализация индикаторных точек
		let sum = '', diffNum;
		for(let n=0; n<that.elemCount; n++) {
			sum += '<div class="course-circle"></div>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('div.course-circle');
		// Назначаем точкам обработчик события 'click'
		for(let m=0; m<that.elemCount; m++) {
			that.indicatorDotsAll[m].addEventListener('click', function() {
				diffNum = Math.abs(m - that.currentElement);
				if(m < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(m > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Если m == that.currentElement ничего не делаем
			}, false)
		};
		that.dotOff(0);  // точка[0] выключена, остальные включены
		for(let n=1; n<that.elemCount; n++) {
			that.dotOn(n)
		}
	}
};

new Сourse();
*/