import {defineStore} from 'pinia'

export const useLogoStore = defineStore('logo', {
    state: () => {
        return{
            logoStore: true
        }
    },
    persist: {
        key: 'logo',
        storage: localStorage,
    },
})