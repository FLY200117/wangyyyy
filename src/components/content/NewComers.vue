<template>
    <div class="newcomer"></div>
</template>

<script>
import { getNewComer ,getHotDj } from 'network/index'
import { onMounted } from '@vue/runtime-core'
export default {
    name: "NewComer",
    setup(){
        onMounted(async() => {
            let res = await getNewComer()
            console.log(res)
        })
    }
}
</script>

<style>

</style>