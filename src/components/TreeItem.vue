<template>
    <li class="tree__item">
        <h3 class="tree__item-title">{{ rootPermissionTitles.part1.title }}</h3>
        <button class="tree__item-button">Проекты</button>
        <button class="tree__item-button">Настройки</button>
        <button class="tree__item-button">Тест</button>
    </li>
</template>

<script>
export default {
    name: "TreeItem",
    components: {},
    props: {
        rootPermission: Object,
        rootPermissionTitles: Object,
    }
};
</script>

<style>
    .tree__item {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
</style>
