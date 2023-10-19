import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//demo user data
const users = [
    {
        id: 1,
        name: "mjsf",
        email: "mjsf@1234",
        age: 21,
    },
    {
        id: 2,
        name: "yash",
        email: "yash@1234",
    },
    {
        id: 3,
        name: "ayush",
        email: "ayush@1234",
        age: 21,
    },
];
// definition
const location = "Bengaluru";
const bio = " hey my name is Mrityunjay saraf and i'm from IIT gandhinagr";
//type definition
const typeDefs = ` 
type Query{
    users(query:String):[User!]!
    me : User!,
    post : Post! 
       
}

type User{
    id : ID!
    name : String!
    email: String!
    age:Int
}

type Post{
    id : ID!
    title : String!
    body: String!
    published:Boolean!
}
`;
//resolver
const resolvers = {
    Query: {
        me() {
            return {
                id: "1",
                name: "mike",
                email: "mike@1234",
                age: 23,
            };
        },
        post() {
            return {
                id: "2",
                title: "this is the post title",
                body: "this is the post body",
                published: true,
            };
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter((e) => {
                return e.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
    },
};
// const server = new GraphQLServer({
//   typeDefs,
//   resolvers,
// });
// server.start(() => {
//   console.log(`the server is running `);
// });
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
});
console.log(`🚀  Server ready at: ${url}`);
