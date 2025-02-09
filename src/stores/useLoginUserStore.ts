import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getLoginUserUsingGet} from '@/api/userController.ts'

// 存储登录用户状态信息
export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: '未登录',
  })

  // 获取登录用户信息
  async function fetchLoginUser() {
    const res = await getLoginUserUsingGet()
    if (res.data.code === 200 && res.data.data) {
      loginUser.value = res.data.data
    }
  }

  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  return { loginUser, fetchLoginUser, setLoginUser }
})
