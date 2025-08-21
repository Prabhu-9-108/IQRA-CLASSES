/**
 * IQRA Coaching - Interactive Features
 * Production-ready JavaScript with neumorphic design integration
 */

// Application State
const AppState = {
  theme: 'light',
  user: null,
  currentSection: 'home',
  demoSession: null
};

// Course data - can be loaded from external JSON
const courseData = {
  courses: [
    {
      id: 'class-6',
      class: 'Class 6',
      subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      duration: 'Full Academic Year',
      batches: 'Morning & Evening',
      fee: 'â‚¹12,000',
      description: 'Foundation course for Class 6 students with comprehensive Bihar Board curriculum coverage.'
    },
    {
      id: 'class-7',
      class: 'Class 7',
      subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      duration: 'Full Academic Year',
      batches: 'Morning & Evening',
      fee: 'â‚¹13,000',
      description: 'Advanced foundation course building on Class 6 concepts with increased complexity.'
    },
    {
      id: 'class-8',
      class: 'Class 8',
      subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      duration: 'Full Academic Year',
      batches: 'Morning & Evening',
      fee: 'â‚¹14,000',
      description: 'Pre-high school preparation with focus on analytical thinking and problem solving.'
    },
    {
      id: 'class-9',
      class: 'Class 9',
      subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      duration: 'Full Academic Year',
      batches: 'Morning & Evening',
      fee: 'â‚¹15,000',
      description: 'High school foundation with emphasis on board exam preparation strategies.'
    },
    {
      id: 'class-10',
      class: 'Class 10',
      subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      duration: 'Full Academic Year',
      batches: 'Morning & Evening',
      fee: 'â‚¹16,000',
      description: 'Final year preparation with intensive board exam focus and career guidance.'
    }
  ]
};

/**
 * Modal Management Functions
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
    
    console.log(`ðŸ“± Opened modal: ${modalId}`);
  } else {
    console.error(`Modal not found: ${modalId}`);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    console.log(`âŒ Closed modal: ${modalId}`);
  }
}

function switchModal(currentModalId, newModalId) {
  closeModal(currentModalId);
  setTimeout(() => openModal(newModalId), 150);
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.add('hidden');
  });
  document.body.style.overflow = '';
}

/**
 * DOM Content Loaded Event Handler
 * Initialize all application features
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Initialize Application
 * Set up all event listeners and initial state
 */
function initializeApp() {
  console.log('ðŸš€ Initializing IQRA Coaching Application');
  
  // Initialize theme
  initializeTheme();
  
  // Initialize navigation
  initializeNavigation();
  
  // Initialize modals
  initializeModals();
  
  // Initialize forms
  initializeForms();
  
  // Initialize smooth scrolling
  initializeSmoothScrolling();
  
  // Initialize enrollment buttons
  initializeEnrollmentButtons();
  
  // Initialize demo session (optional enhancement)
  initializeDemoSession();
  
  // Initialize simple router
  initializeRouter();
  
  console.log('âœ… Application initialized successfully');
}

/**
 * Theme Management
 * Handle light/dark theme toggle with localStorage persistence
 */
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('iqra-theme') || 'light';
  
  // Set initial theme
  AppState.theme = savedTheme;
  applyTheme(savedTheme);
  
  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      console.log('Theme toggle clicked');
      toggleTheme();
    });
    console.log('âœ… Theme toggle initialized');
  } else {
    console.error('âŒ Theme toggle button not found');
  }
}

function toggleTheme() {
  const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
  AppState.theme = newTheme;
  applyTheme(newTheme);
  localStorage.setItem('iqra-theme', newTheme);
  
  console.log(`ðŸŽ¨ Theme switched to: ${newTheme}`);
}

function applyTheme(theme) {
  const root = document.documentElement;
  const themeIcon = document.querySelector('.theme-icon');
  
  root.setAttribute('data-color-scheme', theme);
  
  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '☀️' : '🌙'
    ;
  }
}

/**
 * Navigation Management
 * Handle responsive menu and smooth navigation
 */
