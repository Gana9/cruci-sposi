document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.hint-btn');
  var overlay = document.getElementById('modal-overlay');
  var modalBody = document.getElementById('modal-body');
  var closeBtn = document.getElementById('modal-close');
  var lastFocused = null;

  // --- INIZIO GESTIONE LOCAL STORAGE ---
  var storageKey = "cruciSposi_viewedHints"; 
  var viewedHints = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Al caricamento, cerca i bottoni già visti e aggiunge la classe CSS "viewed"
  viewedHints.forEach(function(number) {
    var btn = document.querySelector('.hint-btn[data-hint="' + number + '"]');
    if (btn) {
      btn.classList.add("viewed");
    }
  });
  // --- FINE GESTIONE LOCAL STORAGE ---

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
      var hintNumber = btn.getAttribute('data-hint');

      // --- AGGIORNAMENTO LOCAL STORAGE AL CLICK ---
      if (!viewedHints.includes(hintNumber)) {
        viewedHints.push(hintNumber);
        localStorage.setItem(storageKey, JSON.stringify(viewedHints));
        btn.classList.add("viewed"); // Aggiunge la classe visivamente in tempo reale
      }
      // -------------------------------------------

      openModal(hintNumber);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeModal();
    }
  });
});
