// ===============================
// Hero Slider
// ===============================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');

let currentSlide = 0;

function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('bg-white/50', 'border-transparent', 'scale-100');
            dot.classList.add('bg-white', 'border-gray-400', 'ring-4', 'ring-white/30', 'scale-125');
        } else {
            dot.classList.remove('bg-white', 'border-gray-400', 'ring-4', 'ring-white/30', 'scale-125');
            dot.classList.add('bg-white/50', 'border-transparent', 'scale-100');
        }
    });
}

function showSlide(index) {
    if (slides.length === 0) return;

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0');
            slide.classList.add('opacity-100');
        } else {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
        }
    });

    currentSlide = index;
    updateDots();

    // Reset and trigger typewriter
    const heroTitleMain = document.getElementById('hero-title-main');

    if (heroTitleMain) {
        heroTitleMain.textContent = '';
    }

    if (typeof typingTimer !== 'undefined') {
        clearTimeout(typingTimer);
    }

    if (typeof i !== 'undefined') {
        i = 0;
    }

    if (typeof typeWriter === 'function') {
        typeWriter();
    }
}

function nextSlide() {
    if (slides.length === 0) return;

    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function goToSlide(index) {
    showSlide(index);
}

// Supaya onclick="goToSlide(0)" di HTML bisa membaca function ini
window.goToSlide = goToSlide;

if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
}


// ===============================
// Review Carousel
// ===============================
const reviewSlider = document.getElementById('reviews-container');

let isReviewDown = false;
let reviewStartX;
let reviewScrollLeft;

if (reviewSlider) {
    // Cursor awal
    reviewSlider.style.cursor = 'grab';

    // Drag pakai mouse
    reviewSlider.addEventListener('mousedown', (e) => {
        isReviewDown = true;
        reviewSlider.style.cursor = 'grabbing';

        reviewStartX = e.pageX - reviewSlider.offsetLeft;
        reviewScrollLeft = reviewSlider.scrollLeft;
    });

    reviewSlider.addEventListener('mouseleave', () => {
        isReviewDown = false;
        reviewSlider.style.cursor = 'grab';
    });

    reviewSlider.addEventListener('mouseup', () => {
        isReviewDown = false;
        reviewSlider.style.cursor = 'grab';
    });

    reviewSlider.addEventListener('mousemove', (e) => {
        if (!isReviewDown) return;

        e.preventDefault();

        const x = e.pageX - reviewSlider.offsetLeft;
        const walk = (x - reviewStartX) * 2;
        reviewSlider.scrollLeft = reviewScrollLeft - walk;
    });

    // Drag pakai touch HP
    reviewSlider.addEventListener('touchstart', (e) => {
        reviewStartX = e.touches[0].pageX - reviewSlider.offsetLeft;
        reviewScrollLeft = reviewSlider.scrollLeft;
    });

    reviewSlider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - reviewSlider.offsetLeft;
        const walk = (x - reviewStartX) * 2;
        reviewSlider.scrollLeft = reviewScrollLeft - walk;
    });
}

function slideLeft() {
    const reviewSlider = document.getElementById('reviews-container');

    if (reviewSlider) {
        reviewSlider.scrollBy({
            left: -460,
            behavior: 'smooth'
        });
    }
}

function slideRight() {
    const reviewSlider = document.getElementById('reviews-container');

    if (reviewSlider) {
        reviewSlider.scrollBy({
            left: 460,
            behavior: 'smooth'
        });
    }
}

// Supaya onclick="slideLeft()" dan onclick="slideRight()" di HTML bisa membaca function ini
window.slideLeft = slideLeft;
window.slideRight = slideRight;