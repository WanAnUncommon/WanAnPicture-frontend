<template>
  <div id="spaceManageView">
    <a-flex justify="space-between">
      <h2>空间管理</h2>
      <a-space>
        <a-button type="primary" href="/addSpace" target="_blank">创建空间</a-button>
        <a-button type="primary" ghost href="/spaceAnalyze?queryAll=1" target="_blank"
          >分析全部空间</a-button
        >
        <a-button type="primary" ghost href="/spaceAnalyze?queryPublic=1" target="_blank"
          >分析公共图库</a-button
        >
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="空间名称">
        <a-input v-model:value="searchParams.spaceName" placeholder="搜索空间名称" allow-clear />
      </a-form-item>
      <a-form-item label="空间级别">
        <a-select
          v-model:value="searchParams.spaceLevel"
          placeholder="请输入空间级别"
          style="min-width: 124px"
          :options="SPACE_LEVEL_OPTIONS"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="用户ID">
        <a-input v-model:value="searchParams.userId" placeholder="请输入用户ID" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>
    <div style="margin-bottom: 16px" />
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'spaceLevel'">
          <div>{{ SPACE_LEVEL_MAP[record.spaceLevel] }}</div>
        </template>
        <template v-if="column.dataIndex === 'spaceUseInfo'">
          <div>大小：{{ formatSize(record.totalSize) }} / {{ formatSize(record.maxSize) }}</div>
          <div>数量：{{ record.totalCount }} / {{ record.maxCount }}</div>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-if="column.dataIndex === 'editTime'">
          {{ dayjs(record.editTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" :href="`/spaceAnalyze?spaceId=${record.id}`" target="_blank"
              >分析</a-button
            >
            <a-button type="link" :href="`/addSpace?id=${record.id}`">编辑</a-button>
            <a-button danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { deleteSpaceUsingPost, listSpaceByPageUsingPost } from '@/api/spaceController.ts'
import dayjs from 'dayjs'
import { SPACE_LEVEL_MAP, SPACE_LEVEL_OPTIONS } from '../../constants/space.ts'
import { formatSize } from '../../utils'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '空间名称',
    dataIndex: 'spaceName',
  },
  {
    title: '空间级别',
    dataIndex: 'spaceLevel',
  },
  {
    title: '使用情况',
    dataIndex: 'spaceUseInfo',
  },
  {
    title: '创建用户',
    dataIndex: 'userId',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '编辑时间',
    dataIndex: 'editTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const dataList = ref<API.Space>([])
const total = ref(0)
const searchParams = reactive<API.SpaceQueryRequest>({
  currentPage: 1,
  pageSize: 10,
})
const pagination = computed(() => {
  return {
    current: searchParams.currentPage,
    pageSize: searchParams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条`,
  }
})

const fetchData = async () => {
  const res = await listSpaceByPageUsingPost({ ...searchParams })
  if (res.data.code === 200) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败：' + res.data.message)
  }
}

const doSearch = () => {
  searchParams.currentPage = 1
  fetchData()
}

// 分页切换
const doTableChange = (page: any) => {
  searchParams.currentPage = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

// 页面加载时请求数据
onMounted(() => {
  fetchData()
})

const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  const res = await deleteSpaceUsingPost({ id })
  if (res.data.code === 200) {
    message.success('删除成功')
    await fetchData()
  } else {
    message.error('删除失败：' + res.data.message)
  }
}
</script>
