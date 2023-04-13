## Teste Técnico

Você vai criar um formulário simples de cadastro de pedidos de supermercado. O sistema deve ser escrito em Python ou Javascript (node.js e/ou react.js).
Quando terminar os requisitos, nos avise para que você possa nos apresentar seu código e responder algumas perguntas sobre suas decisões.

Além da funcionalidade, avaliaremos principalmente organização e clareza no código, lembre-se que um programador lê mais código do que escreve, então códigos limpos e bem estruturados facilitam a vida de todos.

Junto desse documento você receberá o arquivo products.csv , que é uma lista com produtos disponíveis e seus respectivos preços e estoque com as seguintes definições:

```
id = id do produto
name = nome do produto
price = preço do produto em reais.
qty_stock = quantidade em estoque

```

## Abaixo listamos os requisitos que seu sistema deve atender:

- [ ] O sistema deve ter um formulário de cadastro de pedidos
- [ ] O usuário deve entrar com Nome do Cliente, Data de Entrega e uma lista de compras.
- [ ] A lista de compras é composta por um ou mais produtos e a quantidade solicitada para cada um deles.
- [ ] O usuário pode alterar a quantidade de itens já cadastrados ou excluir um item que ele não queira mais.
- [ ] A cada alteração na lista de compras o sistema deve calcular o valor total do pedido.
- [ ] Todas essas informações devem ser salvas em um banco de dados que você vai modelar.
- [ ] Cada pedido salvo deve debitar a quantidade do produto correspondente de seu estoque.
- [ ] O sistema deve alertar o usuário caso a quantidade solicitada não esteja disponível no estoque.
- [ ] O sistema também deve ter uma função para mostrar o estoque atual exibindo: Nome do produto e a quantidade em estoque.

# Schema Design(https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)

## Embedding

### Advantages

    - You can retrieve all relevant information in a single query.
    - Avoid implementing joins in application code or using $lookup.
    - Update related information as a single atomic operation. By default, all CRUD operations on a single document are ACID compliant.
    - However, if you need a transaction across multiple operations, you can use the transaction operator.
    - Though transactions are available starting 4.0, however, I should add that it's an anti-pattern to be overly reliant on using them in your application.

### Limitations

        - Large documents mean more overhead if most fields are not relevant. You can increase query - performance by limiting the size of the documents that you are sending over the wire for each query.
        - There is a 16-MB document size limit in MongoDB. If you are embedding too much data inside a single document, you could potentially hit this limit.

## Referencing

        Okay, so the other option for designing our schema is referencing another document using a document's unique object ID and connecting them together using the $lookup operator. Referencing works similarly as the JOIN operator in an SQL query. It allows us to split up data to make more efficient and scalable queries, yet maintain relationships between data.

### Advantages

    - By splitting up data, you will have smaller documents.
    - Less likely to reach 16-MB-per-document limit.
    - Infrequently accessed information not needed on every query.
    - Reduce the amount of duplication of data. However, it's important to note that data duplication should not be avoided if it results in a better schema.

### Limitations

    - In order to retrieve all the data in the referenced documents, a minimum of two queries or $lookup required to retrieve all the information.
