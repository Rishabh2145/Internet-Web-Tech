document.getElementById('applicationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch('/applicationSubmit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        });

        const result = await response.json(); 

        if (response.ok) {
            // Redirect to new page after successful insert
            window.location.href = result.redirect;
        } else {
            alert(result.error || "Something went wrong.");
        }
    } catch (err) {
        alert("Submission failed. Please try again.");
        console.error(err);
    }
});