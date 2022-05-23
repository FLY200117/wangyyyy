<template>
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style scoped>
    .tab-bar{
        width: 820px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>