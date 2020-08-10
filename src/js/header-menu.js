// При клике на бургер скрываем блоки ниже хедера.
const burger = document.querySelector('.burger');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
burger.addEventListener('click', function() {
    main.classList.toggle('hidden');
    footer.classList.toggle('hidden');
});
