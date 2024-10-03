const languages = [
    { code: 'it', name: 'Italiano' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh-CN', name: '中文' }
];

let currentLang = 'it';

// Funzione per cambiare la lingua
function changeLang(langCode) {
    if (langCode === currentLang) return;

    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {

        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change'));
        currentLang = langCode;

        let currentElement = document.getElementById(langCode);
        let parent = currentElement.parentNode;
        let siblings = Array.from(parent.children);
        let siblingElements = siblings.filter(sibling => sibling !== currentElement);

        currentElement.classList.add('selectedLang');
        siblingElements.forEach(sibling => {
            sibling.classList.remove('selectedLang');
        });

    }
}

// Funzione per inizializzare Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'it',
        includedLanguages: languages.map(lang => lang.code).join(','),
        multilanguagePage: true, // Disabilita la barra di traduzione in alto
        autoDisplay: false
    }, 'google_translate_element');

    // Nascondi l'elemento di Google Translate
    const googleTranslateElement = document.getElementById('google_translate_element');
    if (googleTranslateElement) {
        googleTranslateElement.style.display = 'none';
    }
}

// Carica lo script di Google Translate
document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // Crea l'elemento per Google Translate
    const googleTranslateElement = document.createElement('div');
    googleTranslateElement.id = 'google_translate_element';
    googleTranslateElement.style.display = 'none';
    document.body.insertBefore(googleTranslateElement, document.body.firstChild);
});