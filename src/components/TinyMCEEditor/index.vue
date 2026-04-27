<template>
    <editor v-model="textContent" :init="init"></editor>
</template>

<script setup>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/plugins/image'
import "tinymce/plugins/importcss"
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import "tinymce/plugins/charmap";
import 'tinymce/plugins/wordcount'
import "tinymce/plugins/codesample"
import "tinymce/plugins/code"
import "tinymce/plugins/fullscreen"
import 'tinymce/plugins/link' //
import 'tinymce/plugins/preview'
import "tinymce/plugins/template"
import 'tinymce/plugins/save'
import "tinymce/plugins/searchreplace"
import "tinymce/plugins/pagebreak"
import "tinymce/plugins/insertdatetime"
import { ref, watch, reactive, onMounted } from 'vue'
import api from '@/api/index.js'

const textContent = ref('')
const emit = defineEmits(['newValue'])

onMounted(() => {
    api.editProject({id: props.editorID}).then(res => {
        if(res.data.status == 200){
            textContent.value = res.data.result[0].remark;
        }else{
            ElMessage.error(res.data.msg)
        }
    }).catch(error => {
        console.log(error);
    })
})

watch(textContent, (newValue, oldValue) => {
    emit('newValue', newValue)
})

const props = defineProps({
    plugins: {
        type: [String, Array],
        default: 'lists image media table wordcount save preview'
    },
    toolbar: {
        type: [String, Array],
        default: 'undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | lists image media table | codesample code removeformat save preview'
    },
    editorStyle: {
        type: Object,
        default: () => {}
    },
    editorID: {
        type:[String,Number],
        default:0
    }
})

const init = reactive({
    width: props.editorStyle.width,
    height: props.editorStyle.height,
    language_url: '/tinymce/langs/zh-Hans.js',
    language: 'zh-Hans',
    skin_url: '/tinymce/skins/ui/oxide',
    plugins: props.plugins,
    toolbar: props.toolbar,
    content_css: '/tinymce/skins/content/default/content.css',
    license_key: 'gpl',
    branding: false,
    menubar: false,
    statusbar: true,
    init_instance_callback: (editor) => {
        console.log("初始化完成：", editor)
    },
    images_upload_handler: (blobInfo, success, failure) => {
        const img =
            'data:image/jpeg;base64,' +
            blobInfo.base64()
        console.log("图片上传处理：", img)
        success(img)
    }
})
</script>
