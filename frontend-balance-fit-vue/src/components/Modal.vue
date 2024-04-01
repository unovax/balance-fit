<!-- Modal.vue -->

<template>
    <div>
        <div v-on:click="closeModal" v-if="showModal" class="modal-overlay" >
        </div>
        <div :class="showModal ? 'modal' : 'modal-hidden'">
            <div class="modal-header">
                <slot name="header"></slot>
                <CloseIcon @click="closeModal" />
            </div>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
  
<script>
import CloseIcon from "./Icons/Close.vue";
export default {
    emits: ['close'],
    components: {
        CloseIcon,
    },  
    props: {
        showing: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            showModal: false,
        };
    },
    mounted() {
        this.showModal = this.showing;
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
    watch: {
        showing() {
            this.showModal = this.showing;
        },
    },
};
</script>