/* eslint-disable @typescript-eslint/no-empty-interface */
import { Request } from 'express'

export interface RequestParams {
	id?: string
}

export interface ResponseBody {}

export interface RequestBody {
	data?: any
}

export interface ProductRequestQuery {
	offset?: string
	size?: string
	name?: string
	maxQtyStock?: string
	minQtyStock?: string
	minPrice?: string
	maxPrice?: string
	brand?: string
	category?: string
}

export interface OrderRequestQuery {
	offset?: string
	size?: string
	userName?: string
}

export type ProductRequestContent = Request<
	RequestParams,
	ResponseBody,
	RequestBody,
	ProductRequestQuery
>

export type OrderRequestContent = Request<
	RequestParams,
	ResponseBody,
	RequestBody,
	OrderRequestQuery
>
