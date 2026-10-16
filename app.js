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
  if (!bookingUrl) document.querySelectorAll('[data-book]').forEach(button => {
    const label = button.querySelector('span');
    if (label) label.textContent = 'Request a call';
  });
  const marquee = document.querySelector('#clients-marquee');
  const track = document.querySelector('#clients-track');
  const motionToggle = document.querySelector('#marquee-toggle');
  const handles = Array.isArray(config.clients) ? [...new Set(config.clients.map(value => String(value).trim().replace(/^@/, '')).filter(value => /^[a-zA-Z0-9._]{1,30}$/.test(value)))] : [];
  const placeholder = handles.length === 0;
  document.querySelector('#clients-placeholder-note').hidden = !placeholder;
  const profiles = placeholder ? ['lorem.ipsum', 'dolor.sit', 'amet.elit', 'ipsum.dolor', 'sit.amet', 'lorem.elit'] : handles;
  const profileCard = handle => {
    const item = document.createElement('li'); item.className = 'client-card';
    const inner = placeholder ? item : document.createElement('a');
    if (!placeholder) { inner.href = `https://www.instagram.com/${handle}/`; inner.target = '_blank'; inner.rel = 'noopener noreferrer'; inner.setAttribute('aria-label', `@${handle} on Instagram (opens in a new tab)`); item.append(inner); }
    const avatar = document.createElement('span'); avatar.className = 'client-avatar'; avatar.setAttribute('aria-hidden', 'true');
    avatar.innerHTML = '<svg viewBox="0 0 32 32"><circle cx="16" cy="11" r="5"/><path d="M6 27c0-6 4-9 10-9s10 3 10 9"/></svg>';
    const label = document.createElement('span'); label.className = 'client-handle'; label.textContent = `@${handle}`;
    inner.append(avatar, label); return item;
  };
  const group = document.createElement('ul'); group.className = 'client-group'; group.setAttribute('aria-label', placeholder ? 'Placeholder Instagram profiles' : 'Client Instagram profiles');
  profiles.forEach(handle => group.append(profileCard(handle))); track.append(group);
  let resizeFrame;
  const sizeMarquee = () => {
    group.querySelectorAll('[data-fill]').forEach(item => item.remove());
    track.querySelectorAll('.client-group[aria-hidden]').forEach(item => item.remove());
    let index = 0;
    while (group.getBoundingClientRect().width < marquee.clientWidth + 180 && index < 40) {
      const item = profileCard(profiles[index++ % profiles.length]); item.dataset.fill = 'true'; item.setAttribute('aria-hidden', 'true'); item.inert = true; group.append(item);
    }
    const duplicate = group.cloneNode(true); duplicate.setAttribute('aria-hidden', 'true'); duplicate.removeAttribute('aria-label'); duplicate.inert = true; track.append(duplicate);
    track.style.setProperty('--marquee-duration', `${Math.max(30, group.getBoundingClientRect().width / 28) * 2}s`);
  };
  sizeMarquee();
  window.addEventListener('resize', () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(sizeMarquee); });
  motionToggle.addEventListener('click', () => {
    const paused = !marquee.classList.contains('is-paused'); marquee.classList.toggle('is-paused', paused);
    motionToggle.setAttribute('aria-pressed', String(paused)); motionToggle.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  });
  document.addEventListener('visibilitychange', () => marquee.classList.toggle('is-inactive', document.hidden));
  const page = document.querySelector('main');
  let gradientFrame;
  const updatePageGradient = () => {
    const y = element => element.getBoundingClientRect().top + window.scrollY;
    const about = document.querySelector('#about');
    const services = document.querySelector('#services');
    const pricing = document.querySelector('#pricing');
    const peak = y(about) + about.offsetHeight * 0.4;
    document.body.style.setProperty('--ramp-start', `${y(services) * 0.52}px`);
    document.body.style.setProperty('--ramp-mid', `${y(services)}px`);
    document.body.style.setProperty('--ramp-pricing', `${y(pricing)}px`);
    document.body.style.setProperty('--ramp-peak', `${peak}px`);
    document.body.style.setProperty('--ramp-end', `${y(about) + about.offsetHeight + 300}px`);
  };
  const scheduleGradient = () => { cancelAnimationFrame(gradientFrame); gradientFrame = requestAnimationFrame(updatePageGradient); };
  new ResizeObserver(scheduleGradient).observe(page);
  document.fonts.ready.then(scheduleGradient);
  window.addEventListener('resize', scheduleGradient);
  updatePageGradient();
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.classList.toggle('is-open', open); });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) closeMenu(); });
  matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
  const more = document.querySelector('#more-work');
  more.addEventListener('click', () => { const expanded = more.getAttribute('aria-expanded') !== 'true'; document.querySelectorAll('.extra-work').forEach(card => card.hidden = !expanded); more.setAttribute('aria-expanded', String(expanded)); more.innerHTML = expanded ? 'Show less <span>−</span>' : 'More edits <span>+</span>'; });
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
