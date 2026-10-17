document.documentElement.classList.add('js');

// Keep navigation state and its accessible label in sync.
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const mobileNav = window.matchMedia('(max-width: 820px)');
function setMenu(open, restoreFocus = false) {
  menu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuBtn.textContent = open ? 'Close' : 'Menu';
  if (restoreFocus) menuBtn.focus();
}
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false, true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) setMenu(false);
});
mobileNav.addEventListener('change', () => {
  const focusWasInMenu = menu.contains(document.activeElement);
  setMenu(false, mobileNav.matches && focusWasInMenu);
});

// Highlight the nav link for the section you're reading
const links = [...menu.querySelectorAll('a[href^="#"]:not(.btn)')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => {
        const active = a.getAttribute('href') === '#' + entry.target.id;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && spy.observe(s));

// Prepare an email until a delivery service is configured.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  window.location.href = `${form.action}?subject=${subject}&body=${body}`;
  status.textContent = 'Continue in your email app to send your message. If it did not open, email hello@sunshinepresquito.design.';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
