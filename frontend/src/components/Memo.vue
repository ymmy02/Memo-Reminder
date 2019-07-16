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
    padding: 20px 0 20px 0;
}

.memo-content:hover {
    background-color: ivory;
}

.edit-button {
    float: right;
}
</style>
