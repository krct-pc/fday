// Drifton Events - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize animations
    initAnimations();
    
    // Initialize event cards (if on events page)
    if (document.querySelector('.events-grid')) {
        initEventCards();
    }
    
    // Initialize FAQ accordion if on contact page
    initFaqAccordion();
});

// FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-question');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.parentElement.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
}

// Initialize Animations
function initAnimations() {
    // Add fade-in class to elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize Event Cards
function initEventCards() {
    // This function can be expanded to load event data dynamically from a JSON file
    // For now, it just adds click event listeners to the cards
    
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the click is not on the button, navigate to the event page
            if (!e.target.closest('.btn')) {
                const eventLink = card.getAttribute('data-event-link');
                if (eventLink) {
                    window.location.href = eventLink;
                }
            }
        });
    });
}

// Function to open registration form
function openRegistrationForm(formUrl) {
    if (formUrl) {
        window.open(formUrl, '_blank');
    } else {
        console.error('No registration form URL provided');
    }
}

// Helper function to create event cards dynamically
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('data-event-link', `events/${event.slug}.html`);
    
    card.innerHTML = `
        <img src="${event.image}" alt="${event.name}" class="event-card-img">
        <div class="event-card-content">
            <h3 class="event-card-title">${event.name}</h3>
            <p class="event-card-tagline">${event.tagline}</p>
            <a href="events/${event.slug}.html" class="btn btn-primary">View Details</a>
        </div>
    `;
    
    return card;
}

// Load events data (can be used if you want to load events dynamically)
function loadEvents(categoryType) {
    // This is a placeholder function that would normally fetch data from a server
    // For now, we'll use hardcoded data
    
    const technicalEvents = [
        {
            name: "Code Seek",
            slug: "codeseek",
            tagline: "Hunt. Code. Conquer.",
            image: "assets/images/event-banners/codeseek.jpg"
        },
        {
            name: "Hackathon",
            slug: "hackathon",
            tagline: "48 hours of innovation",
            image: "assets/images/event-banners/hackathon.jpg"
        },
        {
            name: "Tech Quiz",
            slug: "quiz",
            tagline: "Test your tech knowledge",
            image: "assets/images/event-banners/quiz.jpg"
        }
    ];
    
    const nonTechnicalEvents = [
        {
            name: "Gaming Tournament",
            slug: "gaming",
            tagline: "Battle for glory",
            image: "assets/images/event-banners/gaming.jpg"
        },
        {
            name: "Talent Show",
            slug: "talent",
            tagline: "Showcase your skills",
            image: "assets/images/event-banners/talent.jpg"
        },
        {
            name: "Photography Contest",
            slug: "photography",
            tagline: "Capture the moment",
            image: "assets/images/event-banners/photography.jpg"
        }
    ];
    
    return categoryType === 'technical' ? technicalEvents : nonTechnicalEvents;
}

// Function to populate events grid
function populateEventsGrid(categoryType) {
    const eventsGrid = document.querySelector('.events-grid');
    if (!eventsGrid) return;
    
    const events = loadEvents(categoryType);
    
    eventsGrid.innerHTML = '';
    
    events.forEach(event => {
        const card = createEventCard(event);
        eventsGrid.appendChild(card);
    });
}