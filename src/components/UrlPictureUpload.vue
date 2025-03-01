<template>
  <div class="url-picture-upload">
    <a-input-group compact>
      <a-input
        v-model:value="fileUrl"
        style="width: calc(100% - 120px)"
        placeholder="请输入图片链接"
        allow-clear
      />
      <a-button type="primary" style="width: 120px" :loading="loading" @click="uploadHandler"
        >Submit</a-button
      >
    </a-input-group>
    <div class="img-wrapper">
      <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { uploadPictureByUrlUsingPost } from '@/api/pictureController.ts'

interface Props {
  picture?: API.PictureVO
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>()

const fileUrl = ref<string>()

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

const uploadHandler = async () => {
  loading.value = true
  const params: API.uploadPictureByUrlUsingPOSTParams = { fileUrl: fileUrl.value }
  params.id = props.picture ? props.picture.id : undefined
  params.spaceId = props.spaceId
  const res = await uploadPictureByUrlUsingPost(params)
  if (res.data.code === 200 && res.data.data) {
    message.success('上传成功')
    props.onSuccess?.(res.data.data)
  } else {
    message.error('上传失败：' + res.data.message)
  }
  loading.value = false
}
</script>
<style scoped>
.url-picture-upload{
 margin-bottom: 16px;
}

.url-picture-upload img {
  max-width: 100%;
  max-height: 480px;
}

.url-picture-upload .img-wrapper {
  text-align: center;
  margin-top: 16px;
}
</style>
