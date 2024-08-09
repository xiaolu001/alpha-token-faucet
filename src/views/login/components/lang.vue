<template>
    <div class="lang">
        <img src="@/assets/images/lang.png" @click="open" />
        <u-lang ref="lang" @chose="chose" />
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import uLang from "@/components/lang/index.vue"
const lang = ref();
const state = reactive({
    show: false
})
const open = () => {
    lang.value.open();
}
const chose = (key) => {
   
    state.show = false;
}

</script>
<style lang="less">
.lang {
    &>img {
        width: 2.5rem;

    }

   
}
</style>