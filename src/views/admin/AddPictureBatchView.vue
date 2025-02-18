<template>
  <div id="addPictureBatchView">
    <h2>批量创建图片</h2>
    <a-form layout="vertical" :model="formData" @finish="handleSubmit">
      <a-form-item name="searchText" label="关键词">
        <a-input v-model:value="formData.searchText" placeholder="请输入搜索关键词" allow-clear />
      </a-form-item>
      <a-form-item name="count" label="数量">
        <a-input-number
          v-model:value="formData.count"
          placeholder="请输入创建数量"
          min="1"
          max="30"
          style="min-width: 180px"
          allow-clear
        />
      </a-form-item>
      <a-form-item name="namePrefix" label="名称前缀">
        <a-input v-model:value="formData.namePrefix" placeholder="请输入名称前缀" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { uploadPictureByBatchUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const loading = ref(false)

const formData = reactive<API.PictureUploadByBatchRequest>({
  count: 10,
})

const router = useRouter()

/**
 * 提交表单
 */
const handleSubmit = async () => {
  loading.value = true
  const res = await uploadPictureByBatchUsingPost({ ...formData })
  if (res.data.code === 200) {
    message.success(`创建成功,共${res.data.data}条`)
    await router.push({
      path: `/`,
    })
  } else {
    message.error('创建失败:' + res.data.message)
  }
}
</script>
<style scoped>
#addPictureBatchView {
  max-width: 840px;
  margin: 0 auto;
}
</style>
