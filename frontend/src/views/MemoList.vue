<template>
  <div class="memo-list container">
    <div v-for="memo in memolist" :key="memo._id">
      <Memo :memo="memo" />
    </div>
  </div>
</template>

<script>
import Memo from '../components/Memo.vue';
import { apiUrl } from '../variables';
import axios from 'axios';

export default {
  components: {
    Memo
  },
  data() {
    return {
      memolist: []
    }
  },
  created() {
    axios.get(apiUrl + '/list')
      .then(res => this.memolist = res.data)
      .catch(err => console.log(err));
  }
}
</script>

