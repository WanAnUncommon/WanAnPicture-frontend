<template>
  <div id="addPictureView">
    <h2 style="margin-bottom: 16px">{{ route.query?.id ? '编辑图片' : '创建图片' }}</h2>
    <a-typography-paragraph v-if="spaceId" type="secondary">
      保存至空间：<a :href="`/space/${spaceId}`" target="_blank">{{ spaceId }}</a>
    </a-typography-paragraph>
    <a-tabs v-model:activeKey="uploadType">
      <a-tab-pane key="file" tab="文件上传"
        ><!--  文件上传图片  -->
        <PictureUpload :picture="picture" :spaceId="spaceId" :onSuccess="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="url上传"
        ><!-- Url上传图片-->
        <UrlPictureUpload :picture="picture" :spaceId="spaceId" :onSuccess="onSuccess" />
      </a-tab-pane>
    </a-tabs>
    <a-form v-if="picture" layout="vertical" :model="pictureForm" @finish="handleSubmit">
      <a-form-item name="name" label="名称">
        <a-input v-model:value="pictureForm.name" placeholder="请输入图片名称" allow-clear />
      </a-form-item>
      <a-form-item name="introduction" label="简洁">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="请输入图片简介"
          :autoSize="{ minRows: 2, maxRows: 5 }"
          allow-clear
        />
      </a-form-item>
      <a-form-item name="category" label="分类">
        <a-auto-complete
          v-model:value="pictureForm.category"
          placeholder="请输入图片分类"
          :options="categoryOptions"
          allow-clear
        />
      </a-form-item>
      <a-form-item name="tags" label="标签">
        <a-select
          v-model:value="pictureForm.tags"
          mode="tags"
          placeholder="请输入图片标签"
          :options="tagOptions"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import {
  editPictureUsingPost,
  getPictureVoByIdUsingGet,
  getTagCategoryUsingGet,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import UrlPictureUpload from '@/components/UrlPictureUpload.vue'

const picture = ref<API.PictureVO>()

const uploadType = ref<'file' | 'url'>('file')

// 上传成功
const onSuccess = (newPicture: API.PictureVO) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
}

const pictureForm = reactive<API.PictureEditRequest>({})

const router = useRouter()
const spaceId = computed(() => {
  return route.query?.spaceId
})

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  const pictureId = picture.value?.id
  if (!pictureId) {
    message.error('请重试上传图片')
    return
  }
  const res = await editPictureUsingPost({ id: pictureId, spaceId: spaceId.value, ...values })
  if (res.data.code === 200) {
    message.success('创建成功')
    await router.push({
      path: `/picture/${pictureId}`,
    })
  } else {
    message.error('创建失败:' + res.data.message)
  }
}

const tagOptions = ref<{ value: string; label: string }[]>([])
const categoryOptions = ref<{ value: string; label: string }[]>([])
/**
 * 获取标签、分类选项
 */
const getTagCategoryOptions = async () => {
  const res = await getTagCategoryUsingGet()
  if (res.data.code === 200 && res.data.data) {
    tagOptions.value = (res.data.data.tagList ?? []).map((item: string) => {
      return {
        value: item,
        label: item,
      }
    })
    categoryOptions.value = (res.data.data.categoryList ?? []).map((item: string) => {
      return {
        value: item,
        label: item,
      }
    })
  } else {
    message.error('失败:' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

const route = useRoute()
// 获取老的图片信息
const getOldPicture = async () => {
  const id = route.query?.id
  if (!id) {
    return
  }
  const res = await getPictureVoByIdUsingGet({ id })
  if (res.data.code === 200 && res.data.data) {
    const data = res.data.data
    picture.value = data
    pictureForm.name = data.name
    pictureForm.introduction = data.introduction
    pictureForm.category = data.category
    pictureForm.tags = data.tags
  } else {
    message.error('获取图片失败:' + res.data.message)
  }
}
onMounted(() => {
  getOldPicture()
})
</script>
<style scoped>
#addPictureView {
  max-width: 840px;
  margin: 0 auto;
}
</style>
