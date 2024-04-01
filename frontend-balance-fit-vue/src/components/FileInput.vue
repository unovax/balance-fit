<template>
    <div class="w-full h-[60px] rounded-2xl border border-dashed border-gray-500 bg-black bg-opacity-30">
        <label :for="input_id" class="w-full h-full flex items-center justify-center overflow-hidden">
            <img class="w-full z-0 opacity-30" v-if="url_img" :src="url_img" alt="">
            <UploadIcon class="text-white z-20 absolute"/>       
        </label>
        <input 
            :ref="input_id"
            :id="input_id"
            type="file"
            class="hidden"
            :placeholder="placeholder" 
            @change="uploadFile($event)"
        />
    </div>
</template>

<script>
import UploadIcon from './Icons/Upload.vue';
export default {
    components: {
        UploadIcon
    },
    props: {
        label: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        error: {
            type: String,
            default: '',
        },
        input_id: {
            type: String,
            required: true,
        },
        img: {
            type: [Object, String],
            required: false,
        },
    },
    data() {
        return {
            url_img: null,
        };
    },
    watch: {
        img() {
            if(this.img === null) this.url_img = null;
            else if(this.img.constructor === String) this.url_img = this.img;
            else if(this.img.constructor === File) this.url_img = URL.createObjectURL(this.img);
        },
    },
    methods: {
        uploadFile(event) {
            const file = event.target.files[0];

            if (file) {
                this.$emit('setFile', event);
                this.$refs[this.input_id].value = '';
            }
        }
    },
};
</script>
