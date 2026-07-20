/* custom cursor */
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .work-card, .tool-grid li, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
}

/* reveal glass panels on scroll */
const glassPanels = document.querySelectorAll('.glass');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
glassPanels.forEach(p => revealObserver.observe(p));

/* dot-nav active state while scrolling */
const sections = document.querySelectorAll('main .section, .hero-section');
const dots = document.querySelectorAll('.dotnav .dot');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#' + id));
        }
    });
}, { threshold: 0.5 });
sections.forEach(s => sectionObserver.observe(s));

/* contact form */
const form = document.getElementById('contactForm');
const msg = document.getElementById('form-msg');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const fname = form.fname.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        msg.className = '';

        if (!fname || !email || !message) {
            msg.textContent = 'Please fill in the required fields.';
            msg.className = 'error';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            msg.textContent = 'Please enter a valid email address.';
            msg.className = 'error';
            return;
        }

        const btn = form.querySelector('button[type=submit]');
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(() => {
            msg.textContent = "✓ Message sent! I'll get back to you soon.";
            msg.className = 'success';
            form.reset();
            btn.textContent = 'Send Message →';
            btn.disabled = false;
        }, 1200);
    });
}