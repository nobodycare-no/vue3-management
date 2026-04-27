<template>
    <div class="drawer">
        <el-button type="primary" @click="drawer = true" class="drawer-btn"><el-icon>
                <Tools />
            </el-icon></el-button>

        <el-drawer v-model="drawer" title="工具柜">
            <span>logo显示与隐藏</span>
            <el-switch v-model="logoStore.logoStore" style="margin-left: 24px" inline-prompt :active-icon="Check"
                :inactive-icon="Close" />
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import { useLogoStore } from '@/stores/logoStore'
const drawer = ref(false)
const logoStore = useLogoStore()


</script>

<style scoped>
.drawer-btn {
    position: fixed;
    right: 0;
    top: 300px;
    z-index: 1000;
}
</style>