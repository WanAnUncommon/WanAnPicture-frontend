<template>
  <div id="spaceDetailView">
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}(私有空间)</h2>
      <a-space size="middle">
        <a-button type="primary" :href="`/addPicture?spaceId=${id}`" target="_blank"
          >创建图片
        </a-button>
        <a-tooltip :title="`空间占用:${formatSize(space.totalSize)}/${formatSize(space.maxSize)}`">
          <a-progress
            type="circle"
            :size="42"
            :percent="((space.totalSize * 100) / space.maxSize).toFixed(1)"
          />
        </a-tooltip>
      </a-space>
    </a-flex>
    <PictureSearchForm :onSearch="onSearch"/>
    <div style="margin-bottom: 16px" />
    <PictureList :dataList="dataList" :loading="loading" :showOp="true" :onReload="fetchData"/>
    <a-pagination
      style="text-align: center"
      v-model:current="searchParams.currentPage"
      v-model:page-size="searchParams.pageSize"
      :total="total"
      @change="onPageChange"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { getSpaceVoByIdUsingGet } from '@/api/spaceController.ts'
import { listPictureVoByPageUsingPost } from '@/api/pictureController.ts'
import { formatSize } from '@/utils'
import PictureList from '@/components/PictureList.vue'
import PictureSearchForm from "@/components/PictureSearchForm.vue";

interface Props {
  id: string | number
}

const props = defineProps<Props>()

const space = ref<API.SpaceVO>({})
// 获取空间信息
const getSpaceDetail = async () => {
  const res = await getSpaceVoByIdUsingGet({ id: props.id })
  if (res.data.code === 200 && res.data.data) {
    space.value = res.data.data
  } else {
    message.error('获取空间失败:' + res.data.message)
  }
}
onMounted(() => {
  getSpaceDetail()
})

// 获取图片列表
const dataList = ref<API.PictureVO[]>([])

const total = ref(0)
const searchParams = ref<API.PictureQueryRequest>({
  currentPage: 1,
  pageSize: 10,
})
const onPageChange = (page: number, pageSize: number) => {
  searchParams.value.currentPage = page
  searchParams.value.pageSize = pageSize
  fetchData()
}

const loading = ref(true)
const fetchData = async () => {
  loading.value = true
  const params = { spaceId: props.id, ...searchParams.value }
  const res = await listPictureVoByPageUsingPost(params)
  if (res.data.code === 200 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败：' + res.data.message)
  }
  loading.value = false
}

const onSearch = (newSearchParams: API.PictureQueryRequest) => {
  searchParams.value={
    ...searchParams.value,
    ...newSearchParams,
    currentPage:1
  }
  fetchData()
}

// 页面加载时请求数据
onMounted(() => {
  fetchData()
})
</script>
<style scoped></style>
