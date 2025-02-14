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
            <a-dropdown>
              <a-space>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                {{ loginUserStore.loginUser.userName ?? '无名' }}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
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
import { computed, h, ref } from 'vue'
import { AppstoreOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'

// 原始菜单
const orangeMenus = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    icon: () => h(AppstoreOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/admin/pictureManage',
    icon: () => h(AppstoreOutlined),
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: '/addPicture',
    icon: () => h(AppstoreOutlined),
    label: '添加图片',
    title: '添加图片',
  },
]

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((item) => {
    // 如果是管理员菜单，则需要判断用户是否是管理员
    if (item?.key?.startsWith('/admin')) {
      if (!loginUserStore.loginUser || loginUserStore.loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}
// 过滤原始菜单
const items = computed(() => filterMenus(orangeMenus))

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
const doLogout = async () => {
  const res = await userLogoutUsingPost()
  if (res.data.code === 200) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出成功')
    await router.push({
      path: '/user/login',
    })
  } else {
    message.error('退出失败:' + res.data.message)
  }
}
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
