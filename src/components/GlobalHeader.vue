<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="240px">
        <router-link to="/">
          <div class="title-bar">
            <img src="../assets/logo.jpg" alt="logo" class="logo" />
            <div class="title">WanAn云图库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="180px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ loginUserStore.loginUser.userName ?? '无名' }}
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    icon: () => h(AppstoreOutlined),
    label: '关于',
    title: '关于',
  },
])
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
const loginUserStore = useLoginUserStore()
</script>
<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

#globalHeader .title {
  color: black;
  margin-left: 16px;
  font-size: 18px;
}

.logo {
  height: 45px;
}
</style>
