// 是否为首次获取登录用户信息
import router from '@/router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'

let firstFetchLoginUser = true

router.beforeEach(async (to, from, next) => {
  const userLoginStore = useLoginUserStore()
  if (firstFetchLoginUser) {
    await userLoginStore.fetchLoginUser()
    firstFetchLoginUser = false
  }
  const loginUser = userLoginStore.loginUser
  const toUrl = to.fullPath
  if (toUrl.startsWith('/admin')) {
    if (!loginUser || loginUser.userRole !== 'admin') {
      message.error('无权限')
      next(`/user/login?redirect=${toUrl}`)
      return
    }
  }
  next();
  return
})
