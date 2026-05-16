import Home from '@/pages/home.vue'
import Call from '@/pages/call.vue'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/call',
        name: 'call',
        component: Call,
    },
]

export default routes
