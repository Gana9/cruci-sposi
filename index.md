---
layout: default
title: Cruci Sposi
---

[//]: # (<div class="floral-divider" aria-hidden="true"></div>)

<section class="intro">
  <p class="subtitle">
    Se resti bloccato sulle parole del cruciverba, premi il numero corrispondente per sbloccare un suggerimento.
  </p>
</section>

<section class="hint-grid" aria-label="Suggerimenti per gli indizi">
{% for hint in site.data.hints %}
  <button type="button" class="hint-btn" data-hint="{{ hint.number }}" aria-haspopup="dialog" aria-label="Suggerimento indizio {{ hint.number }}">
    <span class="hint-number">{{ hint.number }}</span>
  </button>
{% endfor %}
</section>

<div id="hints-content" hidden>
{% for hint in site.data.hints %}
  <div id="hint-{{ hint.number }}">
    <div class="hint-level-1">
      <h2>Indizio {{ hint.number }}</h2>
      {% if hint.text %}
        <p>{{ hint.text }}</p>
      {% endif %}
      {% if hint.image %}
        <img src="{{ hint.image | relative_url }}" alt="Immagine suggerimento {{ hint.number }}" class="hint-image" style="max-width: 100%; height: auto; display: block; margin: 10px auto;">
      {% endif %}
    </div>
    {% if hint.text2 or hint.image2 or hint.soluzione %}
    <div class="hint-level-2">
      <h2>Secondo suggerimento</h2>
      {% if hint.text2 %}
        <p>{{ hint.text2 }}</p>
      {% endif %}
      {% if hint.image2 %}
        <img src="{{ hint.image2 | relative_url }}" alt="Seconda immagine suggerimento {{ hint.number }}" class="hint-image" style="max-width: 100%; height: auto; display: block; margin: 10px auto;">
      {% endif %}
      {% if hint.soluzione %}
        <p class="hint-solution">Soluzione: <strong>{{ hint.soluzione | upcase }}</strong></p>
      {% endif %}
    </div>
    {% endif %}
  </div>
{% endfor %}
</div>

<div class="modal-overlay" id="modal-overlay" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-body">
    <button type="button" class="modal-close" id="modal-close" aria-label="Chiudi suggerimento">&times;</button>
    <div id="modal-body"></div>
  </div>
</div>

[//]: # (<div class="floral-divider" aria-hidden="true"></div>)

<script src="{{ '/assets/js/hints.js' | relative_url }}"></script>
