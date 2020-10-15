import { Layout } from 'antd';
import React from 'react';
import { createUseStyles } from 'react-jss';

const { Content, Sider } = Layout;

const useStyles = createUseStyles({
  content: {
    padding: '2rem',
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
});

interface IRenderSidebarItem {
  key: string;
  icon: React.ReactNode;
  node: React.ReactNode | Element;
}

interface Props {
  // sidebarItems: IRenderSidebarItem[];
  // defaultSelectedKeys?: string[];
}

const Frame: React.FC<Props> = ({ children }) => {
  if (!Array.isArray(children)) {
    throw new Error(
      'Frame must have 2 direct children. [0] as Sidebar and [1] as body'
    );
  }
  const { layout, content } = useStyles();
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        {children[0]}
      </Sider>
      <Layout className={layout} style={{ marginLeft: 200 }}>
        <Content className={content}>{children[1]}</Content>
      </Layout>
    </Layout>
  );
};

export default Frame;