function initializeNavigation() {
  // Initialize auth buttons
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => openModal('loginModal'));
    console.log('âœ… Login button initialized');
  }
  
  if (signupBtn) {
    signupBtn.addEventListener('click', () => openModal('signupModal'));
    console.log('âœ… Signup button initialized');
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    console.log('âœ… Mobile menu toggle initialized');
  }
  
  // Close mobile menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      closeMobileMenu();
      // Handle smooth scrolling
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        scrollToSection(target);
      }
    });
  });
  
  console.log(`âœ… Navigation initialized with ${navLinks.length} nav links`);
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navbarMenu && mobileMenuToggle && 
        !navbarMenu.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const navbarMenu = document.getElementById('navbarMenu');
  const toggle = document.getElementById('mobileMenuToggle');
  
  if (navbarMenu) navbarMenu.classList.toggle('active');
  if (toggle) toggle.classList.toggle('active');
}

function closeMobileMenu() {
  const navbarMenu = document.getElementById('navbarMenu');
  const toggle = document.getElementById('mobileMenuToggle');
  
  if (navbarMenu) navbarMenu.classList.remove('active');
  if (toggle) toggle.classList.remove('active');
}

function scrollToSection(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    // Update current section
    AppState.currentSection = targetId.substring(1);
    updateActiveNavLink();
    console.log(`ðŸ§­ Scrolled to section: ${targetId}`);
  } else {
    console.error(`Section not found: ${targetId}`);
  }
}

/**
 * Modal Management
 * Handle modal open/close functionality with accessibility
 */
function initializeModals() {
  // Close modals with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  // Set up modal close buttons
  const loginModalClose = document.getElementById('loginModalClose');
  const signupModalClose = document.getElementById('signupModalClose');
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');
  
  if (loginModalClose) {
    loginModalClose.addEventListener('click', () => closeModal('loginModal'));
  }
  
  if (signupModalClose) {
    signupModalClose.addEventListener('click', () => closeModal('signupModal'));
  }
  
  if (switchToSignup) {
    switchToSignup.addEventListener('click', () => switchModal('loginModal', 'signupModal'));
  }
  
  if (switchToLogin) {
    switchToLogin.addEventListener('click', () => switchModal('signupModal', 'loginModal'));
  }
  
  // Set up modal overlay click handlers
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', function() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
  });
  
  console.log(`âœ… Modals initialized: ${modals.length} found`);
}

/**
 * Enrollment Buttons Management
 */
function initializeEnrollmentButtons() {
  const enrollBtns = document.querySelectorAll('.enroll-btn');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal('signupModal'));
  });
  console.log(`âœ… Enrollment buttons initialized: ${enrollBtns.length} found`);
}

/**
 * Form Management
 * Handle form validation and submission
 */
function initializeForms() {
  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
    console.log('âœ… Login form initialized');
  }
  
  // Signup form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
    console.log('âœ… Signup form initialized');
  }
  
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
    console.log('âœ… Contact form initialized');
  }
  
  // Real-time validation
  initializeRealTimeValidation();
}

function initializeRealTimeValidation() {
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearValidationError);
  });
  console.log(`âœ… Real-time validation initialized for ${inputs.length} inputs`);
}

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  const name = input.name;
  
  clearValidationError({ target: input });
  
  // Required field validation first
  if (input.required && !value) {
    const label = input.previousElementSibling ? input.previousElementSibling.textContent : 'Field';
    showValidationError(input, `${label} is required`);
    return false;
  }
  
  // Skip further validation if field is empty and not required
  if (!value) return true;
  
  // Email validation
  if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showValidationError(input, 'Please enter a valid email address');
      return false;
    }
  }
  
  // Password validation
  if (input.type === 'password' && name === 'password') {
    if (value.length < 6) {
      showValidationError(input, 'Password must be at least 6 characters long');
      return false;
    }
  }
  
  // Confirm password validation
  if (name === 'confirmPassword') {
    const passwordInput = input.form.querySelector('input[name="password"]');
    if (passwordInput && value !== passwordInput.value) {
      showValidationError(input, 'Passwords do not match');
      return false;
    }
  }
  
  // Phone validation
  if (input.type === 'tel') {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      showValidationError(input, 'Please enter a valid Indian phone number (10 digits, starting with 6-9)');
      return false;
    }
  }
  
  return true;
}

