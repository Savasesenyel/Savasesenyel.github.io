document.getElementById('year').textContent = new Date().getFullYear();

const links = document.querySelectorAll('.nav-link');
const tabline = document.getElementById('tabline');
const sections = [...document.querySelectorAll('main section[id]')];
const fileNames = {hakkimda:'Hakkımda', projeler:'Projeler', raporlar:'Haftalık Raporlar', iletisim:'İletişim'};

function setActive(id){
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  tabline.innerHTML = (fileNames[id] || '') + ' <span class="cur">— açık</span><span class="blink"></span>';
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => io.observe(s));

setActive('hakkimda');

const msgForm = document.getElementById('msgForm');
const msgNote = document.getElementById('msgNote');
if (msgForm) {
  msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = msgForm.name.value.trim();
    const email = msgForm.email.value.trim();
    const message = msgForm.message.value.trim();

    const subject = `Portfolyo mesajı — ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    const mailto = `mailto:savas.esenyel999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    msgNote.textContent = 'E-posta uygulaman açıldı — göndermeden önce mesajını kontrol edebilirsin.';
    msgNote.classList.add('is-ready');
  });
}
