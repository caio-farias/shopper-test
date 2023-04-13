import req from 'supertest'
import app from '../src/app'
import { generateCpf } from '../src/util/util.module'
import { ObjectId } from 'bson'

const apiContext = process.env.CONTEXT_PATH || '/api/v1'

describe('GET /product/:id', () => {
	test('should respond a product json and status 200 OK', async () => {
		const id = '64317a682adb3c5c5aa4d278'
		const res = await req(app)
			.get(apiContext + `/product/${id}`)
			.set('Accept', 'application/json')
		expect(res.headers['content-type']).toMatch(/json/)
		expect(res.status).toEqual(200)
		expect(res.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			})
		)
		console.log(res.body)
	})

	test('should respond a error json response and status 500', async () => {
		const id = 'abc85564ac37fe438811ecfe'
		const res = await req(app)
			.get(apiContext + `/product/${id}`)
			.set('Accept', 'application/json')
		expect(res.headers['content-type']).toMatch(/json/)
		expect(res.status).toEqual(400)
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 400,
			})
		)
	})
})

const mockUser = {
	name: 'test',
	email: new ObjectId() + '@email.com',
	// cpfCnpj: generateCpf(),
	birthDate: new Date(),
	address: {
		street: 'Avenida teste',
		state: 'Estado Teste',
		city: 'Cidade teste',
		zip: '59152822',
	},
}

const mockUserWithSameEmail = {
	name: 'test',
	email: 'teste@email.com',
	birthDate: new Date(),
	address: {
		street: 'Avenida teste',
		state: 'Estado Teste',
		city: 'Cidade teste',
		zip: '59152822',
	},
}

describe('POST /user', () => {
	test('should create user json and status 200 OK', async () => {
		const res = await req(app)
			.post(apiContext + '/user')
			.set('Accept', 'application/json')
			.send(mockUser)
		expect(res.headers['content-type']).toMatch(/json/)
		expect(res.status).toEqual(200)
		expect(res.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			})
		)
		console.log(res.body)
	})

	test('should respond a error json response and status 500', async () => {
		const res = await req(app)
			.post(apiContext + '/user')
			.set('Accept', 'application/json')
			.send(mockUserWithSameEmail)
		expect(res.headers['content-type']).toMatch(/json/)
		expect(res.status).toEqual(422)
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 422,
			})
		)
	})
})

const mockOrder = {
	ownerId: '64317efd8c7ba4d0273c1491',
	stockId: '64317a682adb3c5c5aa4d26e',
	deliveryDate: new Date(),
	productsToBeOrdered: [
		{ id: '64317a682adb3c5c5aa4d277', qty: 3 },
		{ id: '64317a682adb3c5c5aa4d278', qty: 4 },
		{ id: '64317a682adb3c5c5aa4d279', qty: 5 },
	],
}

const mockOrderMissingProduct = {
	ownerId: '64305d66d6544dbfb13ed6e7',
	stockId: '64305b9eeeffd57698c28def',
	deliveryDate: new Date(),
	productsToBeOrdered: [
		{ id: 'ABC317a682adb3c5c5aa4d277', qty: 1000000000 },
		{ id: '64317a682adb3c5c5aa4d278', qty: 4 },
		{ id: '64317a682adb3c5c5aa4d279', qty: 5 },
	],
}

describe('POST /order', () => {
	test('should create order and return order with status 200 OK', async () => {
		const res = await req(app)
			.post(apiContext + '/order')
			.set('Accept', 'application/json')
			.send(mockOrder)
		expect(res.headers['content-type']).toMatch(/json/)
		expect(res.status).toEqual(200)
		expect(res.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			})
		)
	})

	test('should fail to create and order and return response with status 400', async () => {
		const res = await req(app)
			.post(apiContext + '/order')
			.set('Accept', 'application/json')
			.send(mockOrderMissingProduct)
		expect(res.headers['content-type']).toMatch(/json/)
		expect(res.status).toEqual(422)
		expect(res.body).toEqual(
			expect.objectContaining({
				status: 422,
			})
		)
		console.log(res.body)
	})
})
