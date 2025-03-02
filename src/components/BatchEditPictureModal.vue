<template>
  <div class="batchEditPictureModal">
    <a-modal v-model:visible="visible" title="批量编辑图片" :footer="false" @cancel="closeModal">
      <a-typography-paragraph type="secondary">* 只对当前页面的图片批量编辑</a-typography-paragraph>
      <a-form layout="vertical" :model="formData" @finish="handleSubmit">
        <a-form-item name="category" label="分类">
          <a-auto-complete
            v-model:value="formData.category"
            placeholder="请输入图片分类"
            :options="categoryOptions"
            allow-clear
          />
        </a-form-item>
        <a-form-item name="tags" label="标签">
          <a-select
            v-model:value="formData.tags"
            mode="tags"
            placeholder="请输入图片标签"
            :options="tagOptions"
            allow-clear
          />
        </a-form-item>
        <a-form-item name="nameRule" label="命名规则">
          <a-input
            v-model:value="formData.nameRule"
            placeholder="请输入图片名称,包含 {序号} 可动态生成序号"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 100%">提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { editPictureByBatchUsingPost, getTagCategoryUsingGet } from '@/api/pictureController.ts'

interface Props {
  pictureList: API.PictureVO[]
  spaceId: number
  onSuccess: () => void
}

const props = withDefaults(defineProps<Props>(), {})
// 是否可见
const visible = ref(false)
const openModal = () => {
  visible.value = true
}
const closeModal = () => {
  visible.value = false
}
// 暴露方法
defineExpose({
  openModal,
})

const formData = reactive<API.PictureEditByBatchRequest>({})

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  if (!props.pictureList) {
    message.error('未选中图片，请重试')
    return
  }
  const res = await editPictureByBatchUsingPost({
    pictureIdList: props.pictureList.map((item) => item.id),
    spaceId: props.spaceId,
    ...values,
  })
  if (res.data.code === 200) {
    message.success('操作成功')
    closeModal()
    props.onSuccess()
  } else {
    message.error('操作失败:' + res.data.message)
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
</script>
<style scoped></style>
