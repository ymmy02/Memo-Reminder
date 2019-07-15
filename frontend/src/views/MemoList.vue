<template>
  <div class="memo-list container">
    <div class="add-memo">
      <form @submit="addNewMemo">
        <b-form-textarea
          id="textarea"
          v-model="newmemo"
          placeholder="Enter something..."
          rows="3"
          max-rows="12"
        ></b-form-textarea>
        <b-button type="submit" class="submit-button" variant="outline-primary">Submit</b-button>
      </form>
    </div>
    <br />
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
      newmemo: '',
      memolist: []
    }
  },
  created() {
    axios.get(apiUrl + '/list')
      .then(res => this.memolist = res.data)
      .catch(err => console.log(err));
  },
  methods: {
    addNewMemo(e) {
      e.preventDefault();
      const newMemo = { memo_content: this.newmemo };
      axios.post(apiUrl + '/add', newMemo)
        .then(res => {
          this.memolist = [...this.memolist, res.data.newMemo];
        })
        .catch(err => console.log(err));
      this.newmemo = '';
    }
  }
}
</script>

<style scoped>
.add-memo {
  margin-bottom: 20px;
}

.submit-button {
  float: left;
}
</style>

