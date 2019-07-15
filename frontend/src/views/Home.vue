<template>
  <div class="home">
    <div class="memo-content" v-for="memo in memolist" :key="memo._id">
      {{ memo.memo_content }}
    </div>
    <b-button variant="outline-primary" @click="shuffle">Shuffle</b-button>
  </div>
</template>

<script>
import { apiUrl } from '../variables';
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      memolist: []
    }
  },
  created() {
    axios.get(apiUrl + '/random?num=5')
      .then(res => this.memolist = res.data)
      .catch(err => console.log(err));
  },
  methods: {
    shuffle() {
      axios.get(apiUrl + '/random?num=5')
        .then(res => this.memolist = res.data)
        .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>
.memo-content {
  padding: 10px 0 10px 0;
}
</style>

