<template>
    <div class="tunnel-page">
        <aside class="tunnel-aside">
            <h3 class="tunnel-aside__title">隧道目录</h3>
            <el-tree
                class="tunnel-tree"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :load="loadNode"
                lazy
            />
        </aside>

        <main class="tunnel-main">
            <div class="tunnel-main__head">
                <span class="tunnel-main__title">内容列表</span>
                <span class="tunnel-main__hint">在左侧选择节点后查看</span>
            </div>
            <el-table
                :data="tunnelContent.data"
                class="tunnel-table"
                border
                stripe
                style="width: 100%"
                :header-cell-style="tableHeaderStyle"
            >
                <el-table-column prop="id" label="序号" width="100" />
                <el-table-column prop="tunnelname" label="名字" min-width="140" />
                <el-table-column prop="imagename" label="图名" min-width="160" />
                <el-table-column prop="num" label="数量" width="100" />
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="primary" link size="small"
                            @click="handlePreview(scope.$index, scope.row)">预览</el-button>
                        <el-button type="success" link size="small"
                            @click="handleUpload(scope.$index, scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </main>

        <el-dialog v-model="uploadVisible" title="上传文件" width="480px" align-center destroy-on-close>
            <el-upload
                class="tunnel-upload"
                action="http://localhost:3000/api/upload"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :on-success="handlePDFSuccess"
                drag
            >
                <el-icon class="tunnel-upload__icon"><UploadFilled /></el-icon>
                <div class="tunnel-upload__text">将文件拖到此处，或点击选择</div>
                <template #tip>
                    <p class="tunnel-upload__tip">单次最多 3 个文件</p>
                </template>
            </el-upload>
            <template #footer>
                <div class="tunnel-dialog-footer">
                    <el-button @click="uploadVisible = false">关闭</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>

import { reactive, ref } from 'vue'
import api from '@/api/index.js'
import { useRouter } from 'vue-router'
import { UploadFilled } from '@element-plus/icons-vue'

const tableHeaderStyle = () => ({
    background: '#f5f7fa',
    color: '#606266',
    fontWeight: 600,
})

const uploadVisible = ref(false)

const tunnelContent = reactive({
    data: []
})

const currentID = ref(0)

const router = useRouter()

const loadNode = (node, resolve) => {
    if (node.level == 0) {
        api.getTunnelList().then(res => {
            if (res.data.status == 200) {
                return resolve(res.data.result)
            } else {
                return resolve([])
            }
        })

    }

    if (node.level == 1) {
        api.getTunnelListChild({ cid: node.data.cid }).then(res => {
            if (res.data.status == 200) {
                return resolve(res.data.result)
            } else {
                return resolve([])
            }
        })
    }

    if (node.level > 1) {
        return resolve([])
    }

}

const defaultProps = {
    children: 'children',
    label: 'name'
}

const handleNodeClick = (data) => {
    api.getTunnelContent({ content: data.content }).then(res => {
        if (res.data.status == 200) {
            tunnelContent.data = res.data.result
        } else {
            tunnelContent.data = []
        }
    })
}

const handlePreview = (index, row) => {
    router.push('/pdf/' + row.id)

}

const handleUpload = (index, row) => {
    uploadVisible.value = true
    currentID.value = row.id

}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`
  )
}

const handlePDFSuccess = (response, uploadFile) => {
    console.log(response, uploadFile)
    api.updateTunnelContent({id:currentID.value, urlName:response.url.substr(7)}).then(res => {
        if(res.data.status == 200){
            ElMessage.success(res.data.msg)
        }else{
            ElMessage.error(res.data.msg)
        }
    }).catch(error => {
        console.log(error)
    })
}

</script>

<style scoped>
.tunnel-page {
    display: flex;
    gap: 16px;
    min-height: calc(100vh - 120px);
    padding: 16px;
    box-sizing: border-box;
    background: #f0f2f5;
}

.tunnel-aside {
    width: 280px;
    flex-shrink: 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    padding: 16px;
    box-sizing: border-box;
}

.tunnel-aside__title {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 600;
    color: #303133;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}

.tunnel-tree {
    max-height: calc(100vh - 200px);
    overflow: auto;
}

.tunnel-main {
    flex: 1;
    min-width: 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    padding: 16px;
    box-sizing: border-box;
}

.tunnel-main__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}

.tunnel-main__title {
    font-size: 15px;
    font-weight: 600;
    color: #303133;
}

.tunnel-main__hint {
    font-size: 12px;
    color: #909399;
}

.tunnel-table {
    border-radius: 4px;
    overflow: hidden;
}

.tunnel-upload {
    width: 100%;
}

.tunnel-upload__icon {
    font-size: 48px;
    color: #c0c4cc;
    margin-bottom: 8px;
}

.tunnel-upload :deep(.el-upload-dragger) {
    width: 100%;
    padding: 24px 16px;
}

.tunnel-upload__text {
    font-size: 14px;
    color: #606266;
}

.tunnel-upload__tip {
    margin: 10px 0 0;
    font-size: 12px;
    color: #909399;
    text-align: center;
}

.tunnel-dialog-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
