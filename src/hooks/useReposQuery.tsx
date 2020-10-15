import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOS } from '../graphql/schema';
import { IReposData, IReposVars } from '../graphql/types';

interface IQueryOptions {
  keyword: string;
  stars: number;
  sortBy: 'stars' | 'forks' | 'updated' | 'help-wanted-issues';
}

const DEFAULT_QUERY_OPTIONS: IQueryOptions = {
  keyword: 're',
  stars: 10000,
  sortBy: 'stars',
};

interface Props {
  queryVars?: IQueryOptions;
  onComplete?: (data: IReposData) => void;
}

function parseQueryVars(queryVars: IQueryOptions) {
  return `${queryVars.keyword} stars:>${queryVars.stars} sort:${queryVars.sortBy} language:JavaScript`;
}

const useReposQuery = ({ onComplete, queryVars = DEFAULT_QUERY_OPTIONS }: Props = {}) => {
  const query = parseQueryVars(queryVars);
  const [loadingState, setLoadingState] = useState(false);
  const { data, fetchMore, loading, ...options } = useQuery<{ search: IReposData }, IReposVars>(GET_REPOS, {
    variables: {
      query,
    },
    onCompleted({ search }) {
      onComplete && onComplete(search);
    },
    onError(err) {
      console.log('onError -> err', err);
    },
  });
  const isLoading = loadingState || loading;

  const refetch = async (vars: IQueryOptions = queryVars) =>
    options.refetch({
      query: parseQueryVars(vars),
    });

  const loadMore = async () => {
    const { pageInfo: currPageInfo } = data!.search;
    setLoadingState(true);
    await fetchMore({
      variables: {
        query,
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

  return { ...options, data, fetchMore: loadMore, loading: isLoading, refetch };
};
export default useReposQuery;
