<template>
    <div class="service">
        <img src="@/assets/images/service.png" @click="open"/>
        <u-service ref="service"></u-service>
    </div>
</template>

<script setup>
import { ref } from "vue"
import uService from "@/components/service/index.vue"
const service = ref();
const open =()=>{
    service.value.open();
}
</script>
<style lang="less">
.service{
    width: 2.5rem;
    img{
        width: 2.5rem;
    }
    
}
</style>