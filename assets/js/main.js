$(function(){
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* ===== Header: mobile menu ===== */
      const $body = $('body');
      const $header = $('.site-header');
      const $hamburger = $('.hamburger');
      const $navLinks = $('#primaryNav a');

      function toggleMenu(open){
        const isOpen = (open !== undefined) ? open : !$body.hasClass('menu-open');
        $body.toggleClass('menu-open', isOpen);
        $hamburger.attr('aria-expanded', isOpen ? 'true' : 'false');
      }
      $hamburger.on('click', function(){ toggleMenu(); });
      $(document).on('keydown', function(e){ if(e.key === 'Escape'){ toggleMenu(false); } });
      $navLinks.on('click', function(){ toggleMenu(false); });
      $(document).on('click', function(e){
        if($body.hasClass('menu-open') && !$(e.target).closest('.site-header').length){ toggleMenu(false); }
      });

      /* ===== Theme toggle ===== */
      const root = document.documentElement;
      function applyTheme(t, persist){
        root.setAttribute('data-theme', t);
        $('meta[name="theme-color"]').attr('content', t === 'light' ? '#f6f8fb' : '#0a0d14');
        if(persist){ try{ localStorage.setItem('theme', t); }catch(e){} }
      }
      applyTheme(root.getAttribute('data-theme') || 'dark', false);
      $('#themeToggle').on('click', function(){
        applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
      });

      /* ===== Scroll: progress bar + header border ===== */
      const progress = document.getElementById('scrollProgress');
      let ticking = false;
      function onScroll(){
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        progress.style.transform = `scaleX(${ratio})`;
        $header.toggleClass('scrolled', window.scrollY > 8);
        ticking = false;
      }
      window.addEventListener('scroll', function(){
        if(!ticking){ ticking = true; requestAnimationFrame(onScroll); }
      }, { passive: true });
      onScroll();

      // Year
      $('#year').text(new Date().getFullYear());

      /* ===== Icons used by rendered cards ===== */
      const ICONS = {
        server:   '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
        layout:   '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
        database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
        layers:   '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5"/>',
        spark:    '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/>',
        rocket:   '<path d="M5 15c-1.5 1.2-2 5-2 5s3.8-.5 5-2M9 15l-1-1a14 14 0 0 1 9-10l3-1-1 3a14 14 0 0 1-10 9zM9 15v4l3-2M9 15H5l2-3"/><circle cx="15" cy="9" r="1.5"/>'
      };
      const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
      const chips = (items) => (items||[]).map(t=>`<li class="chip">${t}</li>`).join('');

      /* ===== Skills ===== */
      const $skillGrid = $('#skillGrid');
      SKILLS.forEach((s, i)=>{
        $skillGrid.append(`
          <article class="card reveal" style="--d:${(i % 3) * 80}ms">
            <div class="skill-head">
              <span class="pillar-icon">${icon(s.icon)}</span>
              <h3>${s.title}</h3>
            </div>
            <ul class="chips">${chips(s.items)}</ul>
          </article>`);
      });

      /* ===== Projects render + search/filter ===== */
      const TYPE_LABELS = { ai: 'AI / GenAI', backend: 'Backend', fullstack: 'Full-stack' };
      const $grid = $('#projectGrid');
      let activeFilter = 'all';
      $('#statProjects').text(PROJECTS.length);

      function renderProjects(items){
          $grid.empty();
          if(!items.length){
            $grid.append(`<div class="empty">No matching projects. Try clearing the search or filter.</div>`);
            return;
          }
          items.forEach((p, i) => {
            $grid.append(`
              <article class="card project" style="animation-delay:${Math.min(i, 6) * 50}ms">
                <div class="project-top">
                  <span class="tag tag-${p.type}">${TYPE_LABELS[p.type] || p.type}</span>
                  <span class="project-role">${p.role || ''}</span>
                </div>
                <h3>${p.title}</h3>
                <p>${p.blurb}</p>
                <ul class="chips">${chips(p.tech)}</ul>
              </article>`);
          });
      }
      function applyFilters(){
          const q = ($('#search').val() || '').toLowerCase().trim();
          const filtered = PROJECTS.filter(p => {
            const matchesType = (activeFilter === 'all') || p.type === activeFilter;
            const text = [p.title, p.blurb, p.role, TYPE_LABELS[p.type], (p.tech||[]).join(' ')].join(' ').toLowerCase();
            return matchesType && (!q || text.includes(q));
          });
          renderProjects(filtered);
      }
      $('#search').on('input', applyFilters);
      $('#filters').on('click', '.pill', function(){
          activeFilter = $(this).data('filter');
          $('#filters .pill').removeClass('is-active').attr('aria-pressed', 'false');
          $(this).addClass('is-active').attr('aria-pressed', 'true');
          applyFilters();
      });
      renderProjects(PROJECTS);

      /* ===== Experience timeline ===== */
      const $timeline = $('#timeline');
      EXPERIENCE.forEach((e)=>{
          const lis = e.bullets.map(b=>`<li>${b}</li>`).join('');
          $timeline.append(`
            <div class="t-item reveal${e.current ? ' current' : ''}">
              <article class="card t-card">
                <div class="t-meta">
                  <span class="t-period">${e.period}</span>
                  ${e.current ? '<span class="tag">Current</span>' : ''}
                </div>
                <div>
                  <h3>${e.role}</h3>
                  <div class="t-org">${e.org}</div>
                  <ul class="t-list">${lis}</ul>
                </div>
              </article>
            </div>
          `);
      });

      /* ===== Education & certifications ===== */
      const $eduList = $('#educationList');
      EDUCATION.forEach((ed)=>{
          $eduList.append(`
            <article class="card edu-card reveal">
              <span class="eyebrow">Degree</span>
              <h3>${ed.degree}</h3>
              <p class="school">${ed.school}</p>
              ${ed.detail ? `<span class="tag">${ed.detail}</span>` : ''}
            </article>
          `);
      });
      const $certList = $('#certList');
      CERTIFICATIONS.forEach((c, i)=>{
          $certList.append(`
            <li class="card cert reveal" style="--d:${i * 60}ms">
              <div>
                <h3>${c.title}</h3>
                <span class="issuer">${c.issuer}</span>
              </div>
              ${c.link ? `<a href="${c.link}" target="_blank" rel="noopener" aria-label="View certificate: ${c.title}">View ↗</a>` : ''}
            </li>
          `);
      });

      /* ===== Contact — mailto, copy email, form ===== */
      $('#mailtoLink').attr('href', `mailto:${NEAMUL_EMAIL}?subject=${encodeURIComponent('Hello Neamul')}`).text(NEAMUL_EMAIL);
      $('#copyEmail').on('click', async function(){
          const $btn = $(this); const txt = $btn.text();
          try{
            await navigator.clipboard.writeText(NEAMUL_EMAIL);
            $btn.text('Copied!');
          }catch(e){ $btn.text('Press Ctrl+C'); }
          setTimeout(()=>{ $btn.text(txt); }, 1500);
      });
      $('#contactForm').on('submit', async function (e) {
          e.preventDefault();

          // Simple client-side honeypot check
          const honey = $('input[name="company"]').val();
          if (honey) return;

          const $status = $('#formStatus');
          const $send = $('#sendBtn');
          const setStatus = (msg, isError) => $status.text(msg).toggleClass('error', !!isError);
          const payload = {
            name:    $('#name').val().trim(),
            email:   $('#email').val().trim(),
            message: $('#message').val().trim()
          };

          if (!payload.name || !payload.email || !payload.message) {
            setStatus('Please complete all fields.', true);
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
            setStatus('Please enter a valid email address.', true);
            return;
          }

          $send.prop('disabled', true);
          setStatus('Sending…');
          try {
            const r = await fetch($('#contactForm').attr('action'), {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (r.ok) {
              setStatus('Thanks! Your message was sent.');
              $('#contactForm')[0].reset();
            } else {
              const data = await r.json().catch(() => ({}));
              setStatus(data.error || 'Sorry, something went wrong sending your message.', true);
            }
          } catch (err) {
            setStatus('Network error. Please try again.', true);
          } finally {
            $send.prop('disabled', false);
          }
      });

      // CV links
      $('#downloadCV').attr({ href: CV_PATH, download: CV_DOWNLOAD_NAME });

      // Back to top
      $('#backToTop, a[href="#top"]').on('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });

      /* ===== Card spotlight follows the pointer ===== */
      $(document).on('pointermove', '.card', function(e){
        const r = this.getBoundingClientRect();
        this.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        this.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });

      /* ===== Reveal on scroll ===== */
      const reveals = document.querySelectorAll('.reveal');
      if('IntersectionObserver' in window && !reduceMotion){
        const io = new IntersectionObserver((entries)=>{
          entries.forEach(en=>{
            if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el=>io.observe(el));
      } else {
        reveals.forEach(el=>el.classList.add('in'));
      }

      /* ===== Scroll spy: highlight the current section in the nav ===== */
      if('IntersectionObserver' in window){
        const spy = new IntersectionObserver((entries)=>{
          entries.forEach(en=>{
            if(en.isIntersecting){
              $navLinks.removeClass('active');
              $navLinks.filter(`[href="#${en.target.id}"]`).addClass('active');
            }
          });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach(s=>spy.observe(s));
      }
    });
