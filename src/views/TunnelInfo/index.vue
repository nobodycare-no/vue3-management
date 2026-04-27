<template>
    <div class="container">
        <div class="list"><el-tree :props="defaultProps" @node-click="handleNodeClick" :load="loadNode" lazy /></div>
        <div class="content"><el-table :data="tunnelContent.data" style="width: 100%">
                <el-table-column prop="id" label="序号" width="180" />
                <el-table-column prop="tunnelname" label="名字" width="180" />
                <el-table-column prop="imagename" label="图名" />
                <el-table-column prop="num" label="数量" />
                <el-table-column fixed="right" label="操作" min-width="60">
                    <template #default="scope">
                        <el-button type="primary" size="small"
                            @click="handlePreview(scope.$index, scope.row)">预览</el-button>
                        <el-button type="success" size="small"
                            @click="handleUpload(scope.$index, scope.row)">上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="uploadVisible" title="上传文件" width="500" center destroy-on-close>
            <el-upload class="upload-demo"
                action="http://localhost:3000/api/upload" multiple
                :limit="3"
                :on-exceed="handleExceed"
                :on-success="handlePDFSuccess">
                <el-button type="primary">Click to upload</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        可以上传任意文件，但一次最多不能超过三个
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消上传</el-button>
                    <el-button type="primary" @click="uploadVisible = false">
                        确认上传
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>

import { reactive, ref } from 'vue'
import api from '@/api/index.js'
import {useRouter} from 'vue-router'

const uploadVisible = ref(false)

const tunnelContent = reactive({
    data: []
})

const currentID = ref(0)

const router = useRouter()

// const data = ref([
//     {
//         label: 'level 1',
//         children: [
//             {
//                 label: 'level 1-1',
//                 children: [{
//                     label: 'level 1-1-1',
//                     label: 'level 1-1-2'
//                 }]
//             },
//             {
//                 label: 'level 1-2'
//             }
//         ],
//     },
//     {
//         label: 'level 2',
//         children: [
//             {
//                 label: 'level 2-1',
//                 children: [{
//                     label: 'level 2-1-1'
//                 }]
//             },
//             {
//                 label: 'level 2-2'
//             },
//             {
//                 label: 'level 2-3'
//             }
//         ]
//     }
// ])

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
    // console.log(data)
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
.container {
    margin-top: 20px;
    display: flex;
}

.list {
    margin-left: 16px;
    width: 300px;
}

.content {
    flex: 1;
    background-color: #fff;
    margin-left: 20px;
    margin-right: 11px;
}

.upload-demo{
    text-align: center;
}
</style>