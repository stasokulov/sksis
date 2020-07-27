// В стопке слайдов по очереди переставляем стиль, дающий видимость слайду.
// Каждый раз перезаписываем содержимое полей баннера данными из базы.
// Когда слайды заканчиваются, начинаем сначала.
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const slidesArray = Array.prototype.slice.call(slides); //For IE
let counter = 0;

const banner = document.querySelector('.banner');
const eventDay = banner.querySelector('.banner__event-day');
const eventMonth = banner.querySelector('.banner__event-month');
const eventTitle = banner.querySelector('.banner__event-title');
const eventSubtitle = banner.querySelector('.banner__event-subtitle');
const sliderDataBase = [
    {
        day: 25,
        month: 'января',
        title: 'день студента',
        subtitle: 'Подздравляем всех учащихся с Днем студента. Желаем творческих и профессиональных успехов.'
    }, {
        day: 1,
        month: 'апреля',
        title: 'день дурака',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ipsum iusto labore nulla!'
    }, {
        day: 31,
        month: 'декабря',
        title: 'Новый год',
        subtitle: 'Изначально Раиса Кудашева опубликовала стихотворение «Ёлка» в детском журнале «Малютка» в 1903 году.'
    }
]

function showFirstSlide() {
    slidesArray.forEach(function(slide) {
        slide.classList.remove('active')
    });
    counter = 0;
    slidesArray[counter].classList.add('active');
    fillBanner(counter);
}
function turnSlides() {
    if(counter < slidesArray.length - 1) {
        slidesArray[counter].classList.remove('active');
        slidesArray[counter + 1].classList.add('active');
        counter++;
        fillBanner(counter);
    } else {
        showFirstSlide();
    }
}
function fillBanner(counter) {
    let currentSlide = sliderDataBase[counter];
    eventDay.innerHTML = currentSlide.day;
    eventMonth.innerHTML = currentSlide.month;
    eventTitle.innerHTML = currentSlide.title;
    eventSubtitle.innerHTML = currentSlide.subtitle;
}

showFirstSlide();
setInterval(turnSlides,4000);
