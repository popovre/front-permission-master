<template>
    <div class="modal-tree">
        <div class="tree">
            <div class="tree-wrapper">
                <button type="button">
                    <span>Назад</span>
                </button>
                <h2>Менеджер</h2>
                <ul
                    class="tree__list"
                >
                    <TreeItem
                    :rootPermission="rootPermission"
                    :rootPermissionTitles="rootPermissionTitles"
                    />
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import TreeItem from "@/components/TreeItem";

export default {
    name: "Tree",
    components: { TreeItem },
    props: {
        rootPermission: Object,
        rootPermissionTitles: Object,
    }
};
</script>

<style>
.tree__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
}
</style>
