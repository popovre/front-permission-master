<template>
    <button
        @click="onItemButtonClick"
        class="tree__item-button"
        :class="{ 'tree__item-button--active': state }"
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
            // console.log(this.state, 'click', this.name);
            // this.state ? this.$emit("deleteColumn") : this.$emit("addColumn");
            this.$emit("itemButtonClick");
        },
    },
    mounted() {},
};
</script>

<style></style>
