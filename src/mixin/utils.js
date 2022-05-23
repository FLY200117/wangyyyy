import { ref,reactive,onMounted } from 'vue'

function MouseMovement(){
    const movement = reactive({w:window.pageXOffset,h:window.pageYOffset})
    onMounted(() =>{
        window.addEventListener("mousemove",function(event){
            movement.w = event.clientX
            movement.h = event.clientY
        })
    })
    

    return movement
}

export {MouseMovement}


export function timestampToTime(timestamp){
    if(timestamp === 0 || timestamp == null){
        return ''
    } else{
        let date = new Date(timestamp)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        return Y + M + D
    }
}
