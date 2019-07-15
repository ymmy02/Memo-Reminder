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

export default {
  components: {
    Memo
  },
  data() {
    return {
      memolist: [
        {
          _id: '1',
          memo_content: 'First memo'
        },
        {
          _id: '2',
          memo_content: 'Second memo'
        },
        {
          _id: '3',
          memo_content: 'Third memo'
        },
      ]
    }
  }
}
</script>

