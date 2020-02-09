<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        hello-nuxt-vuex
      </h1>
      <h2 class="subtitle">
        My top-notch Nuxt.js project
      </h2>
      <div>{{ jpyRate }}</div>
      <div>{{ btcRate }}</div>
      <div>{{ hoge }}</div>
      <div>
        <button @click="startRateInterval">start</button>
        <button @click="stopRateInterval">stop</button>
      </div>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapGetters('sampleHoge', {
      hoge: 'getHoge'
    }),
    ...mapGetters('rate', {
      jpyRate: 'getJpyRate',
      btcRate: 'getBtcRate'
    }),
  },
  methods: {
    ...mapActions('sampleHoge', {
      setHoge: 'setHoge'
    }),
    ...mapActions('rate', {
      fetchRate: 'fetchRate',
      infiniteRate: 'infiniteRate',
      stopintervalTimer: 'stopintervalTimer'
    }),
    startRateInterval() {
      this.infiniteRate();
    },
    stopRateInterval() {
      this.stopintervalTimer();
    }
  },
  created() {
    this.fetchRate();
  },
  mounted() {
    this.setHoge({ name: 'that is Hoge' });
    this.startRateInterval();
  }
}
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
