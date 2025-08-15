$(function(){
      /* ===== Header: mobile menu ===== */
      const $body = $('body');
      const $hamburger = $('.hamburger');
      const $mobileMenu = $('#mobile-menu');
      const $allHeaderLinks = $('header .nav-links a, header .nav-links .btn');

      function toggleMenu(open){
        const isOpen = (open !== undefined) ? open : !$body.hasClass('menu-open');
        $body.toggleClass('menu-open', isOpen);
        $body.toggleClass('lock', isOpen);
        $hamburger.attr('aria-expanded', isOpen ? 'true' : 'false');
        if(isOpen){ $mobileMenu.find('a, .btn').first().trigger('focus'); }
      }
      $hamburger.on('click', function(){ toggleMenu(); });
      $(document).on('keydown', function(e){ if(e.key === 'Escape'){ toggleMenu(false); } });
      // Close menu when clicking a link (and handle in-page anchors)
      $allHeaderLinks.on('click', function(){
        const href = $(this).attr('href') || '';
        if(href.startsWith('#')){ toggleMenu(false); }
      });

      // ===== Theme toggle (existing)
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      const savedTheme = localStorage.getItem('theme');
      function applyTheme(t){
          if(t==='light'){ document.documentElement.style.setProperty('--bg','#fcfcfd'); $('header').addClass('light'); }
          else { document.documentElement.style.removeProperty('--bg'); $('header').removeClass('light'); }
          localStorage.setItem('theme', t);
      }
      applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));
      $('#themeToggle').on('click', function(){
          const t = (localStorage.getItem('theme')==='light') ? 'dark' : 'light';
          applyTheme(t);
      });

      // Year
      $('#year').text(new Date().getFullYear());

      // Projects render + search/filter
      const $grid = $('#projectGrid');
      function renderProjects(items){
          $grid.empty();
          if(!items.length){
            $grid.append(`<div class="muted">No matching projects. Try clearing filters.</div>`);
            return;
          }
          items.forEach(p => {
            const techBadges = (p.tech||[]).map(t=>`<span class="badge">${t}</span>`).join('');
            const card = `
              <article class="card" tabindex="0">
                <h3>${p.title}</h3>
                <p class="muted">${p.blurb}</p>
                <div class="badges">${techBadges}</div>
                <div style="margin-top:12px">
                  ${p.link ? `<a class="btn" href="${p.link}" aria-label="Open ${p.title}">Open ↗</a>` : ""}
                </div>
              </article>`;
            $grid.append(card);
          });
      }
      function applyFilters(){
          const q = $('#search').val()?.toLowerCase() ?? "";
          const f = $('#filter').val();
          const filtered = PROJECTS.filter(p => {
            const matchesType = (f==='all') || p.type.toLowerCase()===f;
            const text = (p.title + ' ' + p.blurb + ' ' + (p.tech||[]).join(' ')).toLowerCase();
            const matchesQuery = !q || text.includes(q);
            return matchesType && matchesQuery;
          });
          renderProjects(filtered);
      }
      $('#search').on('input', applyFilters);
      $('#filter').on('change', applyFilters);
      renderProjects(PROJECTS);

      // Timeline
      const $timeline = $('#timeline');
      EXPERIENCE.forEach((e)=>{
          const lis = e.bullets.map(b=>`<li>${b}</li>`).join('');
          $timeline.append(`
            <div class="t-item">
              <h3 style="margin:0 0 4px 0">${e.role} <span class="muted">— ${e.org}</span></h3>
              <div class="muted" style="margin-bottom:8px">${e.period}</div>
              <ul class="muted" style="margin:0 0 0 18px;line-height:1.9">${lis}</ul>
            </div>
          `);
      });

      // Render Education
      const $eduTimeline = $('#education .timeline');
      EDUCATION.forEach((ed)=>{
          const lis = ed.bullets.map(b=>`<li>${b}</li>`).join('');
          $eduTimeline.append(`
            <div class="t-item">
              <h3 style="margin:0 0 4px 0">${ed.degree} <span class="muted">— ${ed.school}</span></h3>
              <div class="muted" style="margin-bottom:8px">${ed.period}</div>
              <ul class="muted" style="margin:0 0 0 18px;line-height:1.9">${lis}</ul>
            </div>
          `);
      });

      // Contact — mailto and copy email
      const mailHref = `mailto:${NEAMUL_EMAIL}?subject=${encodeURIComponent('Hello Neamul')}`;
      $('#mailtoLink').attr('href', mailHref);
      $('#copyEmail').on('click', async function(){
          try{
            await navigator.clipboard.writeText(NEAMUL_EMAIL);
            const $btn=$(this); const txt=$btn.text();
            $btn.text('Copied!'); setTimeout(()=>{$btn.text(txt)}, 1500);
          }catch(e){ alert('Email: '+NEAMUL_EMAIL); }
      });
      $('#contactForm').on('submit', async function (e) {
          e.preventDefault();

          // Simple client-side honeypot check
          const honey = $('input[name="company"]').val();
          if (honey) return;

          const $status = $('#formStatus');
          const payload = {
            name:    $('#name').val().trim(),
            email:   $('#email').val().trim(),
            message: $('#message').val().trim()
          };

          if (!payload.name || !payload.email || !payload.message) {
            $status.text('Please complete all fields.');
            return;
          }

          try {
            const r = await fetch($('#contactForm').attr('action'), {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (r.ok) {
              $status.text('Thanks! Your message was sent.');
              $('#contactForm')[0].reset();
            } else {
              const data = await r.json().catch(() => ({}));
              $status.text(data.error || 'Sorry, something went wrong sending your message.');
            }
          } catch (err) {
            $status.text('Network error. Please try again.');
          }
      });

      // CV links — ensure correct hrefs & graceful fallback cross-origin
      $('#downloadCV').attr({ href: CV_PATH, download: CV_DOWNLOAD_NAME });
      $('a[href="assets/cv/Resume_NeamulHaque.pdf"]').each(function(){
        try{
          const linkUrl = new URL(CV_PATH, window.location.href);
          if(linkUrl.origin !== window.location.origin){
            $(this).removeAttr('download').attr({target:'_blank', rel:'noopener'});
          }
        }catch(e){}
      });

      // Back to top
      $('#backToTop, a[href="#"], a[href="#top"]').on('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });