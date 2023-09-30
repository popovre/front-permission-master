<template>
    <div class="modal-tree">
        <div class="tree">
            <div class="tree-wrapper">
                <button
                    @click="onButtonBackClick"
                    class="tree__button-back"
                    type="button"
                >
                    <span>Назад</span>
                </button>
                <h2 class="tree__title">Менеджер</h2>
                <ul class="tree__list">
                    <TreeItem
                        v-for="(column, index) in columnsTest"
                        @sentItem="addNewColumnHandler"
                        :key="index"
                        :keyNumber="index"
                        :column="column"
                        :items="column.items"
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
import { mapActions } from "vuex";

export default {
    name: "Tree",
    components: { TreeItem },
    data() {
        return {
            columns: [],
            columnsTest: [],
        };
    },
    props: {
        rootPermission: Object,
        rootPermissionTitles: Object,
    },
    methods: {
        ...mapActions(["modalClose"]),
        onButtonBackClick() {
            this.modalClose();
        },
        addNewColumnHandler(column) {
            if (
                this.columnsTest.find((value) => {
                    return (
                        this.findIntersect(value.ids, Object.keys(column))
                            .length !== 0
                    );
                }) === undefined
            ) {
                this.makeNewColumn(column);
            } else {
                    this.columnsTest.find((value) => {
                        console.log(this.findIntersect(value.ids, Object.keys(column)));
                        return (
                            this.findIntersect(value.ids, Object.keys(column))
                                .length !== 0
                        );
                    })
            }
        },
        makeNewColumn(obj) {
            let miniObj = {};
            let arrNames = [];
            let arrIds = [];
            let arrItems = [];
            for (let [key, val] of Object.entries(obj)) {
                if (key.includes("part") && typeof val === "object") {
                    if (val.items) {
                        arrItems.push(val.items);
                    }
                    arrIds.push(key);
                    arrNames.push(val.title);
                }
            }
            miniObj.names = arrNames;
            miniObj.ids = arrIds;
            miniObj.items = arrItems;
            Object.keys(miniObj).length
                ? this.columnsTest.push(miniObj)
                : "nothing";
        },
        findIntersect(arr1, arr2) {
            return arr1.filter((val) => arr2.indexOf(val) !== -1);
        },
    },
    mounted() {
        this.makeNewColumn(this.rootPermissionTitles);
    },
};
</script>

<style>
.tree-wrapper {
    overflow: auto;
}

.tree__button-back {
    position: relative;
    border: none;
    background-color: #ffffff;
    color: #3f3ffe;
    padding: 10px;
    padding-left: 20px;
    font-size: 18px;
}

.tree__button-back:active {
    opacity: 0.6;
}

.tree__button-back::before {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.7957 18.7041C16.0071 18.9154 16.1258 19.2021 16.1258 19.501C16.1258 19.7999 16.0071 20.0865 15.7957 20.2978C15.5844 20.5092 15.2977 20.6279 14.9989 20.6279C14.7 20.6279 14.4133 20.5092 14.202 20.2978L6.70198 12.7978C6.5971 12.6933 6.51388 12.5691 6.4571 12.4324C6.40032 12.2956 6.37109 12.149 6.37109 12.001C6.37109 11.8529 6.40032 11.7063 6.4571 11.5696C6.51388 11.4328 6.5971 11.3086 6.70198 11.2041L14.202 3.7041C14.4133 3.49276 14.7 3.37402 14.9989 3.37402C15.2977 3.37402 15.5844 3.49276 15.7957 3.7041C16.0071 3.91544 16.1258 4.20209 16.1258 4.50097C16.1258 4.79986 16.0071 5.08651 15.7957 5.29785L9.09354 12L15.7957 18.7041Z' fill='%233f3ffe'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-size: contain;
    left: 5px;
    top: calc(50% - 7px);
}

.tree__list {
    display: flex;
    align-items: flex-start;
    padding-left: 0;
}

.tree__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    width: 200px;
    background-color: lightgray;
    padding-left: 30px;
}
</style>
