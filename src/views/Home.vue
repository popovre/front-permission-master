<template>

    <button @click="createPermission">create</button>

</template>

<script>
    import API from "@/api/api";
    import { mapActions } from 'vuex';

    export default {
        name: 'Home',
        data() {
            return {
                modalData: null,
            }
        },
        methods: {
            ...mapActions(['modalAdd']),
            getTemplates() {
                API.getTemplates().then((data) => this.modalData = data)
            },
            createPermission() {
                API.createPermission();
                this.modalAdd(this.modalData);
            }
        },
        mounted() {
            this.getTemplates()
        }
    }
</script>
