
export type TUserRole = 'USER' | 'ROOT' | 'ADMIN' | 'MANAGER'

export interface IUser {
  id: number
  firstname: string
  lastname: string
  password: string
  email: string
  phone: null
  role: TUserRole
  avatar: null
  hash: string
  basketID: string
  createdAt: string
  updatedAt: string
}

export interface IAutor {
  id: number
  hash: string
  firstname: string
  lastname: string
  fullname: string
  avatar: string
}

export interface IOtherUser {
  user: IUser
  token: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IConstaint {
  [key: string]: string
}

export interface IValidationError {
  constraints: IConstaint[]
  property: string
  value: string
  target: any
}

export interface IAuthStoreState {
  isAuth: boolean
  userToken: string
  user: IUser | null
  otherUsers: IOtherUser[]
  authErrors: IValidationError[] | null
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): IAuthStoreState => ({
    isAuth: false,
    userToken: '',
    user: null,
    otherUsers: [],
    authErrors: null
  }),
  actions: {
    async login (data: ILoginData) {
      this.authErrors = []

       const response = await useApi('user/login', {
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        }
      })

      if ('body' in response) {
        const user: IOtherUser = response.body

        this.userToken = user.token
        this.user = user.user
        this.isAuth = true

        const router = useRouter()

        router.push('/')
      }

      if ('errors' in response || 'stack' in response) {
        this.authErrors = response.errors || []
      }      
    },
  },
  getters: {
    getUserToken: (state: IAuthStoreState): string => {
      return state.userToken
    },
    getIsAuth: (state: IAuthStoreState): boolean => {
      return state.isAuth
    },
    getUser: (state:IAuthStoreState): IUser | null => {
      return state.user
    },
    getErrors: (state: IAuthStoreState) => {
      return state.authErrors
    },
    getOtherUsers: (state: IAuthStoreState) => {
      return state.otherUsers
    }
  },
  persist: {
    storage: persistedState.localStorage,
  }
})
