<template>
    <div class="memo-content">
        {{ memo.memo_content }}
        <router-link 
            :to="{ name: 'edit', params: { id: memo._id } }">
            <b-button variant="outline-success" class="edit-button">Edit</b-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Memo",
    props: ["memo"],
}
</script>

<style scoped>
.memo-content {
    white-space: pre-wrap;
}

.memo-content:hover {
    background-color: ivory;
}

.edit-button {
    position: relative;
    bottom: 30px;
    float: right;
}
</style>
