/* ============================================
   script.js — Arap Portfolio
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     1. CUSTOM CURSOR
  ------------------------------------------ */
  const cursor = document.getElementById('cursor');

  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });

    // Scale up on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .pg-item, .project-item, .pill');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  /* ------------------------------------------
     2. SCROLL REVEAL
  ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el) => {
      el.classList.add('vis');
    });
  }, 80);

  /* ------------------------------------------
     3. PLAYGROUND MODAL
  ------------------------------------------ */
  const modal = document.getElementById('pg-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.getElementById('modal-close');
  const pgItems = document.querySelectorAll('.pg-item');

  // Only run if modal elements exist on the current page
  if (modal && closeBtn) {
    pgItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');

        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.classList.add('active');
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => { modalImg.src = ''; }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* ------------------------------------------
     4. NAV ACTIVE STATE ON SCROLL
  ------------------------------------------ */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = '';
            link.style.textShadow = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'rgba(255,255,255,0.95)';
              link.style.textShadow = '0 0 8px rgba(255,255,255,0.4)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ------------------------------------------
     5. INSTAGRAM MODAL
  ------------------------------------------ */
  const igTrigger = document.getElementById('ig-trigger');
  const igModal = document.getElementById('ig-modal');
  const igClose = document.getElementById('ig-close');

  if (igTrigger) {
    igTrigger.addEventListener('click', () => igModal.classList.add('active'));
    igClose.addEventListener('click', () => igModal.classList.remove('active'));
    
    // Close on outside click
    igModal.addEventListener('click', (e) => {
      if (e.target === igModal) igModal.classList.remove('active');
    });
  }

  /* ------------------------------------------
     6. COMING SOON TOAST
  ------------------------------------------ */
  const comingSoonBtn = document.querySelector('.tab-btn.coming-soon');
  const toast = document.getElementById('toast');

  if (comingSoonBtn && toast) {
    comingSoonBtn.addEventListener('click', () => {
      toast.classList.add('show');
      
      // Hide after 2.5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    });
  }

  /* ------------------------------------------
     7. LOCKED PROJECT MICRO-INTERACTION
  ------------------------------------------ */
  const lockedProjects = document.querySelectorAll('.locked-project');

  lockedProjects.forEach(project => {
    project.addEventListener('click', function(e) {
      e.preventDefault(); 
      
      const hintSpan = this.querySelector('.project-link-hint');
      if (this.classList.contains('shake-active')) return;

      const originalText = "VIEW CASE STUDY";
      this.classList.add('shake-active');
      
      hintSpan.innerHTML = `LOCKED 
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>`;
      
      setTimeout(() => {
        this.classList.remove('shake-active');
        hintSpan.innerHTML = originalText;
      }, 1500);
    });
  });

  /* ------------------------------------------
     8. COLLABORATE MODAL (Detail Page)
  ------------------------------------------ */
  const collabBtn = document.getElementById('collab-trigger');
  const contactModal = document.getElementById('contact-modal');
  const contactClose = document.getElementById('contact-close');

  if (collabBtn) {
    collabBtn.addEventListener('click', () => contactModal.classList.add('active'));
    contactClose.addEventListener('click', () => contactModal.classList.remove('active'));
    
    // Close on outside click
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) contactModal.classList.remove('active');
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') contactModal.classList.remove('active');
    });
  }

})();