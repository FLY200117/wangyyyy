import axios from 'axios'
import { ref,reactive,onMounted } from 'vue'

//获取首页轮播图
export function getBanner(type=0){
    return axios.get(`http://localhost:3000/banner?type=${type}`)
}

//获取热门歌单
export function gethotlist(){
    return axios.get(`http://localhost:3000/playlist/hot`)
}

//
export function getdata(limit=8){
    return axios.get(`http://localhost:3000/personalized?limit=${limit}`)
}

//获取榜单
export function getTopList(){
    return axios.get(`http://localhost:3000/toplist`)
}

//获取歌曲
export function getSong(id){
    return axios.get(`http://localhost:3000/song/url?id=${id}`)
}

// 获取数字专辑（新碟上架）
export function getAlbum(limit=10){
    return axios.get(`http://localhost:3000/album/list?limit=${limit}`)
}

// 获取热门歌手
export function getHotArtists(limit=5){
    return axios.get(`http://localhost:3000/top/artists?limit=${limit}`)
}

// 获取电台新人榜
export function getNewComer(limit=5){
    return axios.get(`http://localhost:3000/dj/toplist/newcomer?limit=${limit}`)
}

// 
// export function getTopListArtist(type){
//     return axios.get(`http://localhost:3000/top/list?type=${type}`)
// }

// 获取歌单所有歌曲
export function getAllSong(id,limit=10){
    return axios.get(`http://localhost:3000/playlist/track/all?id=${id}&limit=${limit}`)
}

export function getPlayListDetail(id){
    return axios.get(`http://localhost:3000/playlist/detail?id=${id}`)
}

export function getSongDetail(id){
    return axios.get(`http://localhost:3000/song/detail?id=${id}`)
}

export function getArtistDetail(id){
    return axios.get(`http://localhost:3000/artist/detail?id=${id}`)
}
