let currentLang = localStorage.getItem('siteLang') || localStorage.getItem('selectedLang') || 'id';
const i18nHtmlKeys = new Set(['nostalgia_desc', 'rev_5', 'footer_copyright']);
let languageSwitchTimer;

function updateLanguageButtons(lang) {
    document.querySelectorAll('.language-toggle').forEach(toggle => {
        toggle.dataset.active = lang;
    });

    document.querySelectorAll('.language-btn, .lang-btn').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
}

function setTranslatedContent(el, value) {
    if (i18nHtmlKeys.has(el.getAttribute('data-i18n'))) {
        el.innerHTML = value;
        return;
    }

    if (el.children.length > 0) {
        const textNode = Array.from(el.childNodes).find(node =>
            node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );

        if (textNode) {
            textNode.textContent = value;
        } else {
            el.insertBefore(document.createTextNode(value), el.firstChild);
        }

        return;
    }

    el.textContent = value;
}

function applyLanguage(lang) {
    currentLang = lang;

    localStorage.setItem('siteLang', lang);
    localStorage.setItem('selectedLang', lang);
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-id', lang === 'id');
    document.body.classList.toggle('lang-en', lang === 'en');
    updateLanguageButtons(lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        if (dict[lang] && dict[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[lang][key];
            } else {
                setTranslatedContent(el, dict[lang][key]);
            }
        }
    });

    document.querySelectorAll('[data-wa-text-key]').forEach(el => {
        const key = el.getAttribute('data-wa-text-key');
        const value = dict[lang]?.[key];

        if (value) {
            el.href = `https://wa.me/6281233912015?text=${encodeURIComponent(value)}`;
        }
    });

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const heroTitleMain = document.getElementById('hero-title-main');

    if (heroTitleMain && typeof typeWriter === 'function') {
        if (typeof typingTimer !== 'undefined') {
            clearTimeout(typingTimer);
        }

        heroTitleMain.textContent = '';

        if (typeof i !== 'undefined') {
            i = 0;
        }

        typeWriter();
    }

    window.handleResponsiveRefresh?.();
}

function setLang(lang, options = {}) {
    if (!dict[lang]) return;

    const shouldAnimate = options.animate !== false && document.readyState !== 'loading';

    clearTimeout(languageSwitchTimer);

    if (!shouldAnimate) {
        document.body.classList.remove('lang-switching');
        applyLanguage(lang);
        return;
    }

    document.body.classList.add('lang-switching');

    languageSwitchTimer = setTimeout(() => {
        applyLanguage(lang);
        document.body.classList.remove('lang-switching');
    }, 180);
}

function switchLanguage(lang) {
    setLang(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLang') || localStorage.getItem('selectedLang') || 'id';
    setLang(savedLang, { animate: false });

    document.querySelectorAll('.language-btn, .lang-btn').forEach(btn => {
        if (btn.dataset.langListenerAttached === 'true') return;
        btn.dataset.langListenerAttached = 'true';

        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (!lang || lang === currentLang) {
                updateLanguageButtons(currentLang);
                return;
            }

            updateLanguageButtons(lang);
            setLang(lang);
        });
    });
});
