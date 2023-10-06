<template>
    <li class="tree__item">
        <h3 class="tree__item-title">
            {{ column.title || `Заголовок ${keyNumber}` }}
        </h3>
        <div class="tree__item-buttons">
            <TreeItemButton
                v-for="(button, index) in buttons"
                @itemButtonClick="onItemButtonClick(index)"
                :name="button.name"
                :state="button.state"
                :key="index"
            ></TreeItemButton>
        </div>
    </li>
</template>

<script>
import TreeItemButton from "./TreeItemButton.vue";

export default {
    name: "TreeItem",
    components: { TreeItemButton },
    data() {
        return {
            buttons: Array,
        };
    },
    props: {
        index: Number,
        keyNumber: Number,
        column: Object,
        items: Array,
    },
    methods: {
        createButtons(state = false) {
            this.buttons = this.column.names.map((name) => {
                return {
                    name: name,
                    state: state,
                };
            });
        },
        onItemButtonClick(ind) {
            this.filterButtonsState(ind);
            this.buttons[ind].state
                ? this.addColumn(ind)
                : this.deleteColumns();
        },
        addColumn(ind) {
            if (this.items[ind]) {
                this.$emit("addColumn", [this.items[ind], this.index]);
            } else {
                if (this.column.ids) {
                    this.$emit("deleteColumns", this.index);
                }
            }
        },
        deleteColumns() {
            if (this.column.ids) {
                this.$emit("deleteColumns", this.index);
            }
        },
        filterButtonsState(ind) {
            this.buttons.filter((val, index) => {
                if (index === ind) {
                    val.state = !val.state;
                } else {
                    val.state = false;
                }
            });
        },
    },
    mounted() {
        this.createButtons();
    },
};
</script>

<style>
.tree__item {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
}

.tree__item-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 44px;
    vertical-align: middle;
}

.tree__item-buttons {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 4px;
}

.tree__item-buttons::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 1px;
    background-color: lightgrey;
    right: 0;
    top: 0;
}

.tree__item-button {
    position: relative;
    border: none;
    padding: 8px;
    font-size: 18px;
    min-width: 187px;
    width: max-content;
    min-height: 36px;
    text-align: start;
    padding-left: 36px;
    padding-right: 25px;
    background-color: #ffffff;
}

.tree__item-button::before {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    top: 6px;
    left: 8px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.29045 4.42274C2.42286 3.29063 3.33891 2.38738 4.48334 2.25948C5.28831 2.16951 6.1008 2.10387 6.91674 2.06256C6.94197 2.07187 6.9691 2.0761 6.99656 2.07469C9.19072 1.96299 11.3919 2.03499 13.5771 2.29059C14.7092 2.42299 15.6124 3.33899 15.7403 4.48339C15.8303 5.28862 15.896 6.10137 15.9373 6.91756C15.9281 6.94262 15.924 6.96952 15.9254 6.99674C16.0371 9.1909 15.9651 11.3921 15.7095 13.5773C15.6447 14.131 15.3925 14.6299 15.0179 15.0102C14.6366 15.3892 14.1346 15.6444 13.5771 15.7096C10.5359 16.0653 7.46372 16.0653 4.42256 15.7096C3.87261 15.6453 3.37666 15.396 2.99737 15.0255C2.61427 14.6434 2.35609 14.1385 2.29045 13.5773C1.93476 10.5361 1.93476 7.4639 2.29045 4.42274ZM1.43556 2.52385C2.07493 1.56582 3.12043 0.90246 4.31673 0.768759C7.40427 0.423679 10.5957 0.423679 13.6833 0.768759C14.3265 0.840649 14.9262 1.06568 15.4425 1.40732C15.4552 1.41577 15.4666 1.42542 15.4764 1.436C16.4342 2.0754 17.0974 3.12074 17.2311 4.31679C17.5761 7.40439 17.5761 10.5958 17.2311 13.6833C17.1277 14.6081 16.7079 15.4427 16.08 16.0693C15.4522 16.7032 14.6133 17.1273 13.6833 17.2313C10.5957 17.5763 7.40427 17.5763 4.31673 17.2313C3.3993 17.1287 2.57055 16.7147 1.94565 16.0951C1.30341 15.4657 0.873352 14.6208 0.768576 13.6833C0.423496 10.5958 0.423496 7.40439 0.768576 4.31679C0.840466 3.67359 1.0655 3.07389 1.40714 2.55759C1.41552 2.54492 1.42508 2.53367 1.43556 2.52385Z' fill='%23748797'/%3E%3C/svg%3E%0A");
}

.tree__item-button::after {
    content: "";
    position: absolute;
    width: 7px;
    height: 10px;
    right: 15px;
    top: 13px;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg width='7' height='10' viewBox='0 0 7 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.969668 0.469668C1.2626 0.176777 1.7374 0.176777 2.0303 0.469668L6.0303 4.4697C6.3232 4.7626 6.3232 5.2374 6.0303 5.5303L2.0303 9.5303C1.7374 9.8232 1.2626 9.8232 0.969668 9.5303C0.676777 9.2374 0.676777 8.7626 0.969668 8.4697L4.4393 5L0.969668 1.53033C0.676777 1.23744 0.676777 0.762558 0.969668 0.469668Z' fill='%2393A2AE'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
}

.tree__item-button--active {
    background-color: #162133;
    color: #ffffff;
}

.tree__item-button--active::before {
    background-image: url("data:image/svg+xml,%3Csvg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.29045 4.42274C2.42286 3.29063 3.33891 2.38738 4.48334 2.25948C7.46017 1.92677 10.5398 1.92677 13.5167 2.25948C13.8386 2.29545 14.1424 2.39277 14.4158 2.53926C14.4976 2.58313 14.5995 2.57208 14.6652 2.50641L15.4681 1.70353C15.5542 1.61738 15.5441 1.47454 15.4425 1.40732C14.9262 1.06568 14.3265 0.840649 13.6833 0.768759C10.5957 0.423679 7.40427 0.423679 4.31673 0.768759C2.49035 0.972879 1.01545 2.41153 0.800612 4.24849C0.431372 7.4054 0.431372 10.5946 0.800612 13.7515C1.01545 15.5885 2.49035 17.0271 4.31673 17.2313C7.40427 17.5763 10.5957 17.5763 13.6833 17.2313C15.5096 17.0271 16.9845 15.5885 17.1994 13.7515C17.5032 11.1544 17.557 8.5353 17.361 5.93042C17.3482 5.76086 17.1428 5.68568 17.0225 5.80591L15.9838 6.84469C15.9436 6.88481 15.9225 6.94008 15.9254 6.99674C16.0371 9.1909 15.9651 11.3921 15.7095 13.5773C15.5771 14.7094 14.6611 15.6126 13.5167 15.7405C10.5398 16.0732 7.46017 16.0732 4.48334 15.7405C3.33891 15.6126 2.42286 14.7094 2.29045 13.5773C1.93476 10.5361 1.93476 7.4639 2.29045 4.42274ZM18.0303 1.96968C18.3232 2.26257 18.3232 2.73744 18.0303 3.03034L9.0303 12.0303C8.7374 12.3232 8.2626 12.3232 7.9697 12.0303L4.96967 9.0303C4.67678 8.7374 4.67678 8.2626 4.96967 7.9697C5.26256 7.6768 5.73744 7.6768 6.03033 7.9697L8.5 10.4393L16.9697 1.96968C17.2626 1.67677 17.7374 1.67677 18.0303 1.96968Z' fill='%231DD0A8'/%3E%3C/svg%3E%0A");
}
</style>
