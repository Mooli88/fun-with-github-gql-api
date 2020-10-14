import { ApolloClient, InMemoryCache } from '@apollo/client';

const { REACT_APP__GITHUB_TOKEN: TOKEN } = process.env;

export default new ApolloClient({
	uri: 'https://api.github.com/graphql',
	cache: new InMemoryCache(),
	headers: {
		authorization: `bearer ${TOKEN}`,
	},
});
