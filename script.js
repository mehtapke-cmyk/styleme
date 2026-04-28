function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.nav-menu');
    if (menu) {
      menu.classList.remove('active');
    }
  });
});

function toggleFaq(el) {
  if (el) {
    el.classList.toggle('open');
  }
}

function submitEmail() {
  const input = document.getElementById('emailInput');
  const toast = document.getElementById('toast');

  if (!input) return;

  const email = input.value.trim();

  if (!email || !email.includes('@') || !email.includes('.')) {
    input.style.borderColor = '#B97A56';
    input.value = '';
    input.placeholder = 'Entre une adresse email valide';

    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'Ton adresse email';
    }, 2000);

    return;
  }

  if (toast) {
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  input.value = '';
  input.placeholder = 'Merci ! 💕';
}

const emailInput = document.getElementById('emailInput');
if (emailInput) {
  emailInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      submitEmail();
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('section:not(.hero)').forEach((sec, index) => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
  observer.observe(sec);
});
