setInterval(() => {
    const date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleDateString() + " | " + date.toLocaleTimeString() + " | IST";
}, 1000);

const slides = document.getElementById('slides');
const slideCount = document.querySelectorAll('.slide').length;
let index = 0;

function nextSlide() {
    index = (index + 1) % slideCount;
    slides.style.transform = `translateX(-${index * 80}%)`;
}

setInterval(nextSlide, 1000); 
