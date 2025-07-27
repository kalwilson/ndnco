<template>
  <HeroSection
    heroTitle="About the Native Digital Netowrking Community"
    heroDetails="A place born form a late night rant between siblings, and a desire to see a space that has been created "
    heroHighlight="specifically for Indigenous peoples online."
    heroLink="/register"
    heroBtn="Sign up for free!"
    className="hero__btn--red"
  />
  <section class="about">
    <div class="about__container">
      <h2 class="about__heading">Digital smoke signals</h2>
      <h4 class="about__subheading">From us here on unceeded Snaw'naw'as land.</h4>
      <div class="future">
        <h4 class="future__heading">NDNCo to the future:</h4>
        <p class="future__blurb">
          There's so much I want to do with this website! Right now it's a directory to connect all
          those that have the spark of the entrepreneurial spirit.
        </p>
        <ul class="future__ideas">
          <li class="future__idea">
            <strong> Community sections:</strong> job boards, event announcements, language/cultural
            class announcements.
          </li>
          <li class="future__idea">
            <strong> Users:</strong> to leave reviews on businesses, and be able to save favourite
            businesses.
          </li>
          <li class="future__idea--italic">
            Mostly the idea is to escape mainstream social sites built for everyone, to a safe space
            online just for Indigenous folks.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { HeroSection } from '@/components'
</script>

<style lang="scss" scoped>
@use './AboutView.scss' as *;
</style>
