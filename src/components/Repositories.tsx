import { Alert, Button, Spin, Table } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { IRepoTopics } from '../graphql/types';
import useReposQuery from '../hooks/useReposQuery';
import TopicTag from './TopicTag';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '⭐ Stars',
    dataIndex: 'stargazerCount',
    key: 'stargazerCount',
  },
  {
    title: '🍴 Fork Count',
    dataIndex: 'forkCount',
    key: 'forkCount',
  },
  {
    title: 'Topics',
    key: 'repositoryTopics',
    dataIndex: 'repositoryTopics',
    render: ({ nodes: topicNodes }: IRepoTopics) => (
      <>
        {topicNodes.map(({ topic }) => (
          <TopicTag key={topic.name} {...{ topic }} />
        ))}
      </>
    ),
  },
];

interface Props {}

const Repositories: React.FC<Props> = (props) => {
  const { data, error, loading, refetch, fetchMore } = useReposQuery();

  const mapDataSource = () =>
    data?.search?.edges.map(({ node, cursor }) => ({
      key: cursor,
      ...node,
    }));

  if (loading && !data) return <Spin size='large' />;
  if (error)
    return (
      <Alert
        message="Something isn't right"
        description={error}
        type='error'
        showIcon
        closable
        onClose={() => refetch()}
      />
    );

  const dataSource = mapDataSource();
  const { pageInfo, repositoryCount } = data!.search;

  return (
    <div>
      <Spin tip='Loading...' spinning={loading}>
        <Table {...{ columns, dataSource }} />
      </Spin>
      {dataSource?.length && (
        <Button type='primary' loading={loading} onClick={fetchMore} disabled={!pageInfo.hasNextPage}>
          Load More! {dataSource.length}/{repositoryCount}
        </Button>
      )}
    </div>
  );
};

export default Repositories;
