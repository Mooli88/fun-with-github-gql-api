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
		// render: (text: string) => <a>{text}</a>,
	},
	{
		title: '⭐ Stars',
		dataIndex: 'stargazerCount',
		key: 'stargazerCount',
		// render: (text: string) => <a>{text}</a>,
	},
	{
		title: '🍴 Fork Count',
		dataIndex: 'forkCount',
		key: 'forkCount',
		// render: (text: string) => <a>{text}</a>,
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
	// const { data, error, loading, refetch, fetchMore } = useQuery<{ search: IReposData }, IReposVars>(GET_REPOS, {
	// 	variables: {
	// 		query: 're language:JavaScript stars:>10000 sort:stars',
	// 	},
	// 	onCompleted({ search }) {
	// 		console.log('onCompleted -> search', search.edges[0].node.name);
	// 	},
	// 	onError(err) {
	// 		console.log('onError -> err', err);
	// 	},
	// });
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
	console.log('dataSource', dataSource);
	const { pageInfo, repositoryCount } = data!.search;
	console.log('repositoryCount', repositoryCount);

	return (
		<div>
			<Spin tip='Loading...' spinning={loading}>
				<Table {...{ columns, dataSource }} />
			</Spin>
			{dataSource?.length && (
				<Button type='primary' loading={loading} onClick={fetchMore}>
					Load More! {repositoryCount}/ {repositoryCount - dataSource.length}
				</Button>
			)}
		</div>
	);
};

export default Repositories;
