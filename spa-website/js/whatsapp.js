/* ==============================
   WHATSAPP CONFIGURATION
============================== */

// Country code + number, no + or spaces.
const SPA_WHATSAPP_NUMBER = "918192953955";

const SPA_WHATSAPP_MESSAGE =
    "Hello, I would like to know more about your spa services and booking availability.";

function openWhatsApp(message = SPA_WHATSAPP_MESSAGE) {
    const whatsappURL =
        `https://wa.me/${SPA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

/* General WhatsApp button */
function contactWhatsApp() {
    openWhatsApp();
}

/* Service-specific WhatsApp booking */
function bookService(serviceName) {
    const message =
        `Hello The Comfort Spa, I would like to book ${serviceName}. Please share the available timings and booking details.`;

    openWhatsApp(message);
}