// ============================
// TOAST NOTIFICATION
// ============================
function showToast(msg, type = 'info', duration = 3500) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.innerHTML = '<span class="toast-icon"></span><span class="toast-msg"></span>';
    document.body.appendChild(toast);
  }
  const iconMap = { success: '✓', info: 'ℹ', warn: '⚠' };
  toast.querySelector('.toast-icon').textContent = iconMap[type] || 'ℹ';
  toast.querySelector('.toast-msg').textContent = msg;
  toast.className = `toast toast-${type}`;
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================
// DOWNLOAD CV
// ============================
document.getElementById('btn-resume').addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = '/Users/eyamin.h/Personal/EYAMIN Protfolio/cv.pdf';
  a.download = 'Eyamin_Hossan_CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('CV download started!', 'success');
});

// ============================
// CONTACT FORM → mailto
// ============================
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'warn');
      return;
    }
    const mailSubject = encodeURIComponent(subject || `Portfolio contact from ${name}`);
    const mailBody    = encodeURIComponent(
      `Hi Eyamin,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest,\n${name}`
    );
    // Replace with your actual email
    window.location.href = `mailto:aronnoeyamin123@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    const btn = document.getElementById('btn-send');
    btn.innerHTML = '<i class="fa fa-check"></i> Opening email client…';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fa fa-paper-plane"></i>';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ============================
// TYPEWRITER EFFECT
// ============================
const phrases = [
  'web experiences',
  'full-stack apps',
  'clean UIs',
  'APIs that scale',
  'things that matter',
];
let pIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  if (!tw) return;
  const phrase = phrases[pIdx];
  if (!deleting) {
    cIdx++;
    tw.textContent = phrase.slice(0, cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    cIdx--;
    tw.textContent = phrase.slice(0, cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 90);
}
setTimeout(type, 800);

// ============================
// NAVBAR: scroll state + active link
// ============================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 30
    ? 'rgba(139,92,246,0.2)'
    : 'rgba(255,255,255,0.08)';

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const open = navLinksEl.classList.contains('open');
  const bars = hamburger.querySelectorAll('span');
  if (open) {
    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity   = '';
    bars[2].style.transform = '';
  }
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ============================
// SCROLL REVEAL
// ============================
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'),
        Number(entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 90;
  observer.observe(el);
});
