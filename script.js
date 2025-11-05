const toastArea = document.getElementById('toastArea');

function showToast({message = 'Mensagem enviada com sucesso!', duration = 4000, icon = '✅'} = {}) {
  if (!toastArea) {
    console.warn('toastArea não encontrado no DOM.');
    return;
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-enter';
  toast.innerHTML = `
    <div class="icon">${icon}</div>
    <div class="msg">${message}</div>
    <div class="progress"><div class="bar"></div></div>
  `;
  const bar = toast.querySelector('.bar');

  bar.style.transition = `transform ${duration}ms linear`;
  bar.style.transform = 'scaleX(1)';
  void bar.offsetWidth;
  requestAnimationFrame(() => bar.style.transform = 'scaleX(0)');

  toastArea.appendChild(toast);
  const timeout = setTimeout(() => removeToast(toast), duration);
  toast._timeout = timeout;

  toast.addEventListener('animationend', e=>{
    if (toast.classList.contains('toast-exit')) toast.remove();
  });
}

function removeToast(toast){
  if (!toast) return;
  clearTimeout(toast._timeout);
  toast.classList.remove('toast-enter');
  toast.classList.add('toast-exit');
}

/* Interceptar o envio do formulário */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // impede o envio real
    // Aqui você poderia enviar via AJAX se quisesse
    showToast({
      message: 'Sua mensagem foi enviada com sucesso!',
      duration: 4000,
      icon: '✅'
    });
    form.reset(); // limpa os campos
  });
} else {
  console.warn('Form contactForm não encontrado no DOM.');
}
