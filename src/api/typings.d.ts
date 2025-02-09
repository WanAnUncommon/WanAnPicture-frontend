declare namespace API {
  type BaseResponseListUserVO_ = {
    code?: number
    data?: UserVO[]
    message?: string
  }

  type BaseResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseUserVO_ = {
    code?: number
    data?: UserVO
    message?: string
  }

  type deleteUserByIdUsingPOSTParams = {
    /** id */
    id?: number
  }

  type LoginUserVO = {
    id?: number
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type queryUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type UserAddDTO = {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
  }

  type UserLoginDTO = {
    userAccount?: string
    userPassword?: string
  }

  type UserQueryDTO = {
    currentPage?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserRegisterDTO = {
    checkPassword?: string
    userAccount?: string
    userPassword?: string
  }

  type UserUpdateDTO = {
    id?: number
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
  }

  type UserVO = {
    id?: number
    userAccount?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }
}
