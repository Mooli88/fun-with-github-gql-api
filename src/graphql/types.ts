export interface IReposVars {
  query: string;
  last?: number;
  cursor?: string;
}

export interface IPageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
}

export interface ITopic {
  name: string;
}

export interface IRepoTopics {
  nodes: {
    topic: ITopic;
  }[];
}

export interface IRepoNode {
  name: string;
  forkCount: number;
  stargazerCount: number;
  repositoryTopics: IRepoTopics;
}

export interface IEdge {
  cursor: string;
  node: IRepoNode;
  __typename: 'Repository';
}

export interface IReposData {
  repositoryCount: number;
  pageInfo: IPageInfo;
  edges: IEdge[];
  __typename: 'SearchResultItemConnection';
}
