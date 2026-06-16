// Typewriter Effect Logic
let i = 0;
let typingTimer;

function isHeroMobileViewport() {
    return window.innerWidth <= 767;
}

function isHeroTabletPortraitViewport() {
    return window.matchMedia('(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)').matches;
}

function getHeroSubtitleKey(index) {
    if (isHeroMobileViewport()) return `hero_sub_${index}_mobile`;
    if (isHeroTabletPortraitViewport()) return `hero_sub_${index}_tablet`;
    return `hero_sub_${index}`;
}

function updateHeroSlideCopy() {
    if (typeof dict === 'undefined' || !dict[currentLang]) return;

    document.querySelectorAll('.hero-slide').forEach((slide, index) => {
        const badgeEl = slide.querySelector('.hero-badge');
        const subTitleEl = slide.querySelector('.hero-title-sub');
        const subDescEl = slide.querySelector('.hero-description');

        if (badgeEl) badgeEl.textContent = dict[currentLang][`hero_badge_${index}`] || '';
        if (subTitleEl) subTitleEl.textContent = dict[currentLang][`hero_title_${index}_sub`] || '';
        if (subDescEl) subDescEl.textContent = dict[currentLang][getHeroSubtitleKey(index)] || dict[currentLang][`hero_sub_${index}`] || '';
    });
}

