import axios, { InternalAxiosRequestConfig } from 'axios'
import { environment } from '../environment/environment'

const api = axios.create({ baseURL: environment.apiBaseUrl })

const setTokenMiddleware = (config: InternalAxiosRequestConfig) => {
	const token = ''
	return {
		...config,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	} as InternalAxiosRequestConfig
}

api.interceptors.request.use(setTokenMiddleware)

export default api
