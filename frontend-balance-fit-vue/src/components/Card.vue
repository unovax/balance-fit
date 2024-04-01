<template>
    <div class="bg-white shadow-md rounded-md p-4 flex items-center space-x-4 w-full">
        <div class="flex-1">
            <img :src="item.img" class="w-auto max-w-1/2 rounded-md" />
            <div class="flex flex-col w-full items-center">
                <h2 class="text-xl font-bold">{{ item.name }}</h2>
                <p class="text-gray-500">{{ item.description }}</p>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-2 w-1/2">
            <div v-for="(feature, key) in item.features" :key="feature" class="bg-gray-100 p-2 flex justify-between space-x-2 rounded-md">
                <h3 class="text-gray-500">{{ key }}</h3>
                <p>{{ feature }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    }
 };
</script>