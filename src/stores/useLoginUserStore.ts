import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 存储登录用户状态信息
export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<any>({
    userName: '未登录'
  })

  async function fetchLoginUser(){
    // 测试
    setTimeout(()=>{
      loginUser.value={
        userName: 'Test',
        id: 1
      }
    },3000)
  }

  function setLoginUser(newLoginUser: any) {
    loginUser.value=newLoginUser;
  }

  return { loginUser,fetchLoginUser,setLoginUser }
})
