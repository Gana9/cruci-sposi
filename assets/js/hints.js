document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.hint-btn');
  var overlay = document.getElementById('modal-overlay');
  var modalBody = document.getElementById('modal-body');
  var closeBtn = document.getElementById('modal-close');
  var lastFocused = null;

  function openModal(number) {
    var source = document.getElementById('hint-' + number);
    if (!source) return;
    modalBody.innerHTML = source.innerHTML;
    overlay.hidden = false;
    lastFocused = document.activeElement;
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    overlay.hidden = true;
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-hint'));
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeModal();
    }
  });
});
