// Hamburger menu

var i = 0;

$("#hamburger-menu").on('click', function(){
	if (i==0) {
		$("#header-menu").css("display", "flex").hide().fadeIn();
		i++;
	}
	else{
		$("#header-menu").fadeOut(function(){
			$("#header-menu").css("display", "none")});
			i=0;
	}
});

$(window).resize(function(){
	if (window.screen.width > 850) {
		$("#header-menu").css("display", "flex");
		i=0;
	}
	else {
		$("#header-menu").css("display", "none");
		i=0;
	}
});

// Sliders

$(document).ready(function(){

	// Сourse block

	$('.course-block').slick({
		arrows: false,
		infinite: true,
		speed: 700,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnFocus: false,
		pauseOnDotsHover: true,
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
			breakpoint: 601,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true
			}
			}
		]
	});

	// Feadback block

	$('.feedback-block').slick({
		dots: true,
		arrows: false,
		infinite: true,
		speed: 700,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnFocus: false,
		pauseOnDotsHover: true,
	});

	// Mentors block

	$('.mentors-block').slick({
		dots: true,
		arrows: false,
		infinite: true,
		speed: 700,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnFocus: false,
		pauseOnDotsHover: true,
	});

if ($('.course-items').length >= 4) {
	$('.course-block').slick("slickSetOption","dots", true, true);
}
else {
	$('.course-block').slick("slickSetOption","dots", false, true);
};
});