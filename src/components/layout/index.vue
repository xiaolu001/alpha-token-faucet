<template>
    <div class="uLayout">
        <slot name="header"></slot>
        <div class="scroll">
            <slot></slot>
        </div>
    </div>
</template>

<script setup></script>
<style lang="less" scoped>
.uLayout{
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: rgb(245 245 245);
    .scroll{
        flex: 1;
        overflow: auto;
        padding: 1rem;
        box-sizing: border-box;
    }
}
</style>