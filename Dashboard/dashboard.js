setInterval(() => {
    const date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleDateString() + " | " + date.toLocaleTimeString() + " | IST";
}, 1000);

const slides = document.getElementById('slides');
const slideCount = document.querySelectorAll('.slide').length;
let index = 0;

function nextSlide() {
    index = (index + 1) % slideCount;
    const slider = document.getElementById('slider');
    const slideWidth = slider.clientWidth;
    slides.style.transition = 'transform 1s ease-in-out';
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
}

setInterval(nextSlide, 3000);

// var menu_icon = document.getElementById("menu-hover");
// var hover_icon = document.getElementById("hover");
// menu_icon.addEventListener('mouseover', () => {
//     hover_icon.style.display = "block";
//     menu_icon.style.height = "0px";
//     menu_icon.style.width = "0px";
// });
// hover_icon.addEventListener('mouseover', () => {
//     hover_icon.style.display = "block";
//     menu_icon.style.height = "0px";
//     menu_icon.style.width = "0px";
// });
// menu_icon.addEventListener('mouseout', () => {
//     setTimeout(() => {
//         if (!hover_icon.matches(':hover')) {
//             hover_icon.style.display = "none";
//             menu_icon.style.display = "block";
//             menu_icon.style.height = "35px";
//         }
//     }, 1000);
// });

// hover_icon.addEventListener('mouseout', () => {
//     hover_icon.style.display = "none"; 
//     menu_icon.style.height = "35px";
// });

var menu_icon = document.getElementById("menu-hover");
var hover_icon = document.getElementById("hover");

// Function to set event listeners
function setupListeners() {
    if (window.innerWidth <= 768) { // Mobile: Click behavior
        menu_icon.addEventListener('click', toggleMenu);
        hover_icon.addEventListener('click', toggleMenu);

        // Click outside to close
        document.addEventListener('click', (event) => {
            if (!menu_icon.contains(event.target) && !hover_icon.contains(event.target)) {
                closeMenu();
            }
        });
    } else { // Desktop: Hover behavior
        menu_icon.addEventListener('mouseover', showHover);
        hover_icon.addEventListener('mouseover', showHover);

        menu_icon.addEventListener('mouseout', hideHoverDelayed);
        hover_icon.addEventListener('mouseout', hideHover);
    }
}

// Helper functions
function toggleMenu(event) {
    event.stopPropagation(); // Prevent closing immediately when clicking menu_icon

    if (hover_icon.style.display === "block") {
        closeMenu();
    } else {
        hover_icon.style.display = "block";
        menu_icon.style.height = "0px";
        menu_icon.style.width = "0px";
    }
}

function closeMenu() {
    hover_icon.style.display = "none";
    menu_icon.style.height = "35px";
    menu_icon.style.width = "35px";
}

function showHover() {
    hover_icon.style.display = "block";
    menu_icon.style.height = "0px";
    menu_icon.style.width = "0px";
}

function hideHoverDelayed() {
    setTimeout(() => {
        if (!hover_icon.matches(':hover')) {
            closeMenu();
            menu_icon.style.display = "block"; // in case it was hidden
        }
    }, 1000);
}

function hideHover() {
    hover_icon.style.display = "none";
    menu_icon.style.height = "35px";
    menu_icon.style.width = "35px";
}

// Initialize
setupListeners();

