import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('views/home/Home.vue')
const PlayList = () => import('views/playlist/PlayList.vue')
const toplist = () => import('views/toplist/TopList.vue')
const DjRadio = () => import('views/djradio/DjRadio.vue')
const Artist = () => import('views/artist/Artist.vue')
const Album = () => import('views/album/Album.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    // children: [
    //   {
    //     path: 'toplist',
    //     component: toplist
    //   }
    // ]
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlayList
  },
  {
    path: '/toplist',
    component: toplist
  },
  {
    path: '/djradio',
    name: 'djradio',
    component: DjRadio
  },
  {
    path: '/artist',
    name: 'artist',
    component: Artist
  },
  {
    path: '/album',
    name: 'album',
    component: Album
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
