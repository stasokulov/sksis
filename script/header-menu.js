let burger = document.querySelector('.burger');
let main = document.querySelector('main');
let footer = document.querySelector('footer');
burger.addEventListener('click', function() {
    main.classList.toggle('hidden');
    footer.classList.toggle('hidden');
});
