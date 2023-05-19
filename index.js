const { gql, ApolloServer } = require ("apollo-server") // Importa configuração inicial

const produtos = [
    {
      id: 1,
      nome: 'Notebook',
      valor: 200000,
      marca: 'Samsung'
    },
    {
      id: 2,
      nome: 'tv',
      valor: 6000.50,
      marca: 'LG'
    }
]

const usuarios = [
    {
       id: 1,
       nome: 'Vitoria',
       salario: 15512522.2,
       ativo: true,
       idade: 17
    },

    {
        id: 2, 
        nome: 'Maria',
        salario: 50,
        ativo: false,
        idade: 19
    }
]          

// Query inicial
const typeDefs = gql `
   type Produto {
    id: ID
    nome: String
    valor: Float
    marca: String
   }

   type Usuario {
      idade: Int
      salario: Float
      nome: String
      ativo: Boolean
      id: ID
    
   }

   
   type Query {
    usuarios: [Usuario] 
    produtos: [Produto]
    usuario(id: Int, marca: String, nome: String): Usuario
    produto(id: Int, marca: String, nome: String): Produto
    
   }
`
// Precisa de dois parametros iniciais. Definição de tipo e resolvers
// Query que esta resolvendo o typeDefs
 resolvers = {
    Query: {
        usuarios () {
            return usuarios;    
        },
        usuario(_, args) {
            const {id, nome} = args; // desestruração para pegar id e nome
            if(id)return usuarios.find(usuario => usuario.id === args.id) //Listar Id
            return usuarios.find(usuario => usuario.nome === args.nome) //Listar nome
            
        },
        produtos () {
            return produtos;
        },
        produto(_, args) {
            const { id, valor} = args;
            if(id) return produtos.find(produto => produto.id === args.id)
            return produtos.find(produto => produto.marca === args.marca)
        }
    }
}
   
const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen()






