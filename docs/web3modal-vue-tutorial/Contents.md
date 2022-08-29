---
title: WebModal-Vue Tutorial
pageClass: content-page-class-general
---

# How to Install Web3Modal-Vue

###### Published on August 23, 2022 · Updated on August 28, 2022

##### By [Dominic Mazzola](https://dominicmazzola.com)

##### Web3 Full Stack Developer



## Introduction
Web3Modal is an easy-to-use library to help developers add support for multiple providers in their apps with a simple customizable configuration.
By default Web3Modal Library supports injected providers like (Metamask, Dapper, Gnosis Safe, Frame, Web3 Browsers, etc) and WalletConnect, You can also easily configure the library to support Portis, Fortmatic, Squarelink, Torus, Authereum, D'CENT Wallet and Arkane.



:::tip  Links
[Completed Tutorial Code](https://github.com/Zalkota/web3ModalVue-Example)

[Web3modal for Vue](https://github.com/SmallRuralDog/web3modal-vue)

[Web3modal for React](https://github.com/WalletConnect/web3modal)


:::

## Prerequisites

```
npm install --save vuex

npm install --save @walletconnect/web3-provider
```


## Step 1 – Install Web3Modal
```
npm install --save web3modal-vue

# OR

yarn add web3modal-vue
```

## Step 2 – Import Web3Modal-Vue

Inside your project directory navigate to `/src/components`.

Create a component file called `connectWallet.vue`, type the following.

```js
<!-- connectWallet.vue -->

<template>

  <div>
    <web3-modal-vue
        ref="web3modal"
        :theme="theme"
        :provider-options="providerOptions"
        cache-provider
    />
  </div>

</template>

<script>

import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default {
  components: {

  },
  mixins: [],
  data() {

  },
  created() {

  },
  mounted() {  

  },
  methods: {

  }
}

</script>
```

We first defined the template and imported the web3-modal-vue component in from a Node Package Module called `Web3ModalVue`.
We also structured the VueJS lifecycle hooks and component objects. We will begin filling these in.


## Step 3 – Component Configuration

Within the export default block, type the following code into the `components: { }` block. This will signal to VueJS that we are requesting to use the Web3ModalVue component from the `web3modal-vue` package.

```js
components: {
    Web3ModalVue
},
```

Within the `data() { }` block, type the following code:

```js
// connectWallet.vue

data() {
    return {
        theme: 'light',
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: INFURA_ID,
                }
            }
        },
        number: 0,
        balance: 0,
    }   
},

```

Theme can be set to either `light` or `dark`.
Provider options informs Web3Modal-Vue what wallets to show the user when signing in. In this case, we are using the `WalletConnect` option, so we will need to add a valid infura API key.

It is considered bad practice to paste the API key directly onto the page, so we will instead import it from our environment file.
Type the following line of code to our local imports, above where we imported Web3ModalVue.

```
const INFURA_ID = process.env.INFURA_ID
```
:::danger Note
If you are using git, add the .env file to the .gitignore file in your project directory.

[Learn more here](https://git-scm.com/docs/gitignore)
:::


Inside the `methods: {}` block, type the following code.

```
connect() {
    this.$store.dispatch('connect')
},
```


```js
// connectWallet.vue

mounted() {  
    this.$nextTick(async () => {
        const web3modal = this.$refs.web3modal;
        this.$store.commit('setWeb3Modal', web3modal)
        if (web3modal.cachedProvider) {
            this.connect()
        }
    })
},
```

## Step 4 – Create .env file

In the base directory of your Vue Application, create a file called `.env`.

Type the following code, but replace “INFURA-ID” with your valid Infura API Key. [Obtain an Infura API keys](https://infura.io/)

```
INFURA_ID= <INFURA-ID>
```


## Step 5 – Configuring Vuex
### Description
Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

Install the following npm packages, we will use these later on.

``` 
npm install --save ethers
npm install --save web3
```

Create a folder called `store` inside the `src` folder.

Within the `store` folder, create a file called `index.js`.

Type the following code into `index.js`.

```js
// index.js

import Vue from 'vue'
import Vuex from 'vuex'
import web3ModalStore from "@/store/modules/web3Modal";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        web3Modal: web3ModalStore,
    }
})
```

Inside the store folder, create a folder called `modules`.

Create a file called `web3Modal.js` inside.

Type the following code within `web3Modal.js`

```js
// web3Modal.js

import {getLibrary} from "@/utils/web3";
import {ethers} from "ethers";
import {parseInt} from 'lodash'

const web3ModalStore = {
    state: {
        web3Modal: null,

        library: getLibrary(),
        active: false,
        account: null,
        chainId: 0,
    },
    mutations: {
        setWeb3Modal(state, web3Modal) {
            state.web3Modal = web3Modal
        },
        setLibrary(state, library) {
            state.library = library
        },
        setActive(state, active) {
            state.active = active
        },
        setAccount(state, account) {
            state.account = account.toLowerCase()
        },
        setChainId(state, chainId) {
            state.chainId = chainId
        }
    },
    actions: {
        async connect({state, commit, dispatch}) {
            const provider = await state.web3Modal.connect();

            const library = new ethers.providers.Web3Provider(provider)

            library.pollingInterval = 12000
            commit('setLibrary', library)

            const accounts = await library.listAccounts()
            if (accounts.length > 0) {
                commit('setAccount', accounts[0])
            }
            const network = await library.getNetwork()
            commit('setChainId', network.chainId)
            commit('setActive', true)

            provider.on("connect", async (info) => {
                let chainId = parseInt(info.chainId)
                commit('setChainId', chainId)
                console.log("connect", info)
            });

            provider.on("accountsChanged", async (accounts) => {
                if (accounts.length > 0) {
                    commit('setAccount', accounts[0])
                } else {
                    await dispatch('resetApp')
                }
                console.log("accountsChanged")
            });
            provider.on("chainChanged", async (chainId) => {
                chainId = parseInt(chainId)
                commit('setChainId', chainId)
                console.log("chainChanged", chainId)
            });

        },
        async resetApp({state, commit}) {
            try {
                await state.web3Modal.clearCachedProvider();
            } catch (error) {
                console.error(error)
            }
            commit('setAccount', null)
            commit('setActive', false)
            commit('setLibrary', getLibrary())
        },
    }
}

export default web3ModalStore;
```


Return to `connectWallet.vue` and import `web3Modal` from the mixins folder.

Type the following line of code to our local imports above where we imported `Web3ModalVue` and the `INFURA_ID`.

```js
import {web3Modal} from "./config/mixins";
```


Inside your `main.js` file in the base directory of your project, import and call `store`.

```js
// main.js

import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.use()
Vue.prototype.$store = store;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```



Create a JavaScript file with the following code called `web3.js` inside of `/src/utils/` 

```js
// web3.js

import {ethers} from 'ethers'
import web3 from 'web3'

const POLLING_INTERVAL = 12000
const RPC_URL = process.env.VUE_APP_RPC_URL
export const getLibrary = () => {
    const httpProvider = new web3.providers.HttpProvider(RPC_URL)
    const web3NoAccount = new ethers.providers.Web3Provider(httpProvider)
    web3NoAccount.pollingInterval = POLLING_INTERVAL;
    return web3NoAccount
}

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)
```

Import the `getLibrary` function into `web3Modal.js`

```js
// web3Modal.js

import {getLibrary} from "../../js/web3";
import @/utils/web3.js
```

## Step 6 – Try Connecting Web3 Wallet

Run the VueJS Application in the command prompt and visit `http://localhost:8080`
Click the `Connect` button.

The following module should appear.

![Modal Example](/images/modal_example.jpg)