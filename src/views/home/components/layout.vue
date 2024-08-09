<template>
    <div class="layout">
        <slot></slot>
    </div>
</template>

<style lang="less">
.layout {
    background-image: url('@/assets/images/bg-home.png');
    background-size: 100% 360px;
    min-height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-color: rgb(245, 245, 245);
    overflow-y: auto;
}
</style>