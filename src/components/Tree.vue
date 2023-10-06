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
                        @addColumn="addColumnHandler"
                        @deleteColumns="deleteColumnsHandler"
                        @buttonClick="buttonClickHandler"
                        :key="index"
                        :index="index"
                        :keyNumber="index"
                        :column="column"
                        :items="column.items"
                        :rootPermission="rootPermission"
                        :rootPermissionTitles="rootPermissionTitles"
                    />
                </ul>
                <button
                    @click="onButtonSaveClick"
                    class="tree__button-save"
                    type="button"
                >
                    <span>Сохранить</span>
                </button>
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
        buttonClickHandler([currentColumnInd, buttonIndex, buttonState]) {
            console.log(currentColumnInd, buttonIndex, buttonState);
            let columnInd = this.columns.findIndex((value) => {
                return (
                    value.ids.join() ===
                    this.columnsTest[currentColumnInd].ids.join()
                );
            });
            this.changeButtonState(this.columns, columnInd, buttonIndex, buttonState)
        },
        changeButtonState(arr, currentColumnInd, buttonIndex, buttonState) {
            arr[currentColumnInd].buttons.forEach((val, ind, array) => {
                array[ind] = (ind === buttonIndex? {name: val.name, state: buttonState} : {name: val.name, state: false})
            })
        },
        async addColumnHandler([newColumn, currentColumnInd]) {
            if (
                this.columnsTest.find((value) => {
                    return (
                        this.findIntersect(value.ids, Object.keys(newColumn))
                            .length !== 0
                    );
                }) === undefined
            ) {
                await this.deleteColumnsHandler(currentColumnInd);
                await this.addNewColumn(this.columnsTest, newColumn);
            }
        },
        createNewColumn(obj) {
            let columnObj = {};
            let arrNames = [];
            let arrIds = [];
            let arrItems = [];
            for (let [key, val] of Object.entries(obj)) {
                if (key.includes("part") && typeof val === "object") {
                    arrIds.push(key);
                    arrNames.push(val.title);
                    if (val.items) {
                        arrItems.push(val.items);
                    }
                }
            }
            columnObj.names = arrNames;
            columnObj.ids = arrIds;
            columnObj.items = arrItems;

            return columnObj;
        },
        createStateColumns(arr, obj) {
            let columnObj = {};
            let arrIds = [];
            let arrButtons = [];
            for (let [key, val] of Object.entries(obj)) {
                if (key.includes("part") && typeof val === "object") {
                    arrIds.push(key);
                    arrButtons.push({
                        name: val.title,
                        state: false,
                    });
                    if (val.items) {
                        this.createStateColumns(arr, val.items);
                    }
                }
            }
            columnObj.ids = arrIds;
            columnObj.buttons = arrButtons;

            arr.push(columnObj);
        },
        addNewColumn(arr, obj) {
            arr.push(this.createNewColumn(obj));
        },
        deleteColumnsHandler(currentColumnInd) {
            this.columnsTest.splice(
                currentColumnInd + 1,
                this.columnsTest.length
            );
        },
        findIntersect(arr1, arr2) {
            return arr1.filter((val) => arr2.indexOf(val) !== -1);
        },
    },
    mounted() {
        this.addNewColumn(this.columnsTest, this.rootPermissionTitles);
        this.createStateColumns(this.columns, this.rootPermissionTitles);
    },
};
</script>

<style>
button {
    cursor: pointer;
}

.tree-wrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
}

.tree__button-back {
    align-self: flex-start;
    position: relative;
    border: none;
    background-color: #ffffff;
    color: #3f3ffe;
    padding: 10px;
    padding-left: 20px;
    font-size: 16px;
    margin-bottom: 24px;
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
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 0;
    margin-bottom: 40px;
    overflow: auto;
    padding: 10px;
    padding-bottom: 20px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 15%);
    border-radius: 5px;
}

@media (min-width: 500px) {
    .tree__list {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-start;
    }
}

.tree__title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    width: fit-content;
    background-color: #f3f5f6;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 24px;
}

.tree__button-save {
    align-self: flex-end;
    border: none;
    background-color: #162133;
    color: #fff;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 16px;
    border-radius: 4px;
}

.tree__button-save:active {
    opacity: 0.6;
}
</style>
