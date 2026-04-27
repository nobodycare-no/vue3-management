<template>
    <div class="project-page">
        <div class="project-card">
            <div class="project-toolbar">
                <h2 class="project-toolbar__title">项目信息</h2>
                <div class="project-toolbar__actions">
                    <el-input
                        class="project-toolbar__input"
                        v-model="searchInfo"
                        placeholder="请输入要搜索的内容"
                        clearable
                        @keyup.enter="searchHandler"
                    />
                    <el-button type="primary" @click="searchHandler">搜索</el-button>
                    <el-button type="primary" @click="addHandler">添加</el-button>
                </div>
            </div>

            <el-table
                class="project-table"
                :data="projectInfo.list"
                border
                stripe
                style="width: 100%"
                :header-cell-style="headerClass"
            >
                <el-table-column prop="name" label="项目名称" min-width="120" show-overflow-tooltip />
                <el-table-column prop="number" label="项目编码" min-width="110" show-overflow-tooltip />
                <el-table-column prop="money" label="项目金额" width="100" />
                <el-table-column prop="address" label="项目地址" min-width="140" show-overflow-tooltip />
                <el-table-column prop="duration" label="项目工期" width="100" />
                <el-table-column
                    :formatter="row => dateFormatter(Number(row.startTime))"
                    prop="startTime"
                    label="开工时间"
                    width="120"
                />
                <el-table-column
                    :formatter="row => dateFormatter(Number(row.endTime))"
                    prop="endTime"
                    label="终止时间"
                    width="120"
                />
                <el-table-column prop="quantity" label="隧道数量" width="96" align="center" />
                <el-table-column prop="status" label="项目状态" width="100" align="center">
                    <template #default="scope">
                        <el-tag :type="scope.row.status === '1' ? 'warning' : 'success'">{{
                            statusHandle(scope.row.status)
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="remark" label="备注" min-width="160">
                    <template #default="scope">
                        <div class="project-remark-cell" v-html="scope.row.remark"></div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140" fixed="right" align="center">
                    <template #default="scope">
                        <el-button type="primary" link size="small" @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" link size="small" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="project-pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :total="totalPage"
                    :page-size="15"
                    @current-change="currentPage"
                />
            </div>
        </div>

        <el-dialog v-model="dialogAddVisible" title="添加项目信息" width="720px" align-center destroy-on-close center>
            <el-form class="project-form" :model="addFormInfo" label-width="96px" label-position="right">
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目名称">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.name"
                                placeholder="请输入项目名称"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目编码">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.number"
                                placeholder="请输入项目编码"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目金额">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.money"
                                placeholder="请输入项目金额"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目地址">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.address"
                                placeholder="请输入项目地址"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目工期">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.duration"
                                placeholder="请输入项目工期"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="开工时间">
                            <el-date-picker
                                class="project-form__control"
                                style="width: 100%"
                                v-model="addFormInfo.startTime"
                                type="date"
                                value-format="x"
                                placeholder="选择开工时间"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="终止时间">
                            <el-date-picker
                                class="project-form__control"
                                style="width: 100%"
                                v-model="addFormInfo.endTime"
                                type="date"
                                value-format="x"
                                placeholder="选择终止时间"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="隧道数量">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.quantity"
                                placeholder="请输入隧道数量"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目状态">
                            <el-input
                                class="project-form__control"
                                v-model="addFormInfo.status"
                                placeholder="1 -- 施工中  0 -- 已完工"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" />
                </el-row>
                <el-row class="project-form__row project-form__row--last" :gutter="16">
                    <el-col :span="24">
                        <el-form-item class="project-form__item" label="项目备注">
                            <TinyMCEEditor @newValue="getRemarkValue" :editorStyle="editorStyle" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmHandler">提交</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogEditVisible" title="编辑项目信息" width="720px" align-center destroy-on-close center>
            <el-form class="project-form" :model="editFormInfo" label-width="96px" label-position="right">
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目名称">
                            <el-input class="project-form__control" v-model="editFormInfo.name" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目编码">
                            <el-input class="project-form__control" v-model="editFormInfo.number" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目金额">
                            <el-input class="project-form__control" v-model="editFormInfo.money" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目地址">
                            <el-input class="project-form__control" v-model="editFormInfo.address" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目工期">
                            <el-input class="project-form__control" v-model="editFormInfo.duration" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="开工时间">
                            <el-date-picker
                                class="project-form__control"
                                style="width: 100%"
                                v-model="editFormInfo.startTime"
                                type="date"
                                value-format="x"
                                placeholder="选择开工时间"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="终止时间">
                            <el-date-picker
                                class="project-form__control"
                                style="width: 100%"
                                v-model="editFormInfo.endTime"
                                type="date"
                                value-format="x"
                                placeholder="选择终止时间"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="隧道数量">
                            <el-input class="project-form__control" v-model="editFormInfo.quantity" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="project-form__row" :gutter="16">
                    <el-col :span="12">
                        <el-form-item class="project-form__item" label="项目状态">
                            <el-input class="project-form__control" v-model="editFormInfo.status" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" />
                </el-row>
                <el-row class="project-form__row project-form__row--last" :gutter="16">
                    <el-col :span="24">
                        <el-form-item class="project-form__item" label="项目备注">
                            <TinyMCEEditor
                                :editorID="editorID"
                                @newValue="getRemarkValue"
                                :editorStyle="editorStyle"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogEditVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmEditHandler">提交</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import api from '@/api/index.js'
import { dateFormatter } from '@/utils/utils.js'
import TinyMCEEditor from '@/components/TinyMCEEditor/index.vue'

const projectInfo = reactive({
    list: [],
})

const getRemarkValue = (value) => {
    addFormInfo.remark = value
    editFormInfo.remark = value
}

const editorStyle = reactive({
    width: '100%',
    height: '300px',
})

const searchInfo = ref('')

const totalPage = ref(0)

const dialogAddVisible = ref(false)
const dialogEditVisible = ref(false)

const addFormInfo = reactive({
    name: '',
    number: '',
    money: '',
    address: '',
    duration: '',
    startTime: '',
    endTime: '',
    quantity: '',
    status: '',
    remark: '',
})

const editFormInfo = reactive({
    name: '',
    number: '',
    money: '',
    address: '',
    duration: '',
    startTime: '',
    endTime: '',
    quantity: '',
    status: '',
    remark: '',
})

const editorID = ref(0)

onMounted(() => {
    api.getTotalPage().then(res => {
        if (res.data.status == 200) {
            totalPage.value = res.data.result[0]['count(*)']
        } else {
            totalPage.value = 0
            projectInfo.list = []
        }
    })
})

const searchHandler = () => {
    api.getSearch({ search: searchInfo.value }).then(res => {
        if (res.data.status == 200) {
            projectInfo.list = res.data.result
        } else {
            projectInfo.list = []
        }
    })
}

const addHandler = () => {
    dialogAddVisible.value = true
}

const currentPage = (page) => {
    http(page)
}

const confirmHandler = () => {
    api
        .addProject({
            name: addFormInfo.name,
            number: addFormInfo.number,
            money: addFormInfo.money,
            address: addFormInfo.address,
            duration: addFormInfo.duration,
            startTime: addFormInfo.startTime,
            endTime: addFormInfo.endTime,
            quantity: addFormInfo.quantity,
            status: addFormInfo.status,
            remark: addFormInfo.remark,
        })
        .then(res => {
            if (res.data.status == 200) {
                dialogAddVisible.value = false
                http(1)
            } else {
                ElMessage.error(res.data.msg)
            }
        })
}

const confirmEditHandler = () => {
    api
        .updateProject(editorID.value, editFormInfo)
        .then(res => {
            if (res.data.status == 200) {
                dialogEditVisible.value = false
                ElMessage.success(res.data.msg)
                http(1)
            } else {
                ElMessage.error(res.data.msg)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

onMounted(() => {
    http(1)
})

const http = (pageNumber) => {
    api.getProjectInfo({ page: pageNumber }).then(res => {
        projectInfo.list = res.data.result
    })
}

const statusHandle = (status) => {
    return status == '1' ? '施工中' : '已完工'
}

const headerClass = () => ({
    background: '#f5f7fa',
    color: '#606266',
    fontWeight: 600,
})

const handleEdit = (index, row) => {
    dialogEditVisible.value = true
    editorID.value = row.id
    api.editProject({ id: row.id }).then(res => {
        if (res.data.status == 200) {
            editFormInfo.name = res.data.result[0].name
            editFormInfo.number = res.data.result[0].number
            editFormInfo.money = res.data.result[0].money
            editFormInfo.address = res.data.result[0].address
            editFormInfo.duration = res.data.result[0].duration
            editFormInfo.startTime = Number(res.data.result[0].startTime)
            editFormInfo.endTime = Number(res.data.result[0].endTime)
            editFormInfo.quantity = res.data.result[0].quantity
            editFormInfo.status = res.data.result[0].status
            editFormInfo.remark = res.data.result[0].remark
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

const handleDelete = (index, row) => {
    ElMessageBox.confirm('确定要删除这条数据吗', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            api.delProject({ id: row.id }).then(res => {
                if (res.data.status == 200) {
                    ElMessage.success(res.data.msg)
                    http(1)
                } else {
                    ElMessage.error(res.data.msg)
                }
            })
        })
        .catch(() => {
            ElMessage.info('取消删除')
        })
}
</script>

<style scoped>
.project-page {
    min-height: calc(100vh - 120px);
    padding: 16px;
    box-sizing: border-box;
    background: #f0f2f5;
}

.project-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    padding: 16px;
    box-sizing: border-box;
}

.project-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #ebeef5;
}

.project-toolbar__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.project-toolbar__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.project-toolbar__input {
    width: 260px;
}

.project-table {
    border-radius: 4px;
    overflow: hidden;
}

.project-remark-cell {
    max-height: 4.5em;
    overflow: hidden;
    line-height: 1.5;
}

.project-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 16px;
    margin-top: 4px;
    border-top: 1px solid #ebeef5;
}

.project-form .project-form__control {
    width: 100%;
    box-sizing: border-box;
}

.project-form .project-form__row {
    margin-bottom: 4px;
}

.project-form .project-form__row--last {
    margin-bottom: 0;
}

.project-form .project-form__item {
    margin-bottom: 12px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
