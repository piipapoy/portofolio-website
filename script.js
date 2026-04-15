/* ============================================
   script.js — Arap Portfolio Refactored
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

  pgItems.forEach(item => {
    item.addEventListener('click', () => {
      // Extract data
      const imgSrc = item.querySelector('img').src;
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');

      // Populate Modal
      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Open Modal
      modal.classList.add('active');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => { modalImg.src = ''; }, 300); // Clear image after animation
  };

  closeBtn.addEventListener('click', closeModal);
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

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

})();

const igTrigger = document.getElementById('ig-trigger');
const igModal = document.getElementById('ig-modal');
const igClose = document.getElementById('ig-close');

if (igTrigger) {
  igTrigger.addEventListener('click', () => igModal.classList.add('active'));
  igClose.addEventListener('click', () => igModal.classList.remove('active'));
  
  // Klik di luar modal buat nutup
  igModal.addEventListener('click', (e) => {
    if (e.target === igModal) igModal.classList.remove('active');
  });
}

// Tambahkan di dalam file script.js kamu
const comingSoonBtn = document.querySelector('.tab-btn.coming-soon');
const toast = document.getElementById('toast');

if (comingSoonBtn && toast) {
  comingSoonBtn.addEventListener('click', () => {
    toast.classList.add('show');
    
    // Ilangin lagi setelah 2.5 detik
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  });
}

// Micro-interaction untuk Project yang di-lock
const lockedProjects = document.querySelectorAll('.locked-project');

lockedProjects.forEach(project => {
  project.addEventListener('click', function(e) {
    e.preventDefault(); 
    
    const hintSpan = this.querySelector('.project-link-hint');
    
    // Kalau lagi animasi (udah merah), jangan di-trigger lagi
    if (this.classList.contains('shake-active')) return;

    // Simpan teks original biar bisa dibalikin
    const originalText = "VIEW CASE STUDY";
    
    // Trigger animasi dan ubah warna
    this.classList.add('shake-active');
    
    // Inject teks Locked + Gembok SVG
    hintSpan.innerHTML = `LOCKED 
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>`;
    
    // Kembalikan ke normal setelah 1.5 detik
    setTimeout(() => {
      this.classList.remove('shake-active');
      hintSpan.innerHTML = originalText;
    }, 1500);
  });
});