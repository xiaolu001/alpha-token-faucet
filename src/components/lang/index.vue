<template>
    <van-popup v-model:show="state.show" position="right" closeable>
        <div class="box">
            <ul class="pt-20 text-center">
                <li :class="locale == 'en' ? 'active' : ''">
                    <span @click="chose('en')">🇺🇸 English</span>
                </li>
                <li :class="locale == 'fr' ? 'active' : ''"><span @click="chose('fr')">🇫🇷 Français</span></li>
                <li :class="locale == 'jp' ? 'active' : ''"><span @click="chose('jp')">🇯🇵 日本語</span></li>
                <li :class="locale == 'es' ? 'active' : ''"><span @click="chose('es')">🇪🇸 Español</span></li>
                <li :class="locale == 'se' ? 'active' : ''"><span @click="chose('se')">🇸🇪 Svenska</span></li>
                <li :class="locale == 'it' ? 'active' : ''"><span @click="chose('it')">🇮🇹 Italiano</span></li>
                <li :class="locale == 'de' ? 'active' : ''"><span @click="chose('de')">🇩🇪 Deutsch</span></li>
                <li :class="locale == 'nb' ? 'active' : ''"><span @click="chose('nb')">🇳🇴 Norsk</span></li>
                <li :class="locale == 'ru' ? 'active' : ''"><span @click="chose('ru')">🇷🇺 Русский</span></li>
                <li :class="locale == 'hu' ? 'active' : ''"><span @click="chose('hu')">🇭🇺 Magyar</span></li>
                <li :class="locale == 'pl' ? 'active' : ''"><span @click="chose('pl')">🇵🇱 Polski</span></li>
                <li :class="locale == 'sk' ? 'active' : ''"><span @click="chose('sk')">🇸🇰 Slovenčina</span></li>
            </ul>
        </div>
    </van-popup>
</template>



<script setup>
import { reactive } from "vue"
import { useI18n } from "vue-i18n"
const emits = defineEmits(['chose'])
const { locale } = useI18n();
const state = reactive({
    show: false
})
const chose = (key) => {
    locale.value = key;
    localStorage.setItem('lang', key);
    emits('chose');
    state.show = false;
}
const open = () => {
    state.show = true;
}
defineExpose({
    open
})
</script>
<style lang="less" scoped>
.box {
    padding-top: 5rem;
    min-width: 50vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: rgb(0, 0, 0);
    box-shadow: 0 0 2px #ffffff4d;

    ul {
        li {
            height: 3rem;
            font-size: 1.5rem;
            line-height: 2rem;
            text-align: center;
            color: #fff;

            &.active {
                color: #8e62dd;

            }
        }
    }
}
</style>