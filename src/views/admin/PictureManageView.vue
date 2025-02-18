<template>
  <div id="pictureManageView">
    <a-flex justify="space-between">
      <h2>图片管理</h2>
      <a-space>
        <a-button type="primary" href="/addPicture" target="_blank">创建图片</a-button>
        <a-button type="primary" href="/admin/addPicture/batch" target="_blank" ghost>批量创建</a-button>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="关键词">
        <a-input v-model:value="searchParams.searchText" placeholder="搜索名称和简介" allow-clear />
      </a-form-item>
      <a-form-item label="类型">
        <a-input v-model:value="searchParams.category" placeholder="请输入类型" allow-clear />
      </a-form-item>
      <a-form-item label="标签">
        <a-select
          v-model:value="searchParams.tags"
          mode="tags"
          placeholder="请输入标签"
          style="min-width: 124px"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="审核状态">
        <a-select
          v-model:value="searchParams.reviewStatus"
          placeholder="请输入审核状态"
          style="min-width: 124px"
          :options="PICTURE_REVIEW_STATUS_OPTIONS"
          allow-clear
        />
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
        <template v-if="column.dataIndex === 'url'">
          <a-image :src="record.url" :width="120" />
        </template>
        <template v-if="column.dataIndex === 'tags'">
          <a-space wrap>
            <a-tag v-for="tag in JSON.parse(record.tags || '[]')">
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'picInfo'">
          <div>格式：{{ record.picFormat }}</div>
          <div>大小：{{ (record.picSize / 1024).toFixed(2) }}KB</div>
          <div>宽：{{ record.picWidth }}</div>
          <div>高：{{ record.picHeight }}</div>
          <div>宽高比：{{ record.picScale }}</div>
        </template>
        <template v-if="column.dataIndex === 'reviewMessage'">
          <div>审核状态：{{ PICTURE_REVIEW_STATUS_MAP[record.reviewStatus] }}</div>
          <div>审核信息：{{ record.reviewMessage }}</div>
          <div>审核人：{{ record.reviewerId }}</div>
          <div v-if="record.reviewTime">
            审核时间：{{ dayjs(record.reviewTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'editTime'">
          {{ dayjs(record.editTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" :href="`/addPicture?id=${record.id}`">编辑</a-button>
            <a-button danger @click="doDelete(record.id)">删除</a-button>
            <a-button
              @click="handleReview(record, PICTURE_REVIEW_STATUS_ENUM.PASS)"
              type="link"
              v-if="record.reviewStatus !== PICTURE_REVIEW_STATUS_ENUM.PASS"
              >通过
            </a-button>
            <a-button
              @click="handleReview(record, PICTURE_REVIEW_STATUS_ENUM.REJECT)"
              danger
              type="link"
              v-if="record.reviewStatus !== PICTURE_REVIEW_STATUS_ENUM.REJECT"
              >拒绝
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  deletePictureUsingPost,
  doPictureReviewUsingPost,
  listPictureByPageUsingPost,
} from '@/api/pictureController.ts'
import dayjs from 'dayjs'
import {
  PICTURE_REVIEW_STATUS_ENUM,
  PICTURE_REVIEW_STATUS_MAP,
  PICTURE_REVIEW_STATUS_OPTIONS
} from '../../constants/picture.ts'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'url',
    dataIndex: 'url',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '简介',
    dataIndex: 'introduction',
  },
  {
    title: '分类',
    dataIndex: 'category',
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  {
    title: '图片信息',
    dataIndex: 'picInfo',
  },
  {
    title: '审核信息',
    dataIndex: 'reviewMessage',
  },
  {
    title: '创建用户ID',
    dataIndex: 'userId',
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

const dataList = ref<API.Picture>([])
const total = ref(0)
const searchParams = reactive<API.PictureQueryRequest>({
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
  const res = await listPictureByPageUsingPost({ ...searchParams })
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
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 200) {
    message.success('删除成功')
    await fetchData()
  } else {
    message.error('删除失败：' + res.data.message)
  }
}

// 审核
const handleReview = async (record: API.Picture, status: number) => {
  const reviewMessage =
    status === PICTURE_REVIEW_STATUS_ENUM.PASS ? '管理员审核通过' : '管理员审核拒绝'
  const res = await doPictureReviewUsingPost({
    id: record.id,
    reviewMessage,
    reviewStatus: status,
  })
  if (res.data.code === 200) {
    message.success('审核成功')
    await fetchData()
  } else {
    message.error('审核失败：' + res.data.message)
  }
}
</script>
