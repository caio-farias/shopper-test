import { MongoClient, ServerApiVersion } from 'mongodb'
import { ObjectId } from 'bson'
import productsData from './productsData'

const DB_URL = process.env.MONGODB_URL

const client = new MongoClient(DB_URL, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

function compareString(a, b) {
	if (a.name < b.name) return -1
	else if (a.name > b.name) return 1
	return 0
}

const seedProductsData = async () => {
	const date = new Date()
	const stockCol = client.db('shopper-db').collection('stock')
	const productsStockCol = client.db('shopper-db').collection('productStock')
	const prodNum = await stockCol.countDocuments()
	if (!prodNum) {
		console.log('Creating stock..')
		const { insertedId } = await stockCol.insertOne({
			name: 'stock-test',
			location: {
				street: 'Avenida Teste da Silva',
				city: 'Natal',
				state: 'Rio Grande do Norte',
				zip: '59152-666',
			},
			createdAt: date,
			updatedAt: date,
		})

		productsData.sort(compareString)

		await productsStockCol.insertMany(
			productsData.map((p) => ({
				name: p.name,
				qtyStock: +p.qty_stock,
				price: +p.price,
				stockId: insertedId,
				createdAt: date,
				updatedAt: date,
			}))
		)
	} else {
		console.log('Stock already created!')
	}
	console.log('Done seeding..')
	console.log('Closing MongoDB driver connection..')
	await client.close()
}

client.on('commandStarted', (started) => console.log(started))

export const initDatabase = async () => {
	await seedProductsData()
}

initDatabase()
export default client
