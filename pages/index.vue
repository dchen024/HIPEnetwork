<template>
  <nav>
    <ul>
      <li id="logo">HIPE</li>
    </ul>
    <ul>
      <nuxt-link to="/signup">
        <li>Sign Up</li>
      </nuxt-link>
      <nuxt-link to="/signup">
        <li>Log In</li>
      </nuxt-link>
    </ul>
  </nav>

  <section id="hero">
    <div id="hero__container">
      <h1>High Impact Practices and Engagement (HIPE) Network</h1>
      <h2>A platform designed to connect students with HIPE opportunities</h2>
      <div id="hero__btn-container">
        <nuxt-link to="/signup">
          <button class="sign-up-btn">Sign Up</button>
        </nuxt-link>
        <nuxt-link to="/signup">
          <button class="log-in-btn">Log In</button>
        </nuxt-link>
      </div>
    </div>
  </section>

  <section id="about">
    <h2>What can I do as a student of the HIPE Network?</h2>
    <div class="about__container">
      <div class="about__container_item">
        <img src="/img/flask.png" width="96px" />
        <h3>Participate in Research</h3>
      </div>
      <div class="about__container_item">
        <img src="/img/briefcase.png" width="96px" />
        <h3>Find Internships</h3>
      </div>
      <div class="about__container_item">
        <img src="/img/user-add.png" width="96px" />
        <h3>Network with Professionals</h3>
      </div>
    </div>

    <h2>What can I do as a mentor of the HIPE Network?</h2>
    <div class="about__container">
      <div class="about__container_item">
        <img src="/img/connect.svg" width="96px" />
        <h3>Expand your reach</h3>
      </div>
      <div class="about__container_item">
        <img src="/img/handshake.svg" width="96px" />
        <h3>Find Talent</h3>
      </div>
      <div class="about__container_item">
        <img src="/img/chalkboard.svg" width="96px" />
        <h3>Host Events</h3>
      </div>
    </div>
  </section>
</template>

<style>
* {
  box-sizing: border-box;
}

:root {
  --primary: #0d66c2;
  --secondary: #343a40;
  --beige: #f8f4e7;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  color: var(--beige);
  background-color: var(--secondary);
  padding-left: 2rem;
  padding-right: 2rem;
}

nav ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
}

nav ul li {
  color: var(--beige);
  font-size: 1.25rem;
}

#logo {
  font-size: 1.5em;
  letter-spacing: 0.05em;
}
body {
  background-color: var(--beige);
  padding: 0;
  margin: 0;
}

#hero {
  display: flex;
  flex-direction: column;
  background-image: url(/img/hero.png);
  background-position: center;
  background-size: cover;
}

#hero__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#hero__container h1 {
  color: var(--beige);
  width: 90vw;
  font-size: 1.8rem;
  text-align: center;
  margin: 0;
  margin-top: 3rem;
  line-height: 120%;
}

@media (min-width: 576px) {
  #hero__container h1 {
    color: var(--beige);
    width: 90vw;
    font-size: 4rem;
    text-align: center;
    margin: 0;
    margin-top: 5rem;
    line-height: 125%;
  }
}

#hero__container h2 {
  color: var(--beige);
  width: 90vw;
  font-size: 1rem;
  text-align: center;
  margin: 0;
  margin-top: 1rem;
}

@media (min-width: 576px) {
  #hero__container h2 {
    color: var(--beige);
    width: 90vw;
    font-size: 1.5rem;
    text-align: center;
    margin: 0;
    margin-top: 2rem;
  }
}

#hero__btn-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  /* Top Right Bottom Left */
  margin: 2rem 0 3rem 0;
}

@media (min-width: 576px) {
  #hero__btn-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    /* Top Right Bottom Left */
    margin: 4rem 0 5rem 0;
  }
}

@media (min-width: 576px) {
  #hero__btn-container {
    display: flex;
    justify-content: center;
    gap: 5rem;
    /* Top Right Bottom Left */
    margin: 4rem 0 5rem 0;
  }
}

.sign-up-btn {
  border: 0.125rem solid var(--secondary);
  background-color: var(--primary);
  color: var(--beige);
  padding: 1rem 2rem; /* Top Right Bottom Left */
  border-radius: 3.75rem;
  font-size: 1rem;
  font-weight: 600;
  min-width: 8rem;
}

@media (min-width: 576px) {
  .sign-up-btn {
    border: 0.125rem solid var(--secondary);
    background-color: var(--primary);
    color: var(--beige);
    padding: 1.25rem 6rem; /* Top Right Bottom Left */
    border-radius: 3.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    min-width: 12rem;
  }
}

.log-in-btn {
  border: 0.125rem solid black;
  background-color: var(--secondary);
  color: var(--beige);
  padding: 1rem 2rem; /* Top Right Bottom Left */
  border-radius: 3.75rem;
  font-size: 1rem;
  font-weight: 600;
  min-width: 8rem;
}

@media (min-width: 576px) {
  .log-in-btn {
    border: 0.125rem solid black;
    background-color: var(--secondary);
    color: var(--beige);
    padding: 1.25rem 6rem; /* Top Right Bottom Left */
    border-radius: 3.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    min-width: 12rem;
  }
}

#about {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#about h2,
#about h3 {
  color: var(--secondary);
  text-align: center;
}

.about__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}

@media (min-width: 576px) {
  .about__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

.about__container_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 18rem;
}

#about {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 576px) {
  #about {
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

#about h2 {
  margin-top: 1rem;
}

@media (min-width: 576px) {
  #about h2 {
    margin-top: 2rem;
  }
}
</style>
