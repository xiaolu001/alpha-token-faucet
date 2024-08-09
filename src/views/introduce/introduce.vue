<template>
    <u-layout class="introduce">
        <template #header>
            <u-header :title="$t(`home.service[${key}]`)"> </u-header>
        </template>
        <div v-html="html"></div>
    </u-layout>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { getIntroduce } from "@/api"
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
const route = useRoute();
const html = ref('');
const types = {
    1: 'event',
    4: 't&c',
    5:'certificate',
    6:'faqs',
    7:'about',

}
onMounted(() => {
    init();
})
const key = computed(() => {
    return route.query.type;
})
const init = () => {
    getIntroduce().then(res => {

        html.value = res[types[key.value]];
    })
}
</script>
<style lang="less">
.introduce {
    img {
        max-width: 100%;
    }
}
</style>