<template>
    <div class="bottom-audio" v-show="true">
        <div class="audio-icon">
            <div class="left-icon">
                <el-icon :size="30"><caret-left /></el-icon>
            </div>
            <div class="center-icon" @click="changeStatus">
                <el-icon :size="30" v-show="Playing">
                    <video-play />
                </el-icon>
                <el-icon :size="30" v-show="!Playing">
                    <video-pause />
                </el-icon>
            </div>
            <div class="right-icon">
                <el-icon :size="30"><caret-right /></el-icon>
            </div>
        </div>
        <div class="audio">
            <img :src="playlist[playCurrentIndex].picUrl" alt="">
            <div class="audio-box">
                <div class="audio-message">
                    <div class="title">{{playlist[playCurrentIndex].name}}</div>
                    <div class="author">{{playlist[playCurrentIndex].author}}</div>
                </div>
                <div class="music-play">
                    <div class="music-bar" ref="content">
                        <div class="music-bar-rdy" ref="rdy" @mousedown="MusicBarDown"></div>
                        <div class="music-bar-rxt" ref="rxt" @mousedown="MusicBarDown">
                            <div 
                            class="music-bar-btn" 
                            ref="bar-btn"
                            @mousedown="MusicBarBtnDown"
                            ></div>
                        </div>
                    </div>
                    <span class="music-time">{{currentDuration}}/{{duration}}</span>
                </div>
            </div>
        </div>
        <div class="audio-right-icon" @click="ChangeShowSound" ref="SoundIcon">
            <el-icon :size="30"><Service /></el-icon>
        </div>
        <div class="music-sound-control" v-show="ShowSound" ref="SoundControl">
            <div class="sound-rdy" ></div>
            <div class="sound-rxt" ref="SoundRxt">
                <div class="sound-btn" @mousedown="SoundBtnDown" ref="SoundBtn"></div>
            </div>
        </div>
        <audio 
        :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
        ref="audio"
        @canplay="canplaysong"
        @timeupdate="onTimeupdate"
        @ended="audioEnd"></audio>
    </div>
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from 'vue'
import {mapState,mapMutations,useStore} from 'vuex'


