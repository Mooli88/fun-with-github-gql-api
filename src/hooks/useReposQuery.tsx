import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOS } from '../graphql/schema';
import { IReposData, IReposVars } from '../graphql/types';

interface Props {
	autoFetch?: boolean;
	onComplete?: (id: string) => void;
}

const useReposQuery = ({ autoFetch, onComplete }: Props = {}) => {
	const [loadingState, setLoadingState] = useState(false);
	const { data, fetchMore, loading, ...options } = useQuery<{ search: IReposData }, IReposVars>(GET_REPOS, {
		variables: {
			query: 're language:JavaScript stars:>10000 sort:stars',
		},
		onCompleted({ search }) {
			console.log('onCompleted -> search', search.edges[0].node.name);
		},
		onError(err) {
			console.log('onError -> err', err);
		},
	});
	const isLoading = loadingState || loading;

	const loadMore = async () => {
		const { pageInfo: currPageInfo } = data!.search;
		setLoadingState(true);
		await fetchMore({
			variables: {
				query: 're language:JavaScript stars:>10000 sort:stars',
				cursor: currPageInfo.endCursor,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				const newEdges = fetchMoreResult!.search.edges;
				const { pageInfo, repositoryCount } = fetchMoreResult!.search;

				return newEdges!.length
					? {
							search: {
								pageInfo,
								repositoryCount,
								edges: [...previousResult.search.edges, ...newEdges!],
								__typename: previousResult.search.__typename,
							},
					  }
					: previousResult;
			},
		});
		setLoadingState(false);
	};

	return { data, fetchMore: loadMore, loading: isLoading, ...options };
};

export default useReposQuery;
