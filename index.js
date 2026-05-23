/**
 * PORTFOLIO LANDINGPAGE - JOHANNES GEIS
 * Interactive JavaScript logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SECURE EMAIL OBFUSCATION (SPAMSCHUTZ) ---
    const secureEmailSetup = () => {
        const u = 'johannes.geis';
        const d = 'bistum-essen.de';
        const emailLink = document.getElementById('contact-email-action');
        const emailDisplay = document.getElementById('obfuscated-email-display');
        
        if (emailLink && emailDisplay) {
            const fullEmail = `${u}@${d}`;
            
            // Set dynamic click handler to prevent static scraper bots
            emailLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `mailto:${fullEmail}?subject=Anfrage%20-%20Johannes%20Geis%20Portfolio`;
            });
            
            // Populate display text after page load
            emailDisplay.textContent = fullEmail;
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
                
                // Animate hamburger lines if needed, or simple icon swap
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
                // Pause at the end of the word
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next word
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        // Start typewriter
        setTimeout(type, 1000);
    };
    
    typewriterSetup();

    // --- 4. INTERACTIVE KI & WORKSHOP CONFIGURATOR ---
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
                desc: 'die kreative Formatentwicklung mithilfe von KI-Systemen'
            },
            'liturgy': {
                title: 'Liturgie & KI: Teilnahme fördern',
                desc: 'die Förderung tätiger liturgischer Teilhabe durch moderne KI-Tools'
            },
            'research': {
                title: 'Hintergrundrecherche & Zielgruppen',
                desc: 'die Hintergrundrecherche und präzise Zielgruppenanalyse in der Katechese'
            },
            'comm': {
                title: 'KI in der Glaubenskommunikation',
                desc: 'den innovativen Einsatz von KI in Social Media und kirchlicher Medienarbeit'
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
        
        let selectedTheme = 'format';
        let selectedFormat = 'halb-workshop';
        
        // Update the generated text output
        const updateResult = () => {
            const themeData = themes[selectedTheme];
            const formatData = formats[selectedFormat];
            
            const message = `Hallo Herr Geis,

ich habe Ihr Online-Portfolio besucht und interessiere mich für ${formatData.text} zum Thema „${themeData.title}“ (${themeData.desc}).

Ich freue mich über eine Rückmeldung bezüglich möglicher Termine und Konditionen.

Mit freundlichen Grüßen`;
            
            textPreview.textContent = message;
        };
        
        // Add click events to theme choices
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedTheme = option.getAttribute('data-value');
                updateResult();
            });
        });
        
        // Add click events to format choices
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
                
                // Trigger mailto with obfuscated email protection
                const u = 'johannes.geis';
                const d = 'bistum-essen.de';
                const subject = encodeURIComponent(`Anfrage: ${formats[selectedFormat].title} - ${themes[selectedTheme].title}`);
                const body = encodeURIComponent(compiledText);
                
                setTimeout(() => {
                    window.location.href = `mailto:${u}@${d}?subject=${subject}&body=${body}`;
                }, 800); // Small delay to let toast show
            }).catch(err => {
                console.error('Kopieren fehlgeschlagen: ', err);
                // Fallback direct mailto trigger if clipboard copy fails
                const u = 'johannes.geis';
                const d = 'bistum-essen.de';
                window.location.href = `mailto:${u}@${d}?subject=Anfrage&body=${encodeURIComponent(compiledText)}`;
            });
        });
        
        // Initial build
        updateResult();
    };
    
    configuratorSetup();

    // --- 5. SCROLL-REVEAL-EFFEKTE (INTERSECTION OBSERVER) ---
    const revealSetup = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                threshold: 0.1, // trigger when 10% of element is in view
                rootMargin: '0px 0px -50px 0px' // offset to trigger slightly before coming into viewport
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Unobserve after revealing to prevent multiple animations
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            revealElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            revealElements.forEach(el => el.classList.add('active'));
        }
    };
    
    revealSetup();
    
    // --- 6. FLOATING NAVIGATION BAR STYLING ---
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
