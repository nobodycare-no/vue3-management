import {defineStore} from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            token:'',
            username: '',
            permission: ''
        }
    },
    persist: {
        key: 'login',
        storage: localStorage,
    },
})