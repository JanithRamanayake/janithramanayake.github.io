

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});



// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});





// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});




// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});



// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.section-title, .project-card, .skill-item, .blog-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Slide in animations
    const slideLeftElements = document.querySelectorAll('.about-content, .contact-info');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.profile-card, .contact-form, .skills-tree');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        observer.observe(item);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Profile image parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        const rate = scrolled * -0.1;
        profileImage.style.transform = `translateY(${rate}px)`;
    }
});

// Skills tree animation on hover
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    item.addEventListener('animationend', () => {
        item.style.animation = '';
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add active class to current nav item
function setActiveNavItem() {
    const currentPath = window.location.hash || '#home';
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Initialize active nav item
document.addEventListener('DOMContentLoaded', setActiveNavItem);
window.addEventListener('hashchange', setActiveNavItem);

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Blog cards hover effect
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const placeholder = card.querySelector('.blog-placeholder');
        if (placeholder) {
            placeholder.style.transform = 'scale(1.1)';
            placeholder.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const placeholder = card.querySelector('.blog-placeholder');
        if (placeholder) {
            placeholder.style.transform = 'scale(1)';
        }
    });
});















// Initialize particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 50 },
    color: { value: '#667eea' },
    shape: { type: 'circle' },
    opacity: { value: 0.2 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#667eea',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: false }
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  retina_detect: true
});


// Handle SPA-style routing
document.querySelectorAll('a.nav-link[data-page]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const pageUrl = this.getAttribute('data-page');
    const path = this.getAttribute('href');
    history.pushState({}, '', path);

    fetch(pageUrl)
      .then(res => res.text())
      .then(html => {
        document.body.innerHTML = html;
        window.scrollTo(0, 0);
      });
  });
});

window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  if (path === '/blog') {
    fetch('blog.html')
      .then(res => res.text())
      .then(html => {
        document.body.innerHTML = html;
        window.scrollTo(0, 0);
      });
  }
});


