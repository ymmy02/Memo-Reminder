<template>
    <div class="memo-content">
        {{ memo.memo_content }}
        <b-button variant="outline-success" class="edit-button">Edit</b-button>
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

.edit-button {
    float: right;
}
</style>
