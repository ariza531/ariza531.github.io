// 1. Smooth Scroll untuk semua tautan internal (opsional, tapi bagus untuk UX)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // offset untuk navbar fixed
        behavior: 'smooth'
      });
    }
  });
});

// 2. Animasi sederhana saat scroll (fade-in untuk kartu layanan)
document.addEventListener('DOMContentLoaded', function () {
  const featureCards = document.querySelectorAll('.feature-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  featureCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// 3. Notifikasi kecil saat klik tombol CTA (opsional tapi menyenangkan)
document.querySelectorAll('.btn-cta, .btn-light').forEach(button => {
  button.addEventListener('click', function () {
    // Cek apakah sudah ada notifikasi aktif
    if (document.querySelector('.toast')) return;

    // Buat elemen toast (notifikasi kecil)
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      font-weight: 600;
      animation: fadeInOut 3s ease-in-out;
    `;

    toast.innerText = '✅ Mengarahkan ke kontak...';

    // Tambahkan animasi CSS
    if (!document.querySelector('#toast-style')) {
      const style = document.createElement('style');
      style.id = 'toast-style';
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Hapus setelah animasi selesai
    setTimeout(() => {
      toast.remove();
    }, 3000);
  });
});

// 4. Auto-hide navbar saat scroll ke bawah (opsional – UX modern)
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scroll ke bawah → sembunyikan navbar
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scroll ke atas → tampilkan navbar
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop;
});