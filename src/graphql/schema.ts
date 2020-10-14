import { gql } from '@apollo/client';

export const GET_REPOS = gql`
	query GetRepos($query: String!, $last: Int = 4, $cursor: String = null) {
		search(query: $query, last: $last, after: $cursor, type: REPOSITORY) {
			repositoryCount
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
			edges {
				cursor
				node {
					... on Repository {
						name
						repositoryTopics(first: 4) {
							nodes {
								topic {
									name
								}
							}
						}
						forkCount
						stargazerCount
					}
				}
			}
		}
	}
`;
