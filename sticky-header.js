window.addEventListener('scroll', get_sticky_header);

function get_sticky_header () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector("header");
    let fixed = document.querySelector("header.fixed");
    let emptyHeader = document.querySelector(".empty-header");
    let sticky = document.querySelector(".sticky");
    let headerPaddingTop = 22;
    let mobile = window.innerWidth < 992;
    if (header) {
        if (scrolled > sticky.offsetTop - headerPaddingTop &&
            fixed === null &&
            mobile) {
            let emptyBlock = document.createElement('div');
            emptyBlock.classList.add('empty-header');
            emptyBlock.style.height = header.offsetHeight + 'px';
            header.before(emptyBlock);
            header.classList.add('fixed');
        } else if (scrolled <= sticky.offsetTop + headerPaddingTop && fixed !== null) {
            header.classList.remove('fixed');
            emptyHeader.remove();
        }
    }
}
