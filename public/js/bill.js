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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error('Not logged in');

    const data = await res.json();
    document.getElementById('logged').innerText = `Welcome, ${data.username} !`;
    document.getElementById('logged').style.fontWeight = "bold";
    document.getElementById('logout').style.display = 'block';
    document.getElementById('acc_id').value = data.account_ID;
    document.getElementById('username').value = data.username;
    document.getElementById('acc_id').disabled = true;
    document.getElementById('username').disabled = true;

  } catch (err) {
    console.log('User not logged in or error:', err.message);
  }
});



document.getElementById('pay-button').addEventListener('click', async () => {
  try {
    const res = await fetch('/api/bill', { method: 'POST' });
    if (!res.ok) throw new Error('Payment failed');

    const data = await res.json();
    console.log(data);
    const current = new Date();
    const day = current - new Date(data.billingDate);
    const days = Math.floor(day / (1000 * 60 * 60 * 24));
    const billAmount = days * 10; // Assuming a rate of 10 per day
    console.log(`Bill amount for ${days} days: ${billAmount}`);
    document.querySelector('input[placeholder="Meter Rupees"]').value = billAmount;
  } catch (err) {
    console.error('Payment error:', err.message);
  }
}); 