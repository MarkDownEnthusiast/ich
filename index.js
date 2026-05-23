/**
 * PORTFOLIO LANDINGPAGE - JOHANNES GEIS
 * Refined JavaScript Logic (Multi-select configurator, Modal overlays, Obfuscation)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SECURE EMAIL OBFUSCATION (SPAMSCHUTZ) ---
    const secureEmailSetup = () => {
        const u = 'johannes.geis';
        const d = 'bistum-essen.de';
        const emailLink = document.getElementById('contact-email-action');
        const emailDisplay = document.getElementById('obfuscated-email-display');
        const modalEmails = document.querySelectorAll('.modal-obfuscated-email');
        
        if (emailLink && emailDisplay) {
            const fullEmail = `${u}@${d}`;
            
            // Set dynamic click handler to prevent static scraper bots
            emailLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `mailto:${fullEmail}?subject=Kontakt%20-%20Johannes%20Geis%20Portfolio`;
            });
            
            // Populate display text after page load
            emailDisplay.textContent = fullEmail;
        }

        // Also secure emails inside Modals
        if (modalEmails.length > 0) {
            const fullEmail = `${u}@${d}`;
            modalEmails.forEach(elem => {
                elem.textContent = fullEmail;
                elem.style.cursor = 'pointer';
                elem.style.textDecoration = 'underline';
                elem.style.color = 'var(--teal-light)';
                elem.addEventListener('click', () => {
                    window.location.href = `mailto:${fullEmail}`;
                });
            });
        }
    };
    
    secureEmailSetup();

    // --- 2. RESPONSIVE NAVIGATION MENU ---
    const navMenuSetup = () => {
        const menuToggle = document.getElementById('nav-menu-toggle');
        const navMenu = document.getElementById('nav-menu-list');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', !isOpen);
                
                menuToggle.innerHTML = isOpen 
                    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`
                    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            });
            
            // Close mobile menu when clicking any nav link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
                });
            });
        }
    };
    
    navMenuSetup();

    // --- 3. DYNAMIC HERO TYPEWRITER EFFECT ---
    const typewriterSetup = () => {
        const words = [
            "Pastoralreferent",
            "Theologe",
            "KI-Coach im kirchlichen Raum",
            "Brückenbauer"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const target = document.getElementById('typewriter-text');
        
        if (!target) return;
        
        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                target.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                target.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 40 : 80;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        setTimeout(type, 1000);
    };
    
    typewriterSetup();

    // --- 4. INTERACTIVE MULTI-SELECT CONFIGURATOR ---
    const configuratorSetup = () => {
        const themeOptions = document.querySelectorAll('#config-step-theme .config-option');
        const formatOptions = document.querySelectorAll('#config-step-format .config-option');
        const textPreview = document.getElementById('config-text-preview');
        const copyBtn = document.getElementById('btn-config-copy-action');
        const toast = document.getElementById('copy-toast');
        
        if (!textPreview || !copyBtn) return;
        
        // Configuration mapping
        const themes = {
            'format': {
                title: 'Formatentwicklung mit KI',
                desc: 'Formatentwicklung mithilfe von KI'
            },
            'liturgy': {
                title: 'Liturgie & KI: Teilnahme fördern',
                desc: 'Förderung tätiger Liturgieteilnahme durch KI-Tools'
            },
            'research': {
                title: 'Hintergrundrecherche & Zielgruppen',
                desc: 'Hintergrundrecherche und Zielgruppenanalyse'
            },
            'comm': {
                title: 'KI in der Glaubenskommunikation',
                desc: 'Einsatz von KI in der Glaubenskommunikation'
            }
        };
        
        const formats = {
            'impulsvortrag': {
                title: 'Impulsvortrag',
                text: 'einen Impulsvortrag (1-2 Std.)'
            },
            'halb-workshop': {
                title: 'Halbtages-Workshop',
                text: 'einen halbtägigen Workshop (4 Std.)'
            },
            'ganz-workshop': {
                title: 'Ganztages-Workshop',
                text: 'einen ganztägigen Workshop (8 Std.)'
            },
            'coaching': {
                title: 'Einzelcoaching',
                text: 'ein individuelles Einzelcoaching'
            }
        };
        
        let selectedThemes = ['format']; // Pre-selected default (multi-select)
        let selectedFormat = 'halb-workshop'; // Pre-selected default (single-select)
        
        // Update the generated text output (with grammatically correct German phrasing)
        const updateResult = () => {
            const formatData = formats[selectedFormat];
            
            // Build German phrasing for themes
            let themesPhrase = '';
            if (selectedThemes.length === 0) {
                themesPhrase = 'zu einem Ihrer angebotenen KI-Themen';
            } else if (selectedThemes.length === 1) {
                const themeData = themes[selectedThemes[0]];
                themesPhrase = `zum Thema „${themeData.title}“ (${themeData.desc})`;
            } else {
                // List of items
                const items = selectedThemes.map(key => `„${themes[key].title}“ (${themes[key].desc})`);
                const lastItem = items.pop();
                themesPhrase = `zu den Themen ${items.join(', ')} und ${lastItem}`;
            }
            
            const message = `Hallo Herr Geis,

ich habe Ihr Online-Portfolio besucht und interessiere mich für ${formatData.text} ${themesPhrase}.

Ich würde mich freuen, wenn wir dazu unverbindlich in Kontakt treten könnten, um über Inhalte und mögliche Termine zu sprechen.

Mit freundlichen Grüßen`;
            
            textPreview.textContent = message;
        };
        
        // Multi-Select click logic for themes
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const val = option.getAttribute('data-value');
                
                if (option.classList.contains('active')) {
                    // Prevent deselecting if it's the last selected item (at least 1 must stay active)
                    if (selectedThemes.length > 1) {
                        option.classList.remove('active');
                        selectedThemes = selectedThemes.filter(item => item !== val);
                    }
                } else {
                    option.classList.add('active');
                    selectedThemes.push(val);
                }
                updateResult();
            });
        });
        
        // Single-Select click logic for format
        formatOptions.forEach(option => {
            option.addEventListener('click', () => {
                formatOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedFormat = option.getAttribute('data-value');
                updateResult();
            });
        });
        
        // Copy to clipboard & trigger E-Mail Client
        copyBtn.addEventListener('click', () => {
            const compiledText = textPreview.textContent;
            
            // Clipboard API copy
            navigator.clipboard.writeText(compiledText).then(() => {
                // Show toast notification
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3500);
                }
                
                // Formulate subject based on selection
                let subjectThemeStr = '';
                if (selectedThemes.length === 1) {
                    subjectThemeStr = ` - ${themes[selectedThemes[0]].title}`;
                } else if (selectedThemes.length > 1) {
                    subjectThemeStr = ' - Fortbildung & KI';
                }
                
                // Trigger mailto securely
                const u = 'johannes.geis';
                const d = 'bistum-essen.de';
                const subject = encodeURIComponent(`Anfrage: ${formats[selectedFormat].title}${subjectThemeStr}`);
                const body = encodeURIComponent(compiledText);
                
                setTimeout(() => {
                    window.location.href = `mailto:${u}@${d}?subject=${subject}&body=${body}`;
                }, 800); // Small delay to let toast show
            }).catch(err => {
                console.error('Kopieren fehlgeschlagen: ', err);
                const u = 'johannes.geis';
                const d = 'bistum-essen.de';
                window.location.href = `mailto:${u}@${d}?subject=Anfrage&body=${encodeURIComponent(compiledText)}`;
            });
        });
        
        // Initial build
        updateResult();
    };
    
    configuratorSetup();

    // --- 5. MODAL WINDOWS (IMPRESSUM & DATENSCHUTZ) ---
    const modalSetup = () => {
        const triggerImpressum = document.getElementById('trigger-impressum');
        const triggerDatenschutz = document.getElementById('trigger-datenschutz');
        const modalImpressum = document.getElementById('modal-impressum');
        const modalDatenschutz = document.getElementById('modal-datenschutz');
        const closeButtons = document.querySelectorAll('.modal-close');
        
        const openModal = (modal) => {
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        };
        
        const closeModal = (modal) => {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable background scrolling
            }
        };
        
        if (triggerImpressum && modalImpressum) {
            triggerImpressum.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(modalImpressum);
            });
        }
        
        if (triggerDatenschutz && modalDatenschutz) {
            triggerDatenschutz.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(modalDatenschutz);
            });
        }
        
        // Close modal clicking the 'X' button
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-modal');
                const modal = document.getElementById(targetId);
                closeModal(modal);
            });
        });
        
        // Close modal clicking outside the card content
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                closeModal(e.target);
            }
        });
        
        // Close modal pressing 'Escape' key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal(modalImpressum);
                closeModal(modalDatenschutz);
            }
        });
    };
    
    modalSetup();

    // --- 6. SCROLL-REVEAL-EFFEKTE (INTERSECTION OBSERVER) ---
    const revealSetup = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            revealElements.forEach(el => observer.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('active'));
        }
    };
    
    revealSetup();
    
    // --- 7. FLOATING NAVIGATION BAR STYLING ---
    const headerStickySetup = () => {
        const header = document.getElementById('main-header');
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.padding = '5px 0';
                    header.style.boxShadow = '0 10px 30px rgba(9, 13, 22, 0.4)';
                    header.style.borderBottomColor = 'rgba(212, 175, 55, 0.1)';
                } else {
                    header.style.padding = '0';
                    header.style.boxShadow = 'none';
                    header.style.borderBottomColor = 'rgba(148, 163, 184, 0.1)';
                }
            });
        }
    };
    
    headerStickySetup();
});
