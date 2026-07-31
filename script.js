const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Custom cursor — only for mice/trackpads, and only if the user
// hasn't asked for reduced motion.
const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersFinePointer && !prefersReducedMotion) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.body.classList.add('custom-cursor-active');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  };
  animateRing();

  const hoverTargets = document.querySelectorAll(
    'a, button, .tab, .project-card, .contact-card, .skill-card, .edu-item'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });
}

const menuToggle = document.getElementById('menuToggle');
const tabs = document.getElementById('tabs');

menuToggle.addEventListener('click', () => {
  const isOpen = tabs.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after a tab is chosen
tabs.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight active tab based on section in view
const sections = document.querySelectorAll('main section[id]');
const tabLinks = document.querySelectorAll('.tab');

const highlightNav = () => {
  let currentId = sections[0].id;
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  tabLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();


const revealTargets = document.querySelectorAll(
  '.edu-item, .skill-card, .project-card, .contact-card'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));