function validateForm(form) {
  const inputs = form.querySelectorAll('.form-control[required], .form-control[type="email"], .form-control[type="tel"], .form-control[name="password"], .form-control[name="confirmPassword"]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  return isValid;
}

function showValidationError(input, message) {
  const errorElement = document.getElementById(`${input.id}Error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
  input.classList.add('error');
}

function clearValidationError(e) {
  const input = e.target;
  const errorElement = document.getElementById(`${input.id}Error`);
  if (errorElement) {
    errorElement.classList.remove('show');
  }
  input.classList.remove('error');
}

/**
 * Authentication Handlers
 * Stub functions for API integration
 */
async function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  
  // Validate form
  if (!validateForm(form)) {
    console.log('âŒ Login form validation failed');
    return;
  }
  
  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData);
  
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Logging in...';
  submitButton.disabled = true;
  
  try {
    // Simulate API call
    await simulateApiCall(1000);
    
    // TODO: Replace with actual API call
    const loginResult = await authenticateUser(loginData);
    
    if (loginResult.success) {
      AppState.user = loginResult.user;
      showSuccessMessage(form, 'Login successful! Welcome back.');
      setTimeout(() => {
        closeModal('loginModal');
        form.reset();
        updateUIForLoggedInUser();
      }, 1500);
    } else {
      showFormError(form, loginResult.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    showFormError(form, 'Network error. Please check your connection and try again.');
    console.error('Login error:', error);
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const form = e.target;
  
  // Validate form
  if (!validateForm(form)) {
    console.log('âŒ Signup form validation failed');
    return;
  }
  
  const formData = new FormData(form);
  const signupData = Object.fromEntries(formData);
  
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Creating account...';
  submitButton.disabled = true;
  
  try {
    // Simulate API call
    await simulateApiCall(1500);
    
    // TODO: Replace with actual API call
    const signupResult = await registerUser(signupData);
    
    if (signupResult.success) {
      AppState.user = signupResult.user;
      showSuccessMessage(form, 'Account created successfully! Welcome to IQRA Coaching.');
      setTimeout(() => {
        closeModal('signupModal');
        form.reset();
        updateUIForLoggedInUser();
      }, 2000);
    } else {
      showFormError(form, signupResult.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    showFormError(form, 'Network error. Please check your connection and try again.');
    console.error('Signup error:', error);
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

async function handleContactForm(e) {
  e.preventDefault();
  const form = e.target;
  
  // Validate form
  if (!validateForm(form)) {
    console.log('âŒ Contact form validation failed');
    return;
  }
  
  const formData = new FormData(form);
  const contactData = Object.fromEntries(formData);
  
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  try {
    // Simulate API call
    await simulateApiCall(1000);
    
    // TODO: Replace with actual API call
    const result = await submitContactForm(contactData);
    
    if (result.success) {
      showSuccessMessage(form, 'Message sent successfully! We\'ll get back to you soon.');
      setTimeout(() => {
        form.reset();
        // Clear any remaining error states
        form.querySelectorAll('.form-control').forEach(input => {
          clearValidationError({ target: input });
        });
      }, 2000);
    } else {
      showFormError(form, 'Failed to send message. Please try again.');
    }
  } catch (error) {
    showFormError(form, 'Network error. Please check your connection and try again.');
    console.error('Contact form error:', error);
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

/**
 * Stub Authentication Functions
 * Replace these with actual API calls
 */
async function authenticateUser(loginData) {
  // TODO: Replace with actual authentication API
  // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(loginData) });
  
  console.log('ðŸ” Attempting login with:', { email: loginData.email });
  
  // Simulate validation
  if (loginData.email && loginData.password) {
    return {
      success: true,
      user: {
        id: '12345',
        name: 'Demo User',
        email: loginData.email,
        class: 'class-10'
      },
      token: 'demo-jwt-token'
    };
  }
  
  return {
    success: false,
    message: 'Invalid credentials'
  };
}

async function registerUser(signupData) {
  // TODO: Replace with actual registration API
  console.log('ðŸ“ Attempting signup with:', { 
    email: signupData.email, 
    name: signupData.name,
    class: signupData.class 
  });
  
  // Simulate validation
  if (signupData.email && signupData.password && signupData.name) {
    return {
      success: true,
      user: {
        id: '67890',
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        class: signupData.class
      },
      token: 'demo-jwt-token'
    };
  }
  
  return {
    success: false,
    message: 'Registration failed'
  };
}

async function submitContactForm(contactData) {
  // TODO: Replace with actual contact form API
  console.log('ðŸ“§ Submitting contact form:', contactData);
  
  return {
    success: true,
    message: 'Contact form submitted successfully'
  };
}

/**
 * UI Helper Functions
 */
function showSuccessMessage(form, message) {
  // Remove any existing messages
  const existingMessages = form.querySelectorAll('.form-success, .form-error');
  existingMessages.forEach(msg => msg.remove());
  
  // Create success message
  const successElement = document.createElement('div');
  successElement.className = 'form-success';
  successElement.textContent = message;
  
  // Insert at the beginning of the form
  form.insertBefore(successElement, form.firstChild);
}

function showFormError(form, message) {
  // Remove any existing messages
  const existingMessages = form.querySelectorAll('.form-success, .form-error');
  existingMessages.forEach(msg => msg.remove());
  
  // Create error message
  const errorElement = document.createElement('div');
  errorElement.className = 'form-error show';
  errorElement.style.display = 'block';
  errorElement.style.textAlign = 'center';
  errorElement.style.marginBottom = '16px';
  errorElement.textContent = message;
  
  // Insert at the beginning of the form
  form.insertBefore(errorElement, form.firstChild);
}

function updateUIForLoggedInUser() {
  // Update navigation buttons
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  
  if (loginBtn && signupBtn && AppState.user) {
    loginBtn.style.display = 'none';
    signupBtn.textContent = `Welcome, ${AppState.user.name.split(' ')[0]}`;
    signupBtn.onclick = null;
    signupBtn.classList.add('user-greeting');
  }
}

/**
 * Smooth Scrolling Implementation
 */
function initializeSmoothScrolling() {
  // Handle all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's an empty hash
      if (targetId === '#') return;
      
      e.preventDefault();
      scrollToSection(targetId);
    });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  console.log('âœ… Smooth scrolling initialized');
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/**
 * Demo Session Management (Optional Enhancement)
 */
function initializeDemoSession() {
  // Create a demo session for first-time users
  let demoSession;
  try {
    demoSession = localStorage.getItem('iqra-demo-session');
  } catch (e) {
    console.log('localStorage not available');
    return;
  }
  
  if (!demoSession) {
    AppState.demoSession = {
      visitCount: 1,
      firstVisit: new Date().toISOString(),
      sections: ['home'],
      interests: []
    };
  } else {
    try {
      AppState.demoSession = JSON.parse(demoSession);
      AppState.demoSession.visitCount++;
    } catch (e) {
      console.error('Error parsing demo session data');
      AppState.demoSession = {
        visitCount: 1,
        firstVisit: new Date().toISOString(),
        sections: ['home'],
        interests: []
      };
    }
  }
  
  // Save updated session
  try {
    localStorage.setItem('iqra-demo-session', JSON.stringify(AppState.demoSession));
  } catch (e) {
    console.log('Cannot save demo session data');
  }
  
  console.log('ðŸ“Š Demo session:', AppState.demoSession);
}

/**
 * Simple Client-Side Router (Optional Enhancement)
 */
function initializeRouter() {
  // Handle browser back/forward
  window.addEventListener('popstate', handleRouteChange);
  
  // Handle initial route
  handleRouteChange();
}

function handleRouteChange() {
  const hash = window.location.hash.substring(1) || 'home';
  AppState.currentSection = hash;
  
  // Update demo session
  if (AppState.demoSession && !AppState.demoSession.sections.includes(hash)) {
    AppState.demoSession.sections.push(hash);
    try {
      localStorage.setItem('iqra-demo-session', JSON.stringify(AppState.demoSession));
    } catch (e) {
      console.log('Cannot update demo session data');
    }
  }
  
  console.log(`ðŸ§­ Navigated to section: ${hash}`);
}

/**
 * Course Data Loader (Optional Enhancement)
 */
async function loadCourseData() {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await fetch('/api/courses');
    // const courses = await response.json();
    
    // For now, return static data
    return courseData;
  } catch (error) {
    console.error('Error loading course data:', error);
    return courseData; // Fallback to static data
  }
}

/**
 * Utility Functions
 */
function simulateApiCall(delay = 1000) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
  // TODO: Send error reports to monitoring service
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  // TODO: Send error reports to monitoring service
});

/**
 * Performance Monitoring
 */
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log(`âš¡ Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
      }
    }, 0);
  });
}

console.log('ðŸ“œ IQRA Coaching JavaScript loaded successfully');

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AppState,
    courseData,
    validateEmail,
    validatePhoneNumber,
    formatCurrency
  };
}