<template>
    <header>
        <router-link class="logo" to="/">
            <!-- <img src="@/assets/images/logo-home.png" alt="logo"> -->
            <img :src="store.state.black_logo" />
        </router-link>
        <router-link to="/notice" class="notifications" v-if="right">
            <img src="@/assets/images/Notifications.svg" alt="logo">
            </img>
        </router-link>
    </header>
</template>

<script setup>
import { useStore } from "vuex"
const store = useStore();
const props = defineProps({
    right: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="less">
header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        display: block;

        img {
            max-height: 32px;
        }
    }

    .notifications {
        display: block;

        img {
            width: 3rem;
            height: 1.5rem;
        }
    }
}
</style>