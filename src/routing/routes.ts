import {
  createRouter, createWebHistory
} from "vue-router"
import publicRoutes from './public'
import privateRoutes from './private'

import type { RouteRecordRaw } from "vue-router"


const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...privateRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