export default {
    name: 'BottomAudio',
    props:{
        IsShow:Boolean
    },
    setup(props){
        const ctx = getCurrentInstance()
        const store = useStore()
        const ShowIcon = ref(true)
        const ShowSound = ref(false)
        const Playing = ref(false)
        const currentDuration = ref("00:00")
        const duration = ref("00:00")
        

        // 获取当前歌曲的播放时间
        const onTimeupdate = () => {
            let targetCurrentDurationM = "00"
            let targetCurrentDurationS = "00"
            let targetCurrentDuration = ctx.refs.audio.currentTime.toFixed(0)

            if(targetCurrentDuration > 60) {
                targetCurrentDurationM = String(parseInt(targetCurrentDuration / 60))
                targetCurrentDurationS = String(parseInt(targetCurrentDuration % 60))
            }else{
                targetCurrentDurationM = "00"
                if(targetCurrentDuration < 10){
                    targetCurrentDurationS = "0" + String(targetCurrentDuration)
                }else{
                    targetCurrentDurationS = String(targetCurrentDuration)
                }
            }

            targetCurrentDuration = targetCurrentDurationM + ":" + targetCurrentDurationS
            currentDuration.value = targetCurrentDuration
        }

        // 改变播放状态
        const changeStatus = () => {
            
            if(ctx.refs.audio.paused){
                ctx.refs.audio.play()
                
            }else{
                ctx.refs.audio.pause()
            }
            console.log([ctx.refs.audio])
            Playing.value = !Playing.value
        }


        

        // 该方法会在歌曲加载完后自动回调
        const canplaysong = () => {
            let targetDurationM = "00"
            let targetDurationS = "00"

            let targetDuration = ctx.refs.audio.duration.toFixed(0)

            // 对目标Duration分钟的设置
            if(targetDuration > 60){
                targetDurationM = String(parseInt((targetDuration / 60)))
            }else{
                targetDurationM = "00"
            }

            // 对目标Duration秒钟的设置
            if((targetDuration % 60) < 10){
                targetDurationS = "0" +  String(targetDuration % 60)
            }else{
                targetDurationS = String(targetDuration % 60)
            }

            targetDuration = targetDurationM + ":" + targetDurationS
            duration.value = targetDuration


        }

        const audioEnd = () => {
            Playing.value = false
        }


        const MusicBarDown = (e) => {
            const rxt = ctx.refs.rxt
            const rdy = ctx.refs.rdy
            const content = ctx.refs.content
            let leftX = e.clientX - content.offsetLeft
            if(leftX <= 15){
                leftX = 15
            }
            rxt.style.width = leftX + "px"
            ctx.refs.audio.currentTime = 50
            if(Playing){
                
            }
            console.log(leftX)

        }

        const MusicBarBtnDown = (e) => {
            const rxt = ctx.refs.rxt
            const content = ctx.refs.content
            document.onmousemove = function(e){
                let leftX = e.clientX - content.offsetLeft
                if(leftX <= 15){
                    leftX = 15
                }else if(leftX >= 400){
                    leftX = 400
                }
                rxt.style.width = leftX + "px"
                
            }

            document.onmouseup = (e) => {
                const times = 400 / (parseInt(ctx.refs.audio.duration.toFixed(0)))
                let leftX = e.clientX - content.offsetLeft
                if(leftX <= 15){
                    leftX = 15
                }else if(leftX >= 400){
                    leftX = 400
                }

                if(ctx.refs.audio.paused){
                    ctx.refs.audio.play()
                }

                ctx.refs.audio.currentTime = (leftX / times)
                console.log(leftX/times)
                document.onmousemove = null
                document.onmouseup = null
            }
        }

        const MusicBarAutMove = () => {
            const rxt = ctx.refs.rxt
            let currentTime = parseInt(ctx.refs.audio.currentTime.toFixed(0))
            let duration = parseInt(ctx.refs.audio.duration.toFixed(0))
            const times = 400 / duration
            rxt.style.width = (currentTime * times) + 5 + "px"
        }

        const SoundBtnDown = (e) => {
            
            const SoundRxt = ctx.refs.SoundRxt
            
            document.onmousemove = function(e){
                let leftY = e.clientY - 890
                leftY = leftY * -1
                
                if(leftY <= 15){
                    leftY = 15
                }else if(leftY >= 80){
                    leftY = 80
                }
                ctx.refs.audio.volume = ( leftY-15 ) / 100
                SoundRxt.style.height = leftY + "px"
                // console.log(leftY)
            }


            document.onmouseup = function(){
                document.onmousemove = null
                document.onmouseup = null
            }
        }

        const ChangeShowSound = () => {
            ShowSound.value  = !ShowSound.value
            // console.log(ShowSound.value)
            const SoundIcon = ctx.refs.SoundIcon
            const SoundControl = ctx.refs.SoundControl
            SoundControl.style.left = SoundIcon.offsetLeft + 15 + "px"
        }

        watch(currentDuration,() => {
            MusicBarAutMove()
        })

        return {
            ShowIcon,
            currentDuration,
            duration,
            Playing,
            ShowSound,
            changeStatus,
            canplaysong,
            onTimeupdate,
            audioEnd,
            MusicBarBtnDown,
            MusicBarDown,
            SoundBtnDown,
            ChangeShowSound,
        }
    },
    computed:{
        ...mapState(['playlist','playCurrentIndex'])
    }
}
</script>

<style scoped   >
    .bottom-audio{
        display: flex;
        position: fixed;
        zoom: 1;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        background-color: #333;
    }   
    .audio-icon{
        display: flex;
        margin-left: 20%;
    }
    .left-icon:hover,.center-icon:hover,.right-icon:hover,.audio-right-icon:hover{
        color: #f4f4f4;
    }
    .left-icon,.right-icon,.center-icon{
        display: flex;
        align-items: center;
    }
    .audio{
        display: flex;
        margin-left: 20px;
    }
    .audio img{
        margin:8px 12px 8px 8px;
    }
    .audio-box{
        display: flex;
        
        flex-direction: column;
    }
    .audio-message{
        display: flex;
    }
    .title{
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #e8e8e8;
        font-size: 12px;
    }
    .author{
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #9b9b9b;
        font-size: 12px;
        margin: 0 0 0 15px;
    }
    .music-play{
        display: flex;
        height: 20px;
    }
    .music-bar{
        width: 400px;
        position: relative;
    }
    .music-bar-rdy{
        position: absolute;
        width: 400px;
        height: 15px;
        background-color: #9b9b9b;
        border-radius: 15px;
        
    }
    .music-bar-rxt{
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: brown;
        border-radius: 15px;
    }
    .music-bar-btn{
        float: right;
        width: 15px;
        height: 15px;
        background-color: antiquewhite;
        border-radius: 50%;
    }
    .music-time{
        font-size: 14px;
        margin-left: 10px;
    }
    .audio-right-icon{
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .music-sound-control{
        position: absolute;
        height: 100px;
        width: 30px;
        
        bottom: 50px;
        background-color: #333;
    }
    .sound-rdy{
        position: absolute;
        height: 80px;
        width: 15px;
        background-color: #9b9b9b;
        border-radius: 20px;
        left: 7.5px;
        top: 10px;
    }
    .sound-rxt{
        position: absolute;
        height: 80px;
        width: 15px;
        border-radius: 20px;
        background-color: brown;
        left: 7.5px;
        bottom: 10px;
    }
    .sound-btn{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: antiquewhite ;
    }
</style>