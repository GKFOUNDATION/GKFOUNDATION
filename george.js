// ============================================
// GEORGE KITHI FOUNDATION - COMPLETE JAVASCRIPT
// ============================================

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Map navigation links to their corresponding sections
    const navigationMap = {
        'george.html': '#home',
        'about.html': '#about',
        'programs.html': '#programs',
        'News.html': '#news',
        'Impact.html': '#impact',
        'contact.html': '.contact-section'
    };
    
    // Map footer links to sections
    const footerLinksMap = {
        'programs.html': '#programs',
        'donate.html': '.donate-hero',
        'volunteer.html': '.contact-section',
        'contact.html': '.contact-section'
    };
    
    // Handle logo click to go home
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Or scroll to hero section if exists
            const heroSection = document.querySelector('.hero') || document.querySelector('#home');
            if (heroSection) {
                heroSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Handle all navigation links (header)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a file link that should be a section
            if (navigationMap[href]) {
                e.preventDefault();
                const sectionId = navigationMap[href];
                const targetSection = document.querySelector(sectionId);
                
                if (targetSection) {
                    // Add offset for header height
                    const headerOffset = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        const navLinks = document.getElementById('navLinks');
                        const mobileToggle = document.getElementById('mobileToggle');
                        if (navLinks) navLinks.classList.remove('active');
                        if (mobileToggle) mobileToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Handle all footer links
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a file link that should be a section
            if (footerLinksMap[href]) {
                e.preventDefault();
                const sectionId = footerLinksMap[href];
                const targetSection = document.querySelector(sectionId);
                
                if (targetSection) {
                    // Add offset for header height
                    const headerOffset = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '#donate') {
                e.preventDefault();
                
                // Scroll to donate section if it exists
                if (href === '#donate') {
                    const donateSection = document.querySelector('.donate-hero') || 
                                         document.querySelector('.donation-options');
                    if (donateSection) {
                        donateSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navLinks = document.getElementById('navLinks');
                    const mobileToggle = document.getElementById('mobileToggle');
                    if (navLinks) navLinks.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // ============================================
    // MOBILE NAVIGATION
    // ============================================

    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && mobileToggle) {
            if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });

    // Close mobile menu when clicking on a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                }
            });
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================

    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll > 100) {
                header.classList.add('scrolled');
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // NEWS CATEGORY FILTERING
    // ============================================

    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsCards = document.querySelectorAll('.news-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter news cards with animation
            newsCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ============================================
    // DONATION PAGE FUNCTIONALITY
    // ============================================

    // Amount selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('custom-amount-input');
    let selectedAmount = 0;

    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            if (customAmountInput) customAmountInput.value = '';
            updateDonationSummary();
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            selectedAmount = parseInt(this.value) || 0;
            updateDonationSummary();
        });
    }

    // Donation type selection
    const typeOptions = document.querySelectorAll('.type-option');
    let donationType = 'one-time';

    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            donationType = this.getAttribute('data-type');
            updateDonationSummary();
        });
    });

    // Program selection
    const programSelect = document.getElementById('program-select');
    const programDesc = document.getElementById('program-desc');

    if (programSelect && programDesc) {
        programSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const description = selectedOption.getAttribute('data-desc');
            if (description) {
                programDesc.textContent = description;
            }
            updateDonationSummary();
        });
    }

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentInstructions = document.querySelectorAll('.payment-instructions');
    let selectedPaymentMethod = 'mpesa';

    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            selectedPaymentMethod = this.getAttribute('data-method');
            
            // Hide all payment instructions
            paymentInstructions.forEach(instruction => {
                instruction.classList.remove('active');
            });
            
            // Show corresponding payment instructions
            const mpesaInstructions = document.getElementById('mpesa-instructions');
            const cardPayment = document.getElementById('card-payment');
            const bankTransfer = document.getElementById('bank-transfer');
            
            if (selectedPaymentMethod === 'mpesa' && mpesaInstructions) {
                mpesaInstructions.classList.add('active');
            } else if (selectedPaymentMethod === 'card' && cardPayment) {
                cardPayment.classList.add('active');
            } else if (selectedPaymentMethod === 'bank' && bankTransfer) {
                bankTransfer.classList.add('active');
            }
        });
    });

    // Update donation summary function
    function updateDonationSummary() {
        const summaryAmount = document.getElementById('summary-amount');
        const summaryFrequency = document.getElementById('summary-frequency');
        const summaryProgram = document.getElementById('summary-program');
        const summaryTotal = document.getElementById('summary-total');
        const mpesaAmount = document.getElementById('mpesa-amount');
        
        const formattedAmount = `KSh ${selectedAmount.toLocaleString()}`;
        
        if (summaryAmount) summaryAmount.textContent = formattedAmount;
        if (summaryTotal) summaryTotal.textContent = formattedAmount;
        if (mpesaAmount) mpesaAmount.textContent = formattedAmount;
        if (summaryFrequency) {
            summaryFrequency.textContent = donationType === 'monthly' ? 'Monthly' : 'One-time';
        }
        if (summaryProgram && programSelect) {
            summaryProgram.textContent = programSelect.options[programSelect.selectedIndex].text;
        }
    }

    // Form submission
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (selectedAmount === 0) {
                alert('Please select or enter a donation amount');
                return;
            }
            
            const fullName = document.getElementById('full-name')?.value;
            const email = document.getElementById('email')?.value;
            
            if (!fullName || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show success message
            const programName = programSelect ? programSelect.options[programSelect.selectedIndex].text : 'our programs';
            const frequency = donationType === 'monthly' ? 'monthly ' : '';
            
            alert(`Thank you for your ${frequency}donation of KSh ${selectedAmount.toLocaleString()}!\n\nProgram: ${programName}\nPayment method: ${selectedPaymentMethod.toUpperCase()}\n\nYou will receive a confirmation email at ${email} shortly.\n\nYour support makes a real difference in Kilifi County!`);
            
            // Reset form (optional)
            // donationForm.reset();
            // selectedAmount = 0;
            // updateDonationSummary();
        });
    }

    // ============================================
    // LOAD MORE NEWS
    // ============================================

    const loadMoreBtn = document.getElementById('loadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Load More News';
                alert('Loading more news articles... (This feature would load additional articles from your server)');
            }, 1000);
        });
    }

    // ============================================
    // ANIMATE ON SCROLL
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements that should animate
    const animatedElements = document.querySelectorAll('.fade-in, .story-card, .stat-item, .news-card, .impact-card, .program-detail-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================

    function animateCounter(element, target, duration = 2000) {
        const targetText = target.toString();
        const isPercentage = targetText.includes('%');
        const hasPlus = targetText.includes('+');
        const numericTarget = parseInt(targetText.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericTarget / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                const displayValue = Math.floor(current);
                if (isPercentage) {
                    element.textContent = displayValue + '%';
                } else if (hasPlus) {
                    element.textContent = displayValue.toLocaleString() + '+';
                } else {
                    element.textContent = displayValue.toLocaleString();
                }
            }
        }, 16);
    }

    // Animate stat numbers when they come into view
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const target = statNumber.textContent;
                    statNumber.textContent = '0';
                    animateCounter(statNumber, target);
                    entry.target.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item, .hero-stat').forEach(stat => {
        statObserver.observe(stat);
    });

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================

    const contactForms = document.querySelectorAll('.contact-form form, form[action="contact.php"]');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]')?.value;
            const email = this.querySelector('input[name="email"]')?.value;
            const message = this.querySelector('textarea[name="message"]')?.value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert(`Thank you for your message, ${name}!\n\nWe've received your inquiry and will get back to you at ${email} soon.`);
            form.reset();
        });
    });

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================

    // Create scroll to top button if it doesn't exist
    let scrollTopBtn = document.querySelector('.scroll-to-top');
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
    }

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
    });

    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ============================================

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ============================================
    // INITIALIZE ON PAGE LOAD
    // ============================================

    // Set current year in footer
    const yearElements = document.querySelectorAll('.current-year, .footer-bottom p');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', currentYear.toString());
        }
    });
    
    // Initialize donation summary if on donation page
    if (document.getElementById('summary-amount')) {
        updateDonationSummary();
    }

    // ============================================
    // HERO BUTTONS FUNCTIONALITY
    // ============================================

    // Handle hero section buttons
    document.querySelectorAll('.hero-buttons a, .cta-buttons a').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId) || 
                                     document.querySelector(`.${targetId}`);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    console.log('George Kithi Foundation Website - All scripts initialized successfully!');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScroll = function(target, duration = 1000) {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Override native behavior for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                smoothScroll(target);
            }
        });
    });
}