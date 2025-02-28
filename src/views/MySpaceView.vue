<template>
  <div id="mySpaceView">
    <p>请稍等，请稍等...</p>
  </div>
</template>
<script setup lang="ts">
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { useRouter } from 'vue-router'
import { listSpaceVoByPageUsingPost } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'

const loginUserStore = useLoginUserStore()
const router = useRouter()
const checkUserSpace = async () => {
  const loginUser = loginUserStore.loginUser
  if (loginUser?.id == null) {
    await router.replace('/user/login')
    return
  }
  const res = await listSpaceVoByPageUsingPost({
    userId: loginUser.id,
    currentPage: 1,
    pageSize: 1,
  })
  if (res.data.code === 200) {
    if (res.data.data?.records?.length > 0) {
      const space = res.data.data.records[0]
      await router.replace(`/space/${space.id}`)
    } else {
      await router.replace('/addSpace')
      message.warn('请先创建空间')
    }
  } else {
    message.error('获取空间失败:' + res.data.message)
  }
}

onMounted(() => {
  checkUserSpace()
})
</script>
<style scoped></style>
