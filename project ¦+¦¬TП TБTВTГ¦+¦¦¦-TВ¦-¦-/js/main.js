const buttonsColor = document.querySelectorAll('.btn-color');
const javaScript = document.querySelector('#js-color');
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const slideIndicator = document.querySelector('#slide-indicator');

let index = 0;
let sliderTimerId = null;

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i += 1) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }

    return color;
};

const applyAccentColor = (color) => {
    javaScript.style.color = color;
    document.documentElement.style.setProperty('--accent', color);
};

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        const color = generateRandomColor();
        buttonColor.textContent = color;
        buttonColor.style.borderColor = color;
        buttonColor.style.boxShadow = `inset 0 0 0 1px ${color}`;
        buttonColor.onclick = () => applyAccentColor(color);
    });
};

const updateIndicator = () => {
    if (slideIndicator) {
        slideIndicator.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
};

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.classList.remove('active_slide');
    });
};

const showSlide = (i = 0) => {
    slides[i].classList.add('active_slide');
    updateIndicator();
};

const renderSlider = (i) => {
    index = i;
    hideSlide();
    showSlide(index);
};

const startAutoSlider = () => {
    clearInterval(sliderTimerId);
    sliderTimerId = setInterval(() => {
        const nextIndex = index >= slides.length - 1 ? 0 : index + 1;
        renderSlider(nextIndex);
    }, 7000);
};

setRandomColors();
renderSlider(index);
startAutoSlider();

window.addEventListener('keydown', (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault();
        setRandomColors();
    }
});

if (next) {
    next.onclick = () => {
        const nextIndex = index >= slides.length - 1 ? 0 : index + 1;
        renderSlider(nextIndex);
        startAutoSlider();
    };
}

if (prev) {
    prev.onclick = () => {
        const prevIndex = index <= 0 ? slides.length - 1 : index - 1;
        renderSlider(prevIndex);
        startAutoSlider();
    };
}
