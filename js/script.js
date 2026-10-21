// ===== Smooth scroll dengan offset tinggi navbar =====
const navbar = document.querySelector('.navbar');

function scrollKeBagian(id) {
  const target = document.querySelector(id);
  if (!target) return;
  const posisi = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight + 1;
  window.scrollTo({ top: posisi, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    e.preventDefault();
    scrollKeBagian(id);
    const menu = document.getElementById('menuUtama');
    if (menu.classList.contains('show')) bootstrap.Collapse.getInstance(menu).hide();
  });
});

// ===== Bayangan navbar saat di-scroll =====
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Validasi newsletter =====
const formNewsletter = document.getElementById('formNewsletter');
const inputEmail = document.getElementById('emailNewsletter');
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

formNewsletter.addEventListener('submit', e => {
  e.preventDefault();
  const valid = polaEmail.test(inputEmail.value.trim());
  inputEmail.setCustomValidity(valid ? '' : 'Format email tidak valid');
  formNewsletter.classList.add('was-validated');
  if (valid) {
    // Simulasi antarmuka: email TIDAK disimpan ke database
    new bootstrap.Modal(document.getElementById('modalBerhasil')).show();
    formNewsletter.reset();
    formNewsletter.classList.remove('was-validated');
  }
});
inputEmail.addEventListener('input', () => inputEmail.setCustomValidity(''));

// ===== Slider testimoni: update penanda halaman (1 / 2) =====
const sliderTesti = document.getElementById('carouselTesti');
const penandaTesti = document.getElementById('testiPage');
if (sliderTesti && penandaTesti) {
  const total = sliderTesti.querySelectorAll('.carousel-item').length;
  sliderTesti.addEventListener('slid.bs.carousel', e => {
    penandaTesti.textContent = (e.to + 1) + ' / ' + total;
  });
}
