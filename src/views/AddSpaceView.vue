<template>
  <div id="addSpaceView">
    <h2 style="margin-bottom: 16px">{{ route.query?.id ? '编辑空间' : '创建空间' }}</h2>
    <a-form layout="vertical" :model="spaceForm" @finish="handleSubmit">
      <a-form-item name="spaceName" label="空间名称">
        <a-input v-model:value="spaceForm.spaceName" placeholder="请输入空间名称" allow-clear />
      </a-form-item>
      <a-form-item name="spaceLevel" label="空间级别">
        <a-select
          v-model:value="spaceForm.spaceLevel"
          placeholder="请输入空间级别"
          style="min-width: 124px"
          :options="SPACE_LEVEL_OPTIONS"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" style="width: 100%"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
    <!--    空间级别介绍-->
    <a-card title="空间级别介绍">
      <a-typography-paragraph>
        * 目前仅支持开通普通空间，如需升级，请联系作者
        <a href="http://123.57.154.213/" target="_blank">WanAn</a>
      </a-typography-paragraph>
      <a-typography-paragraph v-for="spaceLevel in spaceLevelList">
        {{ spaceLevel.text }}: 大小{{ formatSize(spaceLevel.maxSize) }},数量{{
          spaceLevel.maxCount
        }}
      </a-typography-paragraph>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  addSpaceUsingPost,
  getSpaceVoByIdUsingGet,
  listSpaceLevelUsingGet,
  updateSpaceUsingPost
} from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { SPACE_LEVEL_OPTIONS } from '@/constants/space.ts'
import { formatSize } from '../utils'

const space = ref<API.SpaceVO>()
const loading = ref(false)
const spaceLevelList = ref<API.SpaceLevel[]>([])

// 获取空间级别列表
const getSpaceLevelList = async () => {
  const res = await listSpaceLevelUsingGet();
  if (res.data.code === 200&& res.data.data) {
    spaceLevelList.value = res.data.data
  } else {
    message.error('获取空间级别失败:' + res.data.message)
  }
}

onMounted(() => {
  getSpaceLevelList()
})

const spaceForm = reactive<API.SpaceAddRequest | API.SpaceUpdateRequest>({})

const router = useRouter()

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  loading.value = true
  const spaceId=space.value?.id;
  // 更新
  let res;
  if (spaceId) {
    res=await updateSpaceUsingPost({ id: spaceId, ...values })
  }else { // 创建
    res = await addSpaceUsingPost({ ...values })
  }
  if (res.data.code === 200) {
    message.success('操作成功')
    await router.push({
      path: `/space/${res.data.data}`,
    })
  } else {
    message.error('操作失败:' + res.data.message)
  }
  loading.value = false
}

const route = useRoute()
// 获取老的空间信息
const getOldSpace = async () => {
  const id = route.query?.id
  if (!id) {
    return
  }
  const res = await getSpaceVoByIdUsingGet({ id })
  if (res.data.code === 200 && res.data.data) {
    const data = res.data.data
    space.value = data
    spaceForm.spaceName = data.spaceName
    spaceForm.spaceLevel =data.spaceLevel.toString()
  } else {
    message.error('获取空间失败:' + res.data.message)
  }
}
onMounted(() => {
  getOldSpace()
})
</script>
<style scoped>
#addSpaceView {
  max-width: 840px;
  margin: 0 auto;
}
</style>
