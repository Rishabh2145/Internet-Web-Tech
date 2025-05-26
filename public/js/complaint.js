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



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("complaint_form");

    form.onsubmit = async (event) => {
        event.preventDefault();

        const complaintData = {
            user_id: form.user_id.value.trim(),
            complaint_type: form.complaint_type.value.trim(),
            complaint: form.complaint.value.trim()
        };


        console.log("Submitting:", complaintData);

        try {
            const response = await fetch("/api/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(complaintData),
            });

            const data = await response.json();
            // console.log("Response:", data);
            if (data.success == true) {
                let i = 0;
                const countdownSeconds = 4;

                const intervalId = setInterval(() => {
                    const secondsLeft = countdownSeconds - i;
                    document.getElementById("message").innerHTML = `Complaint submitted successfully! <br> Redirecting to <strong>Dashboard</strong> in ${secondsLeft} seconds...`;
                    document.getElementById('submit').disabled = true;
                    document.getElementById('message').style.textAlign = "center";
                    document.getElementById('submit').style.backgroundColor = "grey";
                    i++;
                    if (i > countdownSeconds) {
                        clearInterval(intervalId);
                        window.location.href = "/";
                        document.getElementById("message").innerHTML = "";
                    }
                }, 1000);
            }
            else {
                document.getElementById("message").innerHTML = `Error in complaint registration: <p style = "color : red ; margin : 0px">Invalid User ID </p> <br height = "2px"> Try again and enter correct User ID!.`;
                document.getElementById('message').style.textAlign = "center";
                document.getElementById('submit').disabled = false;
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };
});
