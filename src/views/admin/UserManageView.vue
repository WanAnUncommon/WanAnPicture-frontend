<template>
  <div id="userManageView">
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="请输入账号" allow-clear />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" placeholder="请输入用户名" allow-clear />
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
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteUserByIdUsingPost, queryUserByPageUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const dataList = ref<API.UserVO>([])
const total = ref(0)
const searchParams = reactive<API.UserQueryDTO>({
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
  const res = await queryUserByPageUsingPost({ ...searchParams })
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
  const res = await deleteUserByIdUsingPost({ id })
  if (res.data.code === 200) {
    message.success('删除成功')
    await fetchData()
  } else {
    message.error('删除失败：' + res.data.message)
  }
}
</script>
