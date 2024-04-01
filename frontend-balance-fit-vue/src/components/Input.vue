<template>
    <div>
        <label 
            :for="input_id"
        >{{ label }}</label>
        <input 
            :id="input_id"
            :value="modelValue" 
            :placeholder="placeholder" 
            @change="$emit('update:modelValue', $event.target.value)"
        />
        <span v-if="error" class="error-message">{{ error }}</span>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
        },
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
    },
};
</script>
