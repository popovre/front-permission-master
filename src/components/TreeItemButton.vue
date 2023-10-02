<template>
    <button
        @click="onItemButtonClick"
        class="tree__item-button"
        :class="{ 'tree__item-button--active': !state }"
    >
        {{ name }}
    </button>
</template>

<script>
export default {
    name: "TreeItemButton",
    props: {
        name: String,
        state: Boolean,
    },
    methods: {
        onItemButtonClick() {
            !this.state ? this.$emit("addColumn") : this.$emit("deleteColumn");
        },
        // disableButton() {
        //     this.activeButton = false;
        //     this.$emit("deleteColumn", this.index)
        // }
    },
    mounted() {},
};
</script>

<style></style>
