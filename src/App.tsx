import { gql, useQuery } from '@apollo/client';
import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import './App.css';
import Frame from './components/Frame';
import Repositories from './components/Repositories';

const ME = gql`
	{
		viewer {
			login
			avatarUrl
		}
	}
`;

function App() {
	const { data } = useQuery(ME, {
		onCompleted({ viewer }) {
			console.log('onCompleted -> data', viewer);
		},
	});
	console.log('data?.viewer', data?.viewer);

	return (
		<div className='App'>
			<Frame>
				<div>
					<Card>
						<Meta
							avatar={<Avatar size={64} src={data?.viewer.avatarUrl} />}
							description={`Welcome ${data?.viewer?.login}`}
							// description='This is the description'
						/>
					</Card>
				</div>
				<Repositories />
			</Frame>
		</div>
	);
}

export default App;
