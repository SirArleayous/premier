/* ==========================================================================
   PREMIER PROPERTIES CONSULT LTD - INTERACTIVE ENGINE
   Vanilla JS with GSAP ScrollTrigger Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader Timeout & Initialization ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                initGSAPAnimations();
            }, 600);
        });
    }

    // --- 2. Scroll Progress Bar ---
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';
        
        // Sticky Header shrink
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // --- 3. Custom Desktop Cursor ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (cursor && follower && window.innerWidth > 991) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });
    }

    // --- 4. Mobile Navigation Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
        
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // --- 5. Interactive Property Configurator ("Find Your Place") ---
    const propertyData = {
        'prop-haske': {
            title: 'HASKE CITY',
            location: 'Yolde-Pate, Off Barack Road',
            price: '₦2,500,000 – ₦5,000,000',
            deposit: 'From ₦1,000,000 Initial Deposit',
            img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
            desc: 'A vibrant residential development offering 50/100 and 100/100 plots with flexible 3-month payment plans.'
        },
        'prop-highway': {
            title: 'MAIN HIGHWAY OF ADAMAWA LAND',
            location: 'After NDLEA Checkpoint, Beside Himmaz Trade Centre',
            price: '₦13,000,000 / Hectare',
            deposit: 'High Return Commercial Investment',
            img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
            desc: 'Strategic commercial corridor land positioned directly along Adamawa’s key transit highway.'
        },
        'prop-court': {
            title: 'PREMIER COURT (PHASE 1)',
            location: 'Jan Kasa, Behind Fintiri 1000 Housing Estate',
            price: '₦380,000 – ₦760,000',
            deposit: 'From ₦150,000 Initial Deposit',
            img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
            desc: 'Accessible residential layout situated right behind the landmark Fintiri housing scheme.'
        }
    };

    const configContent = document.getElementById('configuratorContent');
    const configTabs = document.querySelectorAll('.config-tab-btn');

    function renderConfigurator(propKey) {
        if (!configContent) return;
        const data = propertyData[propKey];
        configContent.style.opacity = '0';
        
        setTimeout(() => {
            configContent.innerHTML = `
                <div class="col-lg-6">
                    <img src="${data.img}" alt="${data.title}" class="w-100 rounded border-dark" style="height:300px; object-fit:cover;">
                </div>
                <div class="col-lg-6">
                    <span class="text-gold fs-7 font-serif tracking-wider d-block mb-1"><i class="fas fa-map-marker-alt me-1"></i> ${data.location}</span>
                    <h3 class="font-serif text-white fs-3 mb-2">${data.title}</h3>
                    <p class="text-muted fs-7 mb-3">${data.desc}</p>
                    <div class="glass-inner p-3 mb-3">
                        <span class="fs-8 text-muted d-block">INVESTMENT RANGE</span>
                        <strong class="text-gold font-serif fs-4">${data.price}</strong>
                        <small class="d-block text-white fs-8 mt-1">${data.deposit}</small>
                    </div>
                    <a href="contact.html?property=${propKey}#inquire" class="btn btn-gold btn-sm">
                        <span>INQUIRE ABOUT THIS PROPERTY</span>
                    </a>
                </div>
            `;
            configContent.style.opacity = '1';
        }, 300);
    }

    if (configTabs.length > 0) {
        renderConfigurator('prop-haske');
        configTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                configTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                renderConfigurator(e.target.getAttribute('data-target'));
            });
        });
    }

    // --- 6. Property Payment Calculator ---
    const calcProperty = document.getElementById('calcProperty');
    const calcPlot = document.getElementById('calcPlot');
    
    function calculatePayment() {
        if (!calcProperty || !calcPlot) return;
        
        const prop = calcProperty.value;
        const plot = calcPlot.value;
        
        let price = 0, deposit = 0;

        if (prop === 'haske') {
            if (plot === '50x100') { price = 2500000; deposit = 1000000; }
            else { price = 5000000; deposit = 2000000; }
        } else if (prop === 'court') {
            if (plot === '50x100') { price = 380000; deposit = 150000; }
            else { price = 760000; deposit = 250000; }
        }

        const balance = price - deposit;
        const monthly = balance / 3;

        document.getElementById('calcTotalPrice').textContent = '₦' + price.toLocaleString();
        document.getElementById('calcInitialDeposit').textContent = '₦' + deposit.toLocaleString();
        document.getElementById('calcBalance').textContent = '₦' + balance.toLocaleString();
        document.getElementById('calcMonthly').textContent = '₦' + Math.round(monthly).toLocaleString();
    }

    if (calcProperty && calcPlot) {
        calcProperty.addEventListener('change', calculatePayment);
        calcPlot.addEventListener('change', calculatePayment);
    }

    // --- 7. Contact Form Handling (Frontend-only Interaction) ---
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            if (formSuccessMessage) {
                formSuccessMessage.classList.remove('d-none');
            }
        });
    }

    // Auto-select property dropdown from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPropParam = urlParams.get('property');
    const propertySelect = document.getElementById('propertySelect');
    if (selectedPropParam && propertySelect) {
        propertySelect.value = selectedPropParam;
    }

    // --- 8. Intersection Observer for Scroll Animations ---
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-element').forEach(el => revealObserver.observe(el));

    // --- 9. GSAP Smooth Animations ---
    function initGSAPAnimations() {
        if (typeof gsap !== 'undefined') {
            gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1.2, delay: 0.2 });
            gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.5 });
            gsap.from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
        }
    }
});