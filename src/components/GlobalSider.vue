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
import {computed, h, ref, watchEffect} from 'vue'
import { PictureOutlined, UserOutlined ,TeamOutlined} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import {SPACE_TYPE_ENUM} from "@/constants/space.ts";
import {listMyTeamSpaceUsingPost} from "@/api/spaceUserController.ts";
import {message} from "ant-design-vue";

const loginUserStore = useLoginUserStore()
// 固定菜单
const fixedMenuItems = [
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
  {
    key: '/addSpace?type=' + SPACE_TYPE_ENUM.TEAM,
    label: '创建团队',
    icon: () => h(TeamOutlined),
  },
]

const teamSpaceList = ref<API.SpaceUserVO[]>([])
const menuItems = computed(() => {
  // 没有团队空间，只展示固定菜单
  if (teamSpaceList.value.length < 1) {
    return fixedMenuItems;
  }
  // 展示团队空间分组
  const teamSpaceSubMenus = teamSpaceList.value.map((spaceUser) => {
    const space = spaceUser.spaceVO
    return {
      key: '/space/' + spaceUser.spaceId,
      label: space?.spaceName,
    }
  })
  const teamSpaceMenuGroup = {
    type: 'group',
    label: '我的团队',
    key: 'teamSpace',
    children: teamSpaceSubMenus,
  }
  return [...fixedMenuItems, teamSpaceMenuGroup]
})

// 加载团队空间列表
const fetchTeamSpaceList = async () => {
  const res = await listMyTeamSpaceUsingPost()
  if (res.data.code === 200 && res.data.data) {
    teamSpaceList.value = res.data.data
  } else {
    message.error('加载我的团队空间失败，' + res.data.message)
  }
}

/**
 * 监听变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  // 登录才加载
  if (loginUserStore.loginUser.id) {
    fetchTeamSpaceList()
  }
})


const router = useRouter()
// 菜单跳转事件
// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push(key)
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
