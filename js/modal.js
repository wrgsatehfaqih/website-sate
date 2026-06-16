// Modal Logic
function openModal(imageSrc, titleKey, descKey, extraKey) {
    const modal = document.getElementById('lightbox-modal');
    const dialog = document.getElementById('modal-dialog');
    const imageWrapper = document.getElementById('modal-image-wrapper');
    const img = document.getElementById('modal-img');
    const title = document.getElementById('modal-title');
    const role = document.getElementById('modal-role');
    const desc = document.getElementById('modal-desc');
    const extra = document.getElementById('modal-extra');
    const langDict = dict[currentLang] || {};
    const isGalleryModal = /^(guest|visitor)_/.test(titleKey);
    const isMenuModal = /^menu_/.test(titleKey);
    const roleKey = isGalleryModal ? titleKey.replace(/_name$/, '_role') : '';

    if (dialog) {
        dialog.classList.toggle('gallery-modal-content', isGalleryModal);
        dialog.classList.toggle('menu-modal-content', isMenuModal);
        dialog.classList.remove('modal-3d');
        void dialog.offsetWidth;
        dialog.classList.add('modal-3d');
    }
    
    if (imageWrapper) {
        imageWrapper.classList.toggle('gallery-modal-image-wrapper', isGalleryModal);
        imageWrapper.classList.toggle('menu-modal-image-wrapper', isMenuModal);
    }

    if (img) {
        img.loading = 'eager';
        img.decoding = 'async';
        img.src = imageSrc;
        img.classList.toggle('gallery-modal-image', isGalleryModal);
        img.classList.toggle('menu-modal-image', isMenuModal);
        img.classList.remove('object-contain', 'object-cover');
        if (img.complete && img.naturalWidth === 0) {
            img.dispatchEvent(new Event('error'));
        }
    }
    if (desc) {
        desc.closest('#modal-content')?.classList.toggle('gallery-modal-text', isGalleryModal);
        desc.closest('#modal-content')?.classList.toggle('menu-modal-text', isMenuModal);
    }
    if (title) {
        title.classList.toggle('gallery-modal-title', isGalleryModal);
        title.classList.toggle('menu-modal-title', isMenuModal);
        title.setAttribute('data-i18n', titleKey);
        title.textContent = langDict[titleKey] || '';
    }
    if (role) {
        if (roleKey) {
            role.setAttribute('data-i18n', roleKey);
        } else {
            role.removeAttribute('data-i18n');
        }
        role.textContent = roleKey ? (langDict[roleKey] || '') : '';
        role.classList.toggle('hidden', !role.textContent.trim());
    }
    if (desc) {
        desc.classList.toggle('gallery-modal-desc', isGalleryModal);
        desc.classList.toggle('menu-modal-desc', isMenuModal);
        desc.setAttribute('data-i18n', descKey);
        desc.textContent = langDict[descKey] || '';
    }
    if (extra) {
        extra.classList.toggle('gallery-modal-quote', isGalleryModal);
        extra.classList.toggle('menu-modal-quote', isMenuModal);
        if (extraKey) {
            extra.setAttribute('data-i18n', extraKey);
        } else {
            extra.removeAttribute('data-i18n');
        }
        extra.textContent = extraKey ? (langDict[extraKey] || '') : '';
        extra.classList.toggle('hidden', !extra.textContent.trim());
    }
    
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            window.handleResponsiveRefresh?.();
        }, 10);
    }
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