function typeWriter() {
    const mainTitleEl = document.getElementById('hero-title-main');
    
    if (typeof dict !== 'undefined' && dict[currentLang]) {
        updateHeroSlideCopy();
        
        const fullText = dict[currentLang][`hero_title_${currentSlide}_main`] || '';
        
        if (mainTitleEl && mainTitleEl.textContent.length === 0) i = 0; // reset
        
        if (mainTitleEl && i < fullText.length) {
            mainTitleEl.textContent += fullText.charAt(i);
            i++;
            typingTimer = setTimeout(typeWriter, 100);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.visibility = 'hidden', 600);
        }, 500); // Wait 0.5s to show preloader briefly
    }

    // Scroll Reveal Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        observer.observe(el);
    });

    // Fallback for missing images
    document.querySelectorAll('.fallback-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    function getGalleryImageSource(img) {
        if (!img) return '';

        const dataSource = img.dataset.gallerySrc || img.dataset.src || img.getAttribute('src') || '';
        if (dataSource && !img.dataset.gallerySrc) {
            img.dataset.gallerySrc = dataSource;
        }

        return img.dataset.gallerySrc || dataSource;
    }

    function recoverGalleryImage(img) {
        const source = getGalleryImageSource(img);
        if (!source) {
            img.closest('.gallery-card-image')?.classList.add('gallery-image-missing');
            return;
        }

        img.loading = 'eager';
        img.decoding = 'async';
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.removeProperty('display');

        const currentSource = img.getAttribute('src') || '';
        if (!currentSource || currentSource === 'undefined' || currentSource === 'null') {
            img.setAttribute('src', source);
        }

        if (currentSource.includes('assets/images/Warung.png') && source !== currentSource) {
            img.setAttribute('src', source);
        }

        if (img.complete && img.naturalWidth === 0 && currentSource !== source) {
            img.setAttribute('src', source);
        }
    }

    function stabilizeResponsiveImages() {
        document.querySelectorAll('.hero-bg, .menu-card-image, .gallery-card-image img, #modal-img, .history-photo, .order-btn img').forEach(img => {
            img.decoding = 'async';
            img.style.removeProperty('display');

            if (img.closest('.gallery-card-image')) {
                recoverGalleryImage(img);
            }

            if (img.complete && img.naturalWidth === 0) {
                img.dispatchEvent(new Event('error'));
            }
        });
    }

    function refreshGalleryMarquee() {
        document.querySelectorAll('[data-gallery-track]').forEach(track => {
            track.querySelectorAll('[data-gallery-clone="true"]').forEach(clone => clone.remove());

            const originals = Array.from(track.children).filter(card => card.classList.contains('gallery-card'));
            if (originals.length === 0) return;

            originals.forEach(card => {
                card.classList.add('hover-lift');
                card.querySelectorAll('.gallery-card-image img').forEach(recoverGalleryImage);

                const clone = card.cloneNode(true);
                clone.dataset.galleryClone = 'true';
                clone.setAttribute('aria-hidden', 'true');
                clone.classList.add('hover-lift');
                clone.querySelectorAll('.gallery-card-image img').forEach(recoverGalleryImage);
                track.appendChild(clone);
            });

            track.dataset.cloned = 'true';
            track.style.animation = 'none';
            void track.offsetWidth;
            track.style.animation = '';
        });

        stabilizeResponsiveImages();
    }

    function activateVisibleRevealItems() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        document.querySelectorAll('.reveal, .reveal-3d, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight + 80 && rect.bottom > -80) {
                el.classList.add('active');
            }
        });
    }

    refreshGalleryMarquee();
    stabilizeResponsiveImages();
    setTimeout(activateVisibleRevealItems, 700);

    document.querySelectorAll('#about .max-w-7xl.mx-auto.grid > div').forEach((card, index) => {
        card.classList.add('reveal-scale', 'hover-lift', 'premium-feature-card');
        card.style.transitionDelay = `${Math.min(index * 80, 240)}ms`;
        observer.observe(card);
    });

    document.querySelectorAll('.timeline-list > div').forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right', 'timeline-3d-item');
        item.style.transitionDelay = `${Math.min(index * 90, 270)}ms`;
        observer.observe(item);
    });

    document.querySelectorAll('#reviews-container > div').forEach((card, index) => {
        card.classList.add('hover-lift', 'review-card-3d');
        card.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
    });

    document.querySelectorAll('#faq details').forEach((item, index) => {
        item.classList.add('reveal-3d', 'faq-card-3d');
        item.style.transitionDelay = `${Math.min(index * 80, 240)}ms`;
        observer.observe(item);
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollDepthItems = Array.from(document.querySelectorAll('.scroll-depth'));
    let scrollDepthTicking = false;

    function resetScrollDepth() {
        scrollDepthItems.forEach(el => {
            el.style.setProperty('--scroll-depth-y', '0px');
            if (el.classList.contains('hero-bg')) {
                el.style.setProperty('--scroll-depth-scale', window.innerWidth < 641 ? '1.03' : '1.04');
            }
        });
    }

    function updateScrollDepth() {
        scrollDepthTicking = false;

        if (reduceMotion.matches || window.innerWidth < 768) {
            resetScrollDepth();
            return;
        }

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        scrollDepthItems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > viewportHeight) return;

            const centerOffset = ((rect.top + rect.height / 2) - viewportHeight / 2) / viewportHeight;
            const depth = el.classList.contains('hero-bg') ? -26 : -14;
            const y = Math.max(-28, Math.min(28, centerOffset * depth));

            el.style.setProperty('--scroll-depth-y', `${y.toFixed(2)}px`);

            if (el.classList.contains('hero-bg')) {
                const scale = 1.055 + Math.min(0.018, Math.abs(centerOffset) * 0.018);
                el.style.setProperty('--scroll-depth-scale', scale.toFixed(3));
            }
        });
    }

    function requestScrollDepthUpdate() {
        if (scrollDepthTicking) return;
        scrollDepthTicking = true;
        window.requestAnimationFrame(updateScrollDepth);
    }

    if (scrollDepthItems.length > 0) {
        updateScrollDepth();
        window.addEventListener('scroll', requestScrollDepthUpdate, { passive: true });
        window.addEventListener('resize', requestScrollDepthUpdate);
        reduceMotion.addEventListener?.('change', requestScrollDepthUpdate);
    }

    const sectionNavLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"], .mobile-link[href^="#"]'));
    const navSectionIds = new Set(sectionNavLinks
        .map(link => link.getAttribute('href')?.slice(1))
        .filter(Boolean));
    const navSections = Array.from(document.querySelectorAll('section[id]'))
        .filter(section => navSectionIds.has(section.id));

    function setActiveNav(id) {
        sectionNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    let navTicking = false;

    function updateActiveNavFromScroll() {
        navTicking = false;

        const marker = Math.min(window.innerHeight * 0.4, 360);
        const current = navSections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= marker && rect.bottom > marker;
        }) || navSections[0];

        if (current?.id) {
            setActiveNav(current.id);
        }
    }

    function requestActiveNavUpdate() {
        if (navTicking) return;
        navTicking = true;
        window.requestAnimationFrame(updateActiveNavFromScroll);
    }

    sectionNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const id = link.getAttribute('href')?.slice(1);
            if (id) setActiveNav(id);
        });
    });

    setActiveNav(window.location.hash?.slice(1) || 'home');

    if ('IntersectionObserver' in window && navSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            if (entries.some(entry => entry.isIntersecting)) {
                requestActiveNavUpdate();
            }
        }, {
            root: null,
            threshold: [0.25, 0.35, 0.5],
            rootMargin: '-20% 0px -55% 0px'
        });

        navSections.forEach(section => sectionObserver.observe(section));
    }

    window.addEventListener('scroll', requestActiveNavUpdate, { passive: true });
    window.addEventListener('resize', requestActiveNavUpdate);

    let responsiveResizeTimer;

    function handleResponsiveRefresh() {
        document.body.classList.add('is-resizing');
        stabilizeResponsiveImages();
        activateVisibleRevealItems();
        requestScrollDepthUpdate();
        requestActiveNavUpdate();
        updateNavbarState();
        updateHeroSlideCopy();

        window.requestAnimationFrame(() => {
            document.body.classList.remove('is-resizing');
        });
    }

    function requestResponsiveRefresh() {
        clearTimeout(responsiveResizeTimer);
        responsiveResizeTimer = setTimeout(handleResponsiveRefresh, 150);
    }

    let galleryResizeTimer;

    window.addEventListener('resize', () => {
        clearTimeout(galleryResizeTimer);
        galleryResizeTimer = setTimeout(() => {
            document.querySelectorAll('.gallery-card-image img').forEach(recoverGalleryImage);
            if (typeof window.refreshGalleryLayout === 'function') {
                window.refreshGalleryLayout();
            }
        }, 150);
    }, { passive: true });

    window.updateHeroLayout = requestScrollDepthUpdate;
    window.refreshGalleryMarquee = refreshGalleryMarquee;
    window.refreshGalleryLayout = stabilizeResponsiveImages;
    window.handleResponsiveRefresh = handleResponsiveRefresh;
    window.addEventListener('resize', requestResponsiveRefresh, { passive: true });
    window.addEventListener('orientationchange', requestResponsiveRefresh, { passive: true });

});

