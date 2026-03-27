function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Form Validation Logic
const form = document.getElementById('contactForm');
const feedback = form.querySelector('.form-feedback');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;
  form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

  const requiredFields = [
    { id: 'name', name: 'Full Name' },
    { id: 'email', name: 'Email Address' },
    { id: 'message', name: 'Your Requirements' }
  ];

  requiredFields.forEach(field => {
    const input = form[field.id];
    if (!input.value.trim()) {
      showError(input, `${field.name} is required`);
      isValid = false;
    }
  });

  const email = form['email'];
  if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  if (isValid) {
    feedback.textContent = 'Thank you for your request. We will contact you within 24 hours.';
    feedback.style.color = '#27ae60';
    form.reset();
    setTimeout(() => feedback.textContent = '', 5000);
  }
});

function showError(input, message) {
  const errorElement = input.parentElement.querySelector('.error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  input.style.borderColor = '#e74c3c';

  input.addEventListener('input', () => {
    input.style.borderColor = '';
    errorElement.style.display = 'none';
  }, { once: true });
}

// Navbar Active Link Highlight
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  document.querySelectorAll('section[id]').forEach(sec => {
    const offsetTop = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollY >= offsetTop && scrollY < offsetTop + height) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
});

// Subname Delayed Blur Reveal
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.subname').classList.add('visible');
  }, 1000); // 1-second delay
});

// Section Scroll Reveal with IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target); // Animate once
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.section').forEach(sec => {
  observer.observe(sec);
});

// Special Specialization Section
// Always scroll to Home on refresh
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Smooth scrolling for navbar links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});
