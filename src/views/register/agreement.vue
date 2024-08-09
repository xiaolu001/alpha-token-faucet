<template>
    <div class="areement">
        <u-header :title="$t('system.terms')" url="/register"></u-header>
        <div class="content" v-html="html"></div>
    </div>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import { onMounted, ref } from "vue"
import { getIntroduce } from "@/api"
const html = ref('');
onMounted(() => {
    init();
})
const init = () => {
    getIntroduce().then(res => {
        html.value = res.terms_and_conditions;
    })
}
</script>
<style lang="less">
.areement {
    .content {
        padding: 1rem;
        color: #000;
    }
}
</style>