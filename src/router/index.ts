import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import UserManageView from '@/views/admin/UserManageView.vue'
import AddPictureView from '@/views/AddPictureView.vue'
import PictureManageView from '@/views/admin/PictureManageView.vue'
import PictureDetailView from "@/views/PictureDetailView.vue";
import AddPictureBatchView from "@/views/admin/AddPictureBatchView.vue";
import SpaceManageView from "@/views/admin/SpaceManageView.vue";
import AddSpaceView from "@/views/AddSpaceView.vue";
import MySpaceView from "@/views/MySpaceView.vue";
import SpaceDetailView from "@/views/SpaceDetailView.vue";
import SpaceAnalyzeView from "@/views/SpaceAnalyzeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomeView,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginView,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterView,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManageView,
    },
    {
      path: '/addPicture',
      name: '添加图片',
      component: AddPictureView,
    },
    {
      path: '/admin/addPicture/batch',
      name: '批量添加图片',
      component: AddPictureBatchView,
    },
    {
      path: '/admin/pictureManage',
      name: '管理图片',
      component: PictureManageView,
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailView,
      props: true,
    },
    {
      path: '/admin/spaceManage',
      name: '管理空间',
      component: SpaceManageView,
    },
    {
      path: '/addSpace',
      name: '添加空间',
      component: AddSpaceView,
    },
    {
      path: '/mySpace',
      name: '我的空间',
      component: MySpaceView,
    },
    {
      path: '/space/:id',
      name: '空间详情',
      component: SpaceDetailView,
      props: true,
    },
    {
      path: '/spaceAnalyze',
      name: '空间分析',
      component: SpaceAnalyzeView,
    },
  ],
})

export default router
