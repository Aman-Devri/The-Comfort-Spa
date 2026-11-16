/* ==============================
   APPOINTMENT BOOKING
============================== */

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

    // Set minimum date to today
    const dateInput = document.getElementById("preferredDate");

    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

    appointmentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        const fullName = document
            .getElementById("fullName")
            .value
            .trim();

        const phoneNumber = document
            .getElementById("phoneNumber")
            .value
            .trim();

        const spaService = document
            .getElementById("spaService")
            .value;

        const preferredDate = document
            .getElementById("preferredDate")
            .value;

        const preferredTime = document
            .getElementById("preferredTime")
            .value;

        const message = document
            .getElementById("message")
            .value
            .trim();


        /* ==============================
           VALIDATION
        ============================== */

        let isValid = true;

        if (fullName.length < 2) {
            showError(
                "fullNameError",
                "Please enter your full name."
            );

            isValid = false;
        }

        // Allows digits, spaces, +, -, brackets and requires
        // a reasonable phone number length.
        const phonePattern = /^[0-9+\-\s()]{7,20}$/;

        if (!phonePattern.test(phoneNumber)) {
            showError(
                "phoneNumberError",
                "Please enter a valid phone number."
            );

            isValid = false;
        }

        if (!spaService) {
            showError(
                "spaServiceError",
                "Please select a spa service."
            );

            isValid = false;
        }

        if (!preferredDate) {
            showError(
                "preferredDateError",
                "Please select your preferred date."
            );

            isValid = false;
        }

        if (!preferredTime) {
            showError(
                "preferredTimeError",
                "Please select your preferred time."
            );

            isValid = false;
        }


        if (!isValid) {
            return;
        }


        /* ==============================
           FORMAT DATE
        ============================== */

        const dateObject = new Date(preferredDate + "T00:00:00");

        const formattedDate = dateObject.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


        /* ==============================
           FORMAT WHATSAPP MESSAGE
        ============================== */

        const whatsappMessage =
`Hello The Comfort Spa,

I would like to book a relaxation experience.

Name: ${fullName}
Phone: ${phoneNumber}
Spa Service: ${spaService}
Preferred Date: ${formattedDate}
Preferred Time: ${preferredTime}
Message: ${message || "No additional message."}

Please let me know the availability and booking confirmation.

Thank you.`;


        /* ==============================
           OPEN WHATSAPP
        ============================== */

        // This uses the same WhatsApp number configured
        // in whatsapp.js.
        const whatsappURL =
            `https://wa.me/${SPA_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
}


/* ==============================
   ERROR FUNCTIONS
============================== */

function showError(elementId, message) {

    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}


function clearErrors() {

    const errors = document.querySelectorAll(".form-error");

    errors.forEach(function (error) {
        error.textContent = "";
    });
}