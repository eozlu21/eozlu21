---
title: "Cyberiad Lab - Home"
layout: homelay
excerpt: "Visual intelligence research at Koç University and Hacettepe University."
permalink: /
---

<section markdown="0" class="home-hero">
  <p class="home-hero__eyebrow">Cyberiad Research Group</p>
  <h1>Teaching machines to see, imagine, and reason about the visual world.</h1>
  <p class="home-hero__lead">We develop generative and multimodal AI systems that understand, create, and edit images and video—bringing together computer vision, machine learning, graphics, language, and signal processing.</p>
  <div class="home-hero__actions">
    <a class="home-button home-button--primary" href="{{ site.url }}{{ site.baseurl }}/research/">Explore our research</a>
    <a class="home-button home-button--secondary" href="{{ site.url }}{{ site.baseurl }}/vacancies">Join the lab</a>
  </div>
  <p class="home-hero__affiliation">Based at Koç University and Hacettepe University · Affiliated with KUIS AI</p>
</section>

<section markdown="0" class="home-section" aria-labelledby="research-themes-title">
  <div class="home-section__heading">
    <div>
      <p class="home-section__eyebrow">What we study</p>
      <h2 id="research-themes-title">Research themes</h2>
    </div>
  </div>
  <div class="home-theme-grid">
    <a class="home-theme-card" href="{{ site.url }}{{ site.baseurl }}/research/generative-modeling/">
      <span class="home-theme-card__number">01</span>
      <h3>Generative visual intelligence</h3>
      <p>Controllable image and video creation, editing, motion planning, and neural scene representations.</p>
      <span class="home-theme-card__arrow" aria-hidden="true">↗</span>
    </a>
    <a class="home-theme-card" href="{{ site.url }}{{ site.baseurl }}/research/multimodal-reasoning/">
      <span class="home-theme-card__number">02</span>
      <h3>Multimodal reasoning</h3>
      <p>Vision-language models, compositional generalization, temporal grounding, and behavioral evaluation.</p>
      <span class="home-theme-card__arrow" aria-hidden="true">↗</span>
    </a>
    <a class="home-theme-card" href="{{ site.url }}{{ site.baseurl }}/research/structured-video/">
      <span class="home-theme-card__number">03</span>
      <h3>Structured video</h3>
      <p>Continuous, compact representations for coherent motion, reconstruction, resampling, and editing.</p>
      <span class="home-theme-card__arrow" aria-hidden="true">↗</span>
    </a>
    <a class="home-theme-card" href="{{ site.url }}{{ site.baseurl }}/research/spherical-vision/">
      <span class="home-theme-card__number">04</span>
      <h3>Spherical visual intelligence</h3>
      <p>Geometry-aware 360° perception, visual attention, eye tracking, and spatial audio.</p>
      <span class="home-theme-card__arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</section>

<section markdown="0" class="home-section" aria-labelledby="featured-work-title">
  <div class="home-section__heading">
    <div>
      <p class="home-section__eyebrow">Latest work</p>
      <h2 id="featured-work-title">Featured research</h2>
    </div>
    <a href="{{ site.url }}{{ site.baseurl }}/publications/">View all publications →</a>
  </div>

  <div class="home-featured-grid">
    {% for publi in site.data.publist limit:3 %}
    <article class="home-featured-card">
      <a class="home-featured-card__image" href="{{ publi.project | default: publi.arxiv }}" target="_blank" rel="noopener">
        <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" alt="Visual overview of {{ publi.title }}" />
      </a>
      <div class="home-featured-card__body">
        <p class="home-featured-card__venue">{{ publi.venue }}</p>
        <h3>{{ publi.title }}</h3>
        <p>{{ publi.description }}</p>
        <div class="home-featured-card__links">
          {% if publi.project %}<a href="{{ publi.project }}" target="_blank" rel="noopener">Project</a>{% endif %}
          {% if publi.arxiv %}<a href="{{ publi.arxiv }}" target="_blank" rel="noopener">Paper</a>{% endif %}
          {% if publi.code %}<a href="{{ publi.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
        </div>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section markdown="0" class="home-people" aria-labelledby="home-people-title">
  <div class="home-people__copy">
    <p class="home-section__eyebrow">Our group</p>
    <h2 id="home-people-title">Research across institutions and disciplines</h2>
    <p>Cyberiad brings together researchers in computer vision, machine learning, graphics, language, and signal processing at Koç University and Hacettepe University.</p>
    <a href="{{ site.url }}{{ site.baseurl }}/team/">Meet the team →</a>
  </div>
  <div class="home-people__pis">
    {% for member in site.data.team_members %}{% if member.role == "pi" %}
    <a class="home-person" href="{{ member.website }}" target="_blank" rel="noopener">
      <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" alt="Portrait of {{ member.name }}">
      <span><strong>{{ member.name }}</strong><small>{{ member.info }}</small></span>
    </a>
    {% endif %}{% endfor %}
  </div>
</section>

<section markdown="0" class="home-join" aria-labelledby="home-join-title">
  <div>
    <p class="home-section__eyebrow">Work with us</p>
    <h2 id="home-join-title">Help shape the next generation of AI.</h2>
    <p>We welcome ambitious MSc and PhD students, postdoctoral researchers, research assistants, and visiting students.</p>
  </div>
  <a class="home-button home-button--primary" href="{{ site.url }}{{ site.baseurl }}/vacancies">Explore opportunities</a>
</section>

<figure class="home-affiliation-logos">
  <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/koc_logo2.png" alt="Koç University" style="height: 72px; width: auto; max-width: 220px; object-fit: contain">
  <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/hacettepe_university_logo.svg" alt="Hacettepe University" style="height: 72px; width: auto; max-width: 220px; object-fit: contain">
</figure>
