const translations = {
    fr: {
        title: "StyleMe",
        subtitle: "Plateforme d'échange de vêtements anti-fast-fashion et écoresponsable",
        banner: "Découvrez StyleMe : L'alternative écoresponsable à la fast-fashion ! Échangez vos vêtements et contribuez à un avenir durable.",
        imagesTitle: "Inspiration",
        contact: "Contactez-nous",
        name: "Nom:",
        email: "Email:",
        message: "Message:",
        submit: "Envoyer"
    },
    en: {
        title: "StyleMe",
        subtitle: "Anti-fast-fashion and eco-responsible clothing exchange platform",
        banner: "Discover StyleMe: The eco-responsible alternative to fast-fashion! Exchange your clothes and contribute to a sustainable future.",
        imagesTitle: "Inspiration",
        contact: "Contact Us",
        name: "Name:",
        email: "Email:",
        message: "Message:",
        submit: "Send"
    },
    de: {
        title: "StyleMe",
        subtitle: "Anti-Fast-Fashion und umweltfreundliche Kleidungstauschplattform",
        banner: "Entdecken Sie StyleMe: Die umweltfreundliche Alternative zur Fast-Fashion! Tauschen Sie Ihre Kleidung und tragen Sie zu einer nachhaltigen Zukunft bei.",
        imagesTitle: "Inspiration",
        contact: "Kontaktieren Sie uns",
        name: "Name:",
        email: "E-Mail:",
        message: "Nachricht:",
        submit: "Senden"
    },
    es: {
        title: "StyleMe",
        subtitle: "Plataforma de intercambio de ropa anti-fast-fashion y eco-responsable",
        banner: "¡Descubre StyleMe: La alternativa eco-responsable a la fast-fashion! Intercambia tu ropa y contribuye a un futuro sostenible.",
        imagesTitle: "Inspiración",
        contact: "Contáctanos",
        name: "Nombre:",
        email: "Correo electrónico:",
        message: "Mensaje:",
        submit: "Enviar"
    }
};

function setLanguage(lang) {
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('subtitle').textContent = translations[lang].subtitle;
    document.getElementById('banner-text').textContent = translations[lang].banner;
    document.getElementById('images-title').textContent = translations[lang].imagesTitle;
    document.getElementById('contact-title').textContent = translations[lang].contact;
    document.getElementById('name-label').textContent = translations[lang].name;
    document.getElementById('email-label').textContent = translations[lang].email;
    document.getElementById('message-label').textContent = translations[lang].message;
    document.getElementById('submit-btn').value = translations[lang].submit;
    document.documentElement.lang = lang;
}

document.getElementById('lang-select').addEventListener('change', function() {
    setLanguage(this.value);
});

// Set default language
setLanguage('fr');