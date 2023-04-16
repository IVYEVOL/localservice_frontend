import React, {useState} from 'react';
// import './index.css';
import { DownOutlined ,ExclamationCircleFilled} from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table, Button, Modal } from 'antd';

interface DataType {
  key: React.Key;
  provider: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
  reviewNum: string;
  badReviewNum: string
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  service: string;
  reviewNum: string;
  badReviewNum: string;
}

const App: React.FC = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      // { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'No', dataIndex: 'key', key: 'key' },
      { title: 'Service', dataIndex: 'service', key: 'service' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="In Service" />,
      },
      { title: 'Review Number', dataIndex: 'reviewNum', key: 'reviewNum' },
      { title: 'Bad Review Number', dataIndex: 'badReviewNum', key: 'badReviewNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Service Detail</a>
            <a>Detail Reviews</a>
            <Button type="primary" onClick={serviceBan} danger>
                Ban
            </Button>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: (i+1).toString(),
        date: '2014-12-24 23:12:00',
        service: 'Laundry',
        reviewNum: '123',
        badReviewNum: '12'
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'No', dataIndex: 'key', key: 'key' },
    { title: 'Provider', dataIndex: 'provider', key: 'provider' },
    { title: 'Review Number', dataIndex: 'reviewNum', key: 'reviewNum' },
    { title: 'Bad Review Number', dataIndex: 'badReviewNum', key: 'badReviewNum' },
    // { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    // { title: 'Version', dataIndex: 'version', key: 'version' },
    // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => (
      <Space size="middle">
      {/* <a>Invite {record.name}</a> */}
      <a href='#'>Check detail</a>
      {/* <a>Approve</a> */}
      <Button type="primary" onClick={providerBan} danger>
          Ban
      </Button>
    </Space>
    ) },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; ++i) {
    data.push({
      key: (i+1).toString(),
      provider: 'Provider '+ (i+1).toString(),
      reviewNum: '1234',
      badReviewNum: '123',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

const { confirm } = Modal;

const providerBan = () => {
  confirm({
    title: 'Do you Want to Ban this provider?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const serviceBan = () => {
  confirm({
    title: 'Do you Want to ban this service?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};



  return (
    <>
      <Table
        columns={columns}
        // expandable={{expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        expandable={{expandedRowRender}}
        dataSource={data}
        bordered
        // size="middle"
        // size="small"
      />
    </>
  );
};

export default App;