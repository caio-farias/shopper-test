import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
	log: [
		{
			emit: 'event',
			level: 'query',
		},
		{
			emit: 'stdout',
			level: 'error',
		},
	],
})

// prisma.$on('query', (e) => {
// 	console.log('--- \nQuery: ' + e.query)
// 	console.log('Params: ' + e.params)
// 	console.log('Duration: ' + e.duration + 'ms\n ---')
// })

prisma.$on('beforeExit', () => {
	console.log('\n Closing Prisma connection..')
})

export default prisma
