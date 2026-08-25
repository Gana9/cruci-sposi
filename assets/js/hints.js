document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.hint-btn');
  var overlay = document.getElementById('modal-overlay');
  var modalBody = document.getElementById('modal-body');
  var closeBtn = document.getElementById('modal-close');
  var lastFocused = null;

  // --- INIZIO GESTIONE LOCAL STORAGE ---
  // Teniamo traccia degli indizi già visualizzati almeno una volta.
  // Serve a sbloccare il SECONDO livello di suggerimento: diventa
  // disponibile solo dopo che il primo è già stato visto (anche in una
  // sessione precedente, perché lo stato è persistito nel browser).
  var storageKey = "cruciSposi_viewedHints";
  var revealedKey = "cruciSposi_revealedLevel2";
  var viewedHints = readList(storageKey);      // primi suggerimenti già aperti
  var revealedHints = readList(revealedKey);   // secondi suggerimenti già rivelati (una tantum)

  function readList(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveList(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
      /* localStorage non disponibile: la funzione degrada senza errori */
    }
  }

  function isViewed(number) {
    return viewedHints.indexOf(String(number)) !== -1;
  }

  function markViewed(number) {
    number = String(number);
    if (viewedHints.indexOf(number) === -1) {
      viewedHints.push(number);
      saveList(storageKey, viewedHints);
    }
  }

  function isLevel2Revealed(number) {
    return revealedHints.indexOf(String(number)) !== -1;
  }

  function markLevel2Revealed(number) {
    number = String(number);
    if (revealedHints.indexOf(number) === -1) {
      revealedHints.push(number);
      saveList(revealedKey, revealedHints);
    }
  }
  // --- FINE GESTIONE LOCAL STORAGE ---

  // Costruisce il contenuto del modale.
  // canShowLevel2 = true solo se l'indizio era GIA' stato visto prima di
  // questo click: in tal caso mostriamo il pulsante per il secondo livello.
  function openModal(number, canShowLevel2) {
    var source = document.getElementById('hint-' + number);
    if (!source) return;

    var level1 = source.querySelector('.hint-level-1');
    var level2 = source.querySelector('.hint-level-2');

    modalBody.innerHTML = '';
    if (level1) {
      modalBody.innerHTML = level1.innerHTML;
    } else {
      // Fallback per indizi senza struttura a livelli.
      modalBody.innerHTML = source.innerHTML;
    }

    if (level2 && canShowLevel2) {
      // var alreadyRevealed = isLevel2Revealed(number);
      var alreadyRevealed = false;

      var revealBtn = document.createElement('button');
      revealBtn.type = 'button';
      revealBtn.className = 'hint-second-btn';

      var container = document.createElement('div');
      container.className = 'hint-second';
      container.innerHTML = level2.innerHTML;

      if (alreadyRevealed) {
        // Il secondo suggerimento è consumabile una sola volta: se è già
        // stato rivelato, il pulsante resta disabilitato e il contenuto
        // non viene mostrato di nuovo.
        revealBtn.textContent = 'Secondo suggerimento già visto';
        revealBtn.disabled = true;
        container.hidden = true;
      } else {
        revealBtn.textContent = 'Mostra secondo suggerimento';
        container.hidden = true;

        revealBtn.addEventListener('click', function () {
          container.hidden = false;
          revealBtn.disabled = true;
          revealBtn.textContent = 'Secondo suggerimento già visto';
          markLevel2Revealed(number);
        });
      }

      modalBody.appendChild(revealBtn);
      modalBody.appendChild(container);
    }

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

      // Il secondo livello è visibile solo se il primo era già stato visto
      // PRIMA di questo click. Leggiamo lo stato, poi registriamo la visione.
      var alreadyViewed = isViewed(hintNumber);
      markViewed(hintNumber);

      openModal(hintNumber, alreadyViewed);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeModal();
    }
  });
});
