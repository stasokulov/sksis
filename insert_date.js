window.onload = () => {
    const date = new Date();
    const year = date.getFullYear();
    const dateContainers = document.querySelectorAll('[data-datetime]');
    dateContainers.forEach(container => {
        if (container.dataset.datetime === 'year') {
            container.innerHTML = year;
        }
    });
};
