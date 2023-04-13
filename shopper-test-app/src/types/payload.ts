export interface ResponsePaginated<T> {
	data: Page<T>
	status: number
}

export interface Response<T> {
	data: T
	header: any
	status: number
}

export interface Page<T> {
	data: T[]
	size: number
}
