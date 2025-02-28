<template>
  <div id="globalSider">
    <a-layout-sider
      width="200"
      breakpoint="lg"
      v-if="loginUserStore.loginUser.id"
      collapsed-width="0"
    >
      <a-menu
        v-model:selectedKeys="current"
        mode="inline"
        :items="menuItems"
        @click="doMenuClick"
      />
    </a-layout-sider>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { PictureOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUserStore = useLoginUserStore()
// 菜单
const menuItems = [
  {
    key: '/',
    icon: () => h(PictureOutlined),
    label: '公共图库',
  },
  {
    key: '/mySpace',
    icon: () => h(UserOutlined),
    label: '我的空间',
  },
]

const router = useRouter()
// 菜单跳转事件
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  })
}
const current = ref<string[]>([])
router.afterEach((to, from) => {
  current.value = [to.path]
})
</script>
<style scoped>
#globalSider .ant-layout-sider {
  background: none;
}
</style>
