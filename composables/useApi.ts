import type { IValidationError } from "~/stores/authStore"

export type THTTPMetod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export interface IUseApiOptions {
  method: THTTPMetod
  body?: object
}

export interface ServerError {
  response: any
}

export interface FetchingCathchingErrorInterface {
  message: string
  error: string
  status: number
}

export interface IApiOKResponse {
  status: number
  statusCode: number
  message: string
  body: any
}

export interface IApiErrorResponse {
  status: number
  statusCode: number
  message: string
  error: string
  errors?: IValidationError[]
  stack?: string
}

export const useApi = async (path: any, options?: IUseApiOptions): Promise<IApiOKResponse | IApiErrorResponse> => {
  try {
    if (!options) options = {
      method: 'GET'
    }
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    const baseURL = String(config.public.baseURL)

    const data: IApiOKResponse = await $fetch(path, {
      baseURL,
      ...options,
      headers: {
        Authorization: authStore.getUserToken
      }
    })

    return data
  } catch (error: any | ServerError) {
    const errorResponse: IApiErrorResponse = error.response?._data
    if (errorResponse) return errorResponse

    return error
  }
}
