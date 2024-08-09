<template>
    <u-layout class="profile">
        <template #header>
            <u-header :title="$t('profileItem.title')" url="/my"> </u-header>
        </template>
        <div class="items">
            <router-link to="/username" class="item" >
                <div>{{ $t('profileItem.menu[0]') }}</div>
                <van-icon name="arrow" />
            </router-link>
            <div class="item">
                <div>{{ $t('profileItem.menu[1]') }}</div>
                <div class="name">测试2</div>
            </div>
        </div>
        <div class="items mar">
            <router-link to="/password/username" class="item">
                <div>{{ $t('profileItem.menu[2]') }}</div>
                <van-icon name="arrow" />
            </router-link>
            <router-link to="/password/transaction"  class="item">
                <div>{{ $t('profileItem.menu[3]') }}</div>
                <van-icon name="arrow" />
            </router-link>
        </div>
    </u-layout>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
</script>
<style lang="less">
.profile {
    .items {
        border-radius: .25rem;
        background-color: #fff;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        &.mar{
            margin-top: 1rem;
        }
        .item{
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.5rem;
            color: #000;
            &:first-child{
                border-bottom:1px solid rgb(221 221 221);
            }
            .name{
                font-size: .875rem;
                line-height: 1.25rem;
            }
        }
    }
}
</style>