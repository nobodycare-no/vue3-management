<template>
    <div class="card">
        <div class="box">
            <el-icon class="box-icon" style="color:#40c9c6"><Grid /></el-icon>
            <span class="box-title">{{$t('message.tunnelNumbers')}}</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#36a3f7"><CircleCheck /></el-icon>
            <span class="box-title">检验合格：805个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#f4516c"><Clock /></el-icon>
            <span class="box-title">正在施工：302个</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#34bfa3"><Tickets /></el-icon>
            <span class="box-title">地址预报：5000个</span>
        </div>
    </div>
    <div id="line"></div>
    <div class="charts">
        <div id="charts-radar"></div>
        <div id="charts-pie"></div>
        <div id="charts-bar"></div>
    </div>
</template>

<script setup>
import {onMounted, getCurrentInstance} from 'vue'
import api from '@/api/index.js'

const {proxy} = getCurrentInstance()

onMounted(() => {
    api.getLine().then(res=>{
        // console.log(res.data.lineData.lineData);
        proxy.$line('line',res.data.lineData.lineData)
        proxy.$radar('charts-radar')
        proxy.$pie('charts-pie')
        proxy.$bar('charts-bar')
    })
})

</script>

<style scoped>
.card {
    display: flex;
}

.card .box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 130px;
    background-color: #fff;
    margin: 16px;
    padding: 20px;
    box-sizing: border-box;
}

.box .box-icon {
    font-size: 80px;
    flex-shrink: 0;
    line-height: 1;
}

.box-title {
    font-size: 20px;
    line-height: 1.3;
    text-align: right;
    flex-shrink: 1;
    min-width: 0;
}

.box:nth-child(4){
    margin-right: 11px;
}

#line {
    box-sizing: border-box;
    width: calc(100% - 16px - 11px);
    height: 300px;
    background-color: #fff;
    margin-left: 16px;
    margin-right: 11px;
}

.charts {
    display: flex;
}

.charts div {
    flex: 1;
    background-color: #fff;
    height: 500px;
    align-items: center;
    justify-content: space-between;
    margin: 16px;
    padding: 10px;
    box-sizing: border-box;
}

.charts div:nth-child(3){
    margin-right: 11px;
}

</style>