const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');

function closeMenu() {
  if (!toggle || !nav) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation menu');
}

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}

document.getElementById('year').textContent = new Date().getFullYear();
