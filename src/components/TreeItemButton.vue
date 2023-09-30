<template>
    <button
        @click="onItemButtonClick()"
        class="tree__item-button"
        :class="{ 'tree__item-button--active': !activeButton }"
    >
        {{ name }}
    </button>
</template>

<script>
export default {
    name: "TreeItemButton",
    props: {
        name: String,
        index: Number,
    },
    data() {
        return {
            activeButton: Boolean
        }
    },

    methods: {
        onItemButtonClick() {
            this.activeButton = !this.activeButton;
            !this.activeButton ? this.$emit("addColumn", this.index) : this.$emit("deleteColumn", this.index);
        },
        disableButton() {
            this.activeButton = false;
            this.$emit("deleteColumn", this.index)
        }
    },
    mounted() {},
};
</script>

<style></style>
