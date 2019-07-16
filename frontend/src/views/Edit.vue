<template>
    <div class="edit container">
        <form>
            <b-form-textarea
            id="textarea"
            v-model="memo_content"
            placeholder="Enter something..."
            rows="3"
            max-rows="12"
            ></b-form-textarea>
            <b-button type="submit" class="submit-button" variant="outline-primary">Update</b-button>
            <b-button type="submit" class="submit-button" variant="outline-danger" @click="deleteMemo">Delete</b-button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { apiUrl } from '../variables';

export default {
    name: 'edit',
    data() {
        return {
            id: '',
            memo_content: ''
        }
    },
    created() {
        this.id = this.$route.params.id;
        axios.get(apiUrl + `/${this.id}`)
            .then(res => this.memo_content = res.data.memo_content)
            .catch(err => console.log(err));
    },
    methods: {
        deleteMemo(e) {
            e.preventDefault();
            axios.get(apiUrl + `/delete/${this.id}`)
                .then(res => {
                    this.$router.push({ path: '../memolist' });
                })
                .catch(err => console.log(err));
        }
    }
}
</script>