// Set year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar Scroll, Active Link (ScrollSpy) & Hide/Show Logic
const header = document.getElementById('main-header');
const navbar = document.getElementById('navbar');
const topBar = document.getElementById('top-bar');
const backToTop = document.getElementById('backToTop');
let lastScrollTop = 0;

function updateNavbarState() {
    if (!navbar) return;

    const isTop = window.scrollY <= 20;
    navbar.classList.toggle('navbar-top', isTop);
    navbar.classList.toggle('navbar-scrolled', !isTop);
    navbar.classList.toggle('glass-nav', !isTop);
    header?.classList.toggle('shadow-md', !isTop);
}

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    updateNavbarState();

    if (scrollTop > 50) {
        if(topBar) {
            topBar.style.height = '0px';
            topBar.style.paddingTop = '0px';
            topBar.style.paddingBottom = '0px';
            topBar.style.opacity = '0';
        }
    } else {
        if(topBar) {
            topBar.style.height = '';
            topBar.style.paddingTop = '';
            topBar.style.paddingBottom = '';
            topBar.style.opacity = '1';
        }
    }

    if (scrollTop > lastScrollTop && scrollTop > 150) {
        if(header) header.classList.add('-translate-y-full');
    } else {
        if(header) header.classList.remove('-translate-y-full');
    }
    
    if (scrollTop > 500) {
        if(backToTop) {
            backToTop.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTop.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    } else {
        if(backToTop) {
            backToTop.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTop.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 

});

window.addEventListener('load', updateNavbarState);
updateNavbarState();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if(mobileMenu) mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon && mobileMenu) {
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if(mobileMenu) mobileMenu.classList.add('hidden');
        if(mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});
