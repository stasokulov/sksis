const date = new Date();
const year = date.getFullYear();
const dateContainers = document.querySelectorAll('[data-datetime]');
const dateContainersArray = Array.prototype.slice.call(dateContainers); //For IE

dateContainersArray.forEach(function(container) {
    if (container.dataset.datetime === 'year') {
        container.innerHTML = year;
    }
});
