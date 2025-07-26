// Enhanced Blog JavaScript with Modern Functionality

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// State Management
const blogState = {
  currentFilter: 'all',
  searchQuery: '',
  visiblePosts: 6,
  allPosts: [],
  isLoading: false
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeBlog();
});

// Initialize Blog Functionality
function initializeBlog() {
  setupScrollProgress();
  setupNavbarScrollEffect();
  setupMobileNavigation();
  setupSearchFunctionality();
  setupFilterFunctionality();
  setupIntersectionObserver();
  setupLoadMoreFunctionality();
  setupNewsletterForm();
  setupSmoothScrolling();
  initializeAnimations();
  
  // Store all blog posts for filtering
  blogState.allPosts = Array.from($$('.blog-card'));
}

// Scroll Progress Indicator
function setupScrollProgress() {
  const progressBar = $('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / windowHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}

// Enhanced Navbar Scroll Effect
function setupNavbarScrollEffect() {
  const navbar = $('.navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollY > lastScrollY && scrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

// Mobile Navigation
function setupMobileNavigation() {
  const hamburger = $('.hamburger');
  const navMenu = $('.nav-menu');
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  // Close mobile menu when clicking on links
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
}

// Advanced Search Functionality
function setupSearchFunctionality() {
  const searchInput = $('#searchInput');
  if (!searchInput) return;

  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      blogState.searchQuery = e.target.value.toLowerCase().trim();
      filterPosts();
    }, 300);
  });

  // Add search suggestions (future enhancement)
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.classList.add('focused');
  });

  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.classList.remove('focused');
  });
}

// Enhanced Filter Functionality
function setupFilterFunctionality() {
  const filterButtons = $$('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Update filter state
      blogState.currentFilter = btn.dataset.category;
      blogState.visiblePosts = 6; // Reset visible posts
      
      // Filter posts with animation
      filterPosts();
    });
  });
}

// Filter Posts with Smooth Animation
function filterPosts() {
  const posts = blogState.allPosts;
  const blogGrid = $('.blog-grid');
  
  if (!blogGrid) return;

  // Add loading state
  blogGrid.classList.add('filtering');
  
  posts.forEach((post, index) => {
    const category = post.dataset.category;
    const title = post.querySelector('h3').textContent.toLowerCase();
    const content = post.querySelector('p').textContent.toLowerCase();
    
    const matchesFilter = blogState.currentFilter === 'all' || category === blogState.currentFilter;
    const matchesSearch = !blogState.searchQuery || 
                         title.includes(blogState.searchQuery) || 
                         content.includes(blogState.searchQuery);
    
    if (matchesFilter && matchesSearch) {
      // Show with staggered animation
      setTimeout(() => {
        post.style.display = 'flex';
        post.classList.add('fade-in', 'visible');
      }, index * 100);
    } else {
      // Hide with fade out
      post.classList.remove('visible');
      setTimeout(() => {
        post.style.display = 'none';
      }, 300);
    }
  });

  // Remove loading state
  setTimeout(() => {
    blogGrid.classList.remove('filtering');
  }, 600);

  // Update results count
  updateResultsCount();
}

// Update Results Count
function updateResultsCount() {
  const visiblePosts = $$('.blog-card[style*="flex"], .blog-card:not([style*="none"])').length;
  
  // You can add a results counter here if needed
  console.log(`Showing ${visiblePosts} articles`);
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation for grid items
        if (entry.target.classList.contains('blog-card')) {
          const cards = Array.from($$('.blog-card'));
          const index = cards.indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);

  // Observe elements
  $$('.fade-in').forEach(el => observer.observe(el));
}

// Load More Functionality
function setupLoadMoreFunctionality() {
  const loadMoreBtn = $('.load-more-btn');
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (blogState.isLoading) return;
    
    blogState.isLoading = true;
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // In a real app, you'd fetch more posts here
      blogState.visiblePosts += 3;
      
      // Show more posts
      const hiddenPosts = $$('.blog-card[style*="none"]');
      const postsToShow = Array.from(hiddenPosts).slice(0, 3);
      
      postsToShow.forEach((post, index) => {
        setTimeout(() => {
          post.style.display = 'flex';
          post.classList.add('fade-in', 'visible');
        }, index * 200);
      });

      // Reset button
      blogState.isLoading = false;
      loadMoreBtn.textContent = 'Load More Articles';
      loadMoreBtn.disabled = false;

      // Hide button if no more posts
      if (hiddenPosts.length <= 3) {
        loadMoreBtn.style.display = 'none';
      }
    }, 1500);
  });
}

// Newsletter Form
function setupNewsletterForm() {
  const form = $('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    if (!email || !isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showNotification('Thank you for subscribing! You\'ll receive updates soon.', 'success');
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  });
}

// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show Notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 2rem',
    backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea',
    color: 'white',
    borderRadius: '12px',
    fontWeight: '600',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Smooth Scrolling
function setupSmoothScrolling() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize Animations
function initializeAnimations() {
  // Add entrance animations to hero elements
  const heroElements = $$('.blog-hero-content > *');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, (index + 1) * 200);
  });

  // Add hover effects to cards
  $$('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add parallax effect to hero section
  const hero = $('.blog-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    
    if (navMenu && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  }

  // Ctrl/Cmd + K focuses search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = $('#searchInput');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Performance Optimization: Debounce scroll events
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

// Theme Detection (for future dark/light mode toggle)
function detectTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

// Analytics (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
  console.log('Event tracked:', eventName, properties);
  // Implement analytics tracking here
}

// Export functions for potential external use
window.BlogApp = {
  filterPosts,
  showNotification,
  trackEvent
};

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Error Handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // Implement error reporting here
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Implement error reporting here
});
