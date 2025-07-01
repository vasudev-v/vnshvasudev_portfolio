// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize splash screen sequence
    initializeSplashScreen();
    
    // Initialize all other features after splash
    setTimeout(() => {
        initializeAnimations();
        initializeScrollEffects();
        initializeSmoothScrolling();
        initializeHeaderEffects();
        initializeFormHandling();
        initializeInteractiveEffects();
    }, 3000); // After splash screen completes
    
});

// Initialize splash screen and transition
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainWebsite = document.getElementById('mainWebsite');
    
    // After 2.5 seconds, start fade out
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        
        // Show main website after splash fades
        setTimeout(() => {
            mainWebsite.classList.add('show');
            // Enable scrolling
            document.body.style.overflow = 'auto';
        }, 500);
        
    }, 2500);
    
    // Prevent scrolling during splash
    document.body.style.overflow = 'hidden';
}

// Initialize scroll-triggered animations
function initializeAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hero-text, .about-text, .about-image, .section-title, .portfolio-item, .skill-card, .certificate-card, .contact-cta, .contact-form-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Run initial check
    animateOnScroll();
}

// Initialize scroll effects for different sections
function initializeScrollEffects() {
    // Portfolio items animation with staggered delay
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const skillCards = document.querySelectorAll('.skill-card');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    // Function to animate elements with delay
    const animateWithDelay = (elements, delay) => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.classList.add('animate');
            }, index * delay);
        });
    };

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate portfolio grid
                if (entry.target.classList.contains('portfolio-grid')) {
                    animateWithDelay(portfolioItems, 150);
                }
                // Animate skills grid
                if (entry.target.classList.contains('skills-grid')) {
                    animateWithDelay(skillCards, 100);
                }
                // Animate certificates grid
                if (entry.target.classList.contains('certificates-grid')) {
                    animateWithDelay(certificateCards, 120);
                }
                
                // Animate section titles
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animate');
                }
                
                // Animate about section
                if (entry.target.classList.contains('about-container')) {
                    setTimeout(() => {
                        document.querySelector('.about-text')?.classList.add('animate');
                    }, 200);
                    setTimeout(() => {
                        document.querySelector('.about-image')?.classList.add('animate');
                    }, 400);
                }
                
                // Animate contact section
                if (entry.target.classList.contains('contact-container')) {
                    setTimeout(() => {
                        document.querySelector('.contact-cta')?.classList.add('animate');
                    }, 200);
                    setTimeout(() => {
                        document.querySelector('.contact-form-container')?.classList.add('animate');
                    }, 400);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const skillsGrid = document.querySelector('.skills-grid');
    const certificatesGrid = document.querySelector('.certificates-grid');
    const sectionTitles = document.querySelectorAll('.section-title');
    const aboutContainer = document.querySelector('.about-container');
    const contactContainer = document.querySelector('.contact-container');

    if (portfolioGrid) observer.observe(portfolioGrid);
    if (skillsGrid) observer.observe(skillsGrid);
    if (certificatesGrid) observer.observe(certificatesGrid);
    if (aboutContainer) observer.observe(aboutContainer);
    if (contactContainer) observer.observe(contactContainer);
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize header effects
function initializeHeaderEffects() {
    // Header background change on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// Initialize form handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with your actual form handling)
            setTimeout(() => {
                // Success feedback
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#4CAF50';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 2000);
                
                // You can replace this with actual form submission logic:
                // fetch('/submit-form', {
                //     method: 'POST',
                //     body: formData
                // }).then(response => {
                //     // Handle response
                // });
                
            }, 1500);
        });
        
        // Add real-time form validation
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }
}

// Form validation functions
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styles
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Initialize interactive effects
function initializeInteractiveEffects() {
    initializePortfolioInteractions();
    initializeButtonInteractions();
    initializeParallaxEffects();
    initializeAccessibility();
}

// Add interactive effects to portfolio items
function initializePortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click event for potential modal or page navigation
        item.addEventListener('click', function() {
            // You can add navigation to project detail pages here
            console.log('Portfolio item clicked:', this.querySelector('h3')?.textContent);
        });
    });
}

// Add interactive effects to buttons
function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.btn:not(.form-submit)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Parallax effect for elements
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply subtle parallax to hero section
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Focus management for form fields
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (document.body.classList.contains('keyboard-navigation')) {
                this.style.outline = '2px solid #fff';
            }
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Utility function for debouncing scroll events
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

// Performance optimization: Use passive listeners where appropriate
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based animations can go here
}, 10), { passive: true });

// Add mobile menu toggle (if needed in future)
function initializeMobileMenu() {
    // Placeholder for mobile menu functionality
    // Can be implemented when adding mobile hamburger menu
}

// Add smooth transitions for page elements
function addSmoothTransitions() {
    const elements = document.querySelectorAll('.portfolio-item, .skill-card, .btn');
    elements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
}

// Initialize smooth transitions after load
document.addEventListener('DOMContentLoaded', addSmoothTransitions);

// Handle form submission with email service (example with EmailJS)
function setupEmailService() {
    // Example EmailJS integration (uncomment and configure if needed):
    /*
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    console.log('SUCCESS!');
                    alert('Message sent successfully!');
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again.');
                });
        });
    }
    */
}

// Add CSS styles for form validation errors
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff4444 !important;
        background: rgba(255, 68, 68, 0.1) !important;
    }
    
    .error-message {
        color: #ff4444;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #fff !important;
    }
`;
document.head.appendChild(style);