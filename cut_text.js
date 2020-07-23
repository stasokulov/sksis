//    Находим помеченные блоки. В каждом из них находим внутренний помеченный блок с текстом.
//    Текст обрезаем так, чтобы внутренний блок не растягивался и не выходил за рамки внешнего.
//    Добавляем многоточие в конце.

window.onload = () => {
    const containers = document.querySelectorAll('[data-cut_text="container"]');
    containers.forEach(container => {
        // Собираем данные о блоке.
        const contHeight = container.offsetHeight;
        const contWidth = container.offsetWidth;
        const blockText = container.querySelector('[data-cut_text="text"]');
        const text = blockText.innerHTML;
        // Клонируем блок, вставляем клон в родитель исходного блока, чтобы на них действовали одинаковые стили.
        // Скрываем клон, снимаем ограничение на высоту, задаем ширину равную ширине исходного блока.
        const cloneContainer = container.cloneNode(true);
        cloneContainer.style.position = 'absolute';
        cloneContainer.style.visibility = 'hidden';
        cloneContainer.style.height = 'auto';
        cloneContainer.style.width = contWidth + 'px';
        const parentContainer = container.parentElement;
        parentContainer.appendChild(cloneContainer);
        // Если клон растянулся в высоту, то у текста в клоне итеративно отрезаем символ с конца, добавляем многоточие, вставляем обратно, снова сравниваем.
        const cloneBlockText = cloneContainer.querySelector('[data-cut_text="text"]');
        let cutTextLength = text.length;
        for(; cloneContainer.offsetHeight > contHeight && cutTextLength >= 0; cutTextLength--) {
            cloneBlockText.innerHTML = text.substring(0, cutTextLength) + '...';
        }
        // Когда высота клона перестала превышать высоту исходного блока, или если символы закончились, вставляем обрезанный текств исходный блок.
        blockText.innerHTML = cloneBlockText.innerHTML;
        // Удаляем клон.
        cloneContainer.remove();
    });
};
