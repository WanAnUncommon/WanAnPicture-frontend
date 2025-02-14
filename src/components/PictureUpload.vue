<template>
  <div class="picture-upload">
    <a-upload
      name="avatar"
      list-type="picture-card"
      :show-upload-list="false"
      :custom-request="uploadHandler"
      :before-upload="beforeUpload"
    >
      <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">点击或拖拽上传</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import {uploadPictureUsingPost} from "@/api/pictureController.ts";

interface Props {
  picture?: API.PictureVO
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>()

const loading = ref<boolean>(false)

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg' ||
    file.type === 'image/webp'
  if (!isJpgOrPng) {
    message.error('不支持该图片格式')
  }
  const isLt3M = file.size / 1024 / 1024 < 3
  if (!isLt3M) {
    message.error('图片大小不能超过 3MB!')
  }
  return isJpgOrPng && isLt3M
}

const uploadHandler = async ({ file}:any) => {
  loading.value = true
  const params=props.picture?{id:props.picture.id}:{}
  const res=await uploadPictureUsingPost(params,{},file);
  if (res.data.code===200&&res.data.data){
    message.success('上传成功')
    props.onSuccess?.(res.data.data);
  }else {
    message.error('上传失败：'+res.data.message)
  }
  loading.value=false
}
</script>
<style scoped>
.picture-upload :deep( .ant-upload ){
  width: 100% !important;
  height: 100% !important;
  min-height: 152px;
  min-width: 152px;
}

.picture-upload img{
  max-width: 100%;
  max-height: 480px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
