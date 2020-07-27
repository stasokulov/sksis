// Когда целевой блок хедера доскролливается до верха страницы, вынимаем его из потока и фиксируем его относительно экрана.
// Чтобы нижележащие блоки не прыгнули вверх, заменяем вынутый блок пустым блоком той же высоты.
window.addEventListener('scroll', get_sticky_header);

function get_sticky_header () {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector("header");
    const fixed = document.querySelector("header.fixed");
    const emptyHeader = document.querySelector(".empty-header");
    const sticky = document.querySelector(".sticky");
    const headerPaddingTop = 22;
    const mobile = window.innerWidth < 992;
    if (header) {
        if (scrolled > sticky.offsetTop - headerPaddingTop &&
            fixed === null &&
            mobile) {
            const emptyBlock = document.createElement('div');
            emptyBlock.classList.add('empty-header');
            emptyBlock.style.height = header.offsetHeight + 'px';
            header.insertAdjacentElement('beforebegin', emptyBlock);
            header.classList.add('fixed');
        } else if (scrolled <= sticky.offsetTop + headerPaddingTop &&
            fixed !== null) {
            header.classList.remove('fixed');
            // emptyHeader.remove();
            emptyHeader.parentElement.removeChild(emptyHeader); //For IE
        }
    }
}
