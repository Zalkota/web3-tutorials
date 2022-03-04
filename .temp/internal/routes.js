/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "C:\\Users\\Olaga\\Projects\\Blockforge-Docs\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-680fa670",
    path: "/blockforge/PlotStaking.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-680fa670").then(next)
    },
  },
  {
    name: "v-23739550",
    path: "/blockforge/Plots.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-23739550").then(next)
    },
  },
  {
    name: "v-2010d598",
    path: "/blockforge/Project_Scope.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2010d598").then(next)
    },
  },
  {
    name: "v-7f91be20",
    path: "/blockforge/Renting_Battle_Pass.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7f91be20").then(next)
    },
  },
  {
    name: "v-0bd5f894",
    path: "/blockforge/Staking_Battle_Pass.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0bd5f894").then(next)
    },
  },
  {
    name: "v-530b300d",
    path: "/blockforge/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-530b300d").then(next)
    },
  },
  {
    path: "/blockforge/index.html",
    redirect: "/blockforge/"
  },
  {
    name: "v-3c5c3fa8",
    path: "/blockforge/battle-pass.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-3c5c3fa8").then(next)
    },
  },
  {
    name: "v-36c4f34e",
    path: "/blockforge/placeholder.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-36c4f34e").then(next)
    },
  },
  {
    name: "v-7a14c370",
    path: "/blockforge/welcome.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7a14c370").then(next)
    },
  },
  {
    name: "v-311a4f6a",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-311a4f6a").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]