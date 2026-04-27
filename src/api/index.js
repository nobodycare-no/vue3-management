import axios from '../utils/request'
import base from './base'

const api = {
    postLogin(params) {
        return axios.post(base.login, params)
    },

    getRouter(params) {
        return axios.get(base.router, {
            params
        })
    },

    // 获取折线图数据
    getLine(){
        return axios.get(base.line)
    },

    getMap() {
        return axios.get(
            'https://geojson.cn/api/china/1.6.3/china.json'
        )
    },

    getProjectInfo(params) {
        return axios.get(base.projectInfo, {params})
    },

    getSearch(params) {
        return axios.get(base.search, {params})
    },

    getTotalPage() {
        return axios.get(base.totalpage)
    },

    addProject(params) {
        return axios.get(base.addProject, {params})
    },

    delProject(params) {
        return axios.get(base.delProject, {params})
    },

    editProject(params){
        return axios.get(base.editProject, {params})
    },

    updateProject(id, params){
        return axios.put(base.updateProject + id, params)
    },

    getTunnelList(){
        return axios.get(base.tunnelList)
    },

    getTunnelListChild(params){
        return axios.get(base.tunnelListChild, {params})
    },

    getTunnelContent(params){
        return axios.get(base.tunnelContent, {params})
    },

    updateTunnelContent(params){
        return axios.get(base.tunnelContentUpdate, {params})
    },

    getPDFView(params){
        return axios.get(base.pdfView, {params})
    },

    getUserInfo(){
        return axios.get(base.userInfo)
    },

    getUserSearch(params) {
        return axios.get(base.userSearch, {params})
    },

    getAddUser(params) {
        return axios.get(base.addUser, {params})
    },

    getDelUser(params) {
        return axios.get(base.delUser, {params})
    },

    getUserPreview(params) {
        return axios.get(base.previewUser, {params})
    },

    getUpdateUser(params) {
        return axios.get(base.updateUser, {params})
    }
}

export default api