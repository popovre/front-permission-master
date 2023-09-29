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
            this.$emit("onItemButtonClick", this.index);
            this.activeButton = !this.activeButton;
        }
    },
    mounted() {},
};
</script>

<style></style>
