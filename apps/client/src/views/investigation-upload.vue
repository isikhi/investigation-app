<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <upload-investigation/>
  </div>
</template>

<script>
import Vue from 'vue';
import UploadInvestigation from '../components/UploadInvestigation.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    UploadInvestigation,
  },
});
</script>
