import { Tag } from 'antd';
import React, { useMemo } from 'react';
import { ITopic } from '../graphql/types';

interface Props {
	topic: ITopic;
}

function setTopicColour(topicName: string) {
	switch (topicName) {
		case 'react':
			return 'geekblue';

		case 'javascript':
			return 'volcano';

		case 'redux':
			return 'purpole';

		default:
			return 'green';
	}
}

const TopicTag = ({ topic: { name } }: Props) => {
	const color = useMemo(() => setTopicColour(name), [name]);

	return <Tag {...{ color }}>{name.toUpperCase()}</Tag>;
};

export default TopicTag;
