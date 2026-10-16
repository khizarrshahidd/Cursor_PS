(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const email = config.email || 'khizarrshahidd@gmail.com';
  const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
  const bookingUrl = safeUrl(config.bookingUrl);
  const emailLink = (subject, body) => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('.email-link').forEach(link => { link.href = `mailto:${email}`; if (link.classList.contains('contact-email')) link.textContent = email; });
  const number = (config.whatsappNumber || '').replace(/[\s+()-]/g, '');
  if (/^\d{8,15}$/.test(number)) {
    const link = document.querySelector('#whatsapp-link');
    link.href = `https://wa.me/${number}?text=${encodeURIComponent('Hi Khizar, I would like to discuss a video editing project.')}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer'; link.hidden = false;
  }
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.classList.toggle('is-open', open); });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) closeMenu(); });
  matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
  const more = document.querySelector('#more-work');
  more.addEventListener('click', () => { const expanded = more.getAttribute('aria-expanded') !== 'true'; document.querySelectorAll('.extra-work').forEach(card => card.hidden = !expanded); more.setAttribute('aria-expanded', String(expanded)); more.innerHTML = expanded ? 'Show less <span>−</span>' : 'More selected work <span>+</span>'; });
  const videoDialog = document.querySelector('#video-dialog');
  const player = document.querySelector('#portfolio-player');
  const errorMessage = document.querySelector('#video-error');
  let videoTrigger;
  document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
    videoTrigger = button;
    const id = Number(button.dataset.video);
    if (!Number.isInteger(id) || id < 1 || id > 6) return;
    document.querySelector('#video-title').textContent = `Selected edit ${String(id).padStart(2, '0')}`;
    errorMessage.hidden = true;
    player.poster = `assets/work-${id}.jpg`;
    player.src = `videos/work-${id}.mp4`;
    videoDialog.showModal(); document.body.classList.add('modal-open');
    player.play().catch(() => { /* Native controls remain available when autoplay is blocked. */ });
  }));
  player.addEventListener('error', () => { if (player.getAttribute('src')) errorMessage.hidden = false; });
  document.querySelector('.close-video').addEventListener('click', () => videoDialog.close());
  videoDialog.addEventListener('close', () => { player.pause(); player.removeAttribute('src'); player.load(); document.body.classList.remove('modal-open'); videoTrigger?.focus({preventScroll:true}); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) player.pause(); });
  const bookingDialog = document.querySelector('#booking-dialog');
  let bookingTrigger;
  const inquire = (button, plan) => {
    if (bookingUrl) { window.location.assign(bookingUrl); return; }
    bookingTrigger = button;
    const isPlan = Boolean(plan);
    document.querySelector('#booking-description').textContent = isPlan ? `Interested in ${plan}? Send me your goals, a style reference, and a couple of times that suit you. We'll discuss the scope by email and arrange a call.` : "Send your project details and a couple of times that suit you. We'll arrange a call by email.";
    document.querySelector('#booking-email').href = emailLink(isPlan ? `${plan} inquiry` : 'Let’s arrange a call', `Hi Khizar,\n\n${isPlan ? `I'm interested in ${plan}.` : "I'd like to arrange a call about my editing project."}\n\nProject details:\n\nPreferred times and time zone:\n\nThanks!`);
    bookingDialog.showModal(); document.body.classList.add('modal-open');
  };
  document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => inquire(button)));
  document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => inquire(button, button.dataset.plan)));
  document.querySelector('.close-booking').addEventListener('click', () => bookingDialog.close());
  bookingDialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); bookingTrigger?.focus({preventScroll:true}); });
  [videoDialog, bookingDialog].forEach(dialog => dialog.addEventListener('click', e => { if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); }));
})();
