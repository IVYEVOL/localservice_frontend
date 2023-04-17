import React, {useState} from 'react';
// import './index.css';
import { Space, Table, Tag , Button, Modal} from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}



const data: DataType[] = [
  {
    key: '1',
    name: 'service provider 1',
    age: 32,
    address: 'New York No. 1 Lake Park',

  },
  {
    key: '2',
    name: 'service provider 2',
    age: 42,
    address: 'London No. 1 Lake Park',

  },
  {
    key: '3',
    name: 'service provider 3',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '10',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '11',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '12',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
  {
    key: '13',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },


];

const App: React.FC = () => {
  const columns: ColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'key',
    key: 'no',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Service Provider Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '字段1 eg：age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '字段2 eg：address',
    dataIndex: 'address',
    key: 'address',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  
  {
    title: 'Action',
    key: 'action',
    
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <a href='#'>Check detail</a>
        {/* <a>Approve</a> */}
        <Button type="primary">
            approve
        </Button>
        <Button type="primary" onClick={showModal} danger>
            Reject
        </Button>
      </Space>
    ),
    
  },
];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return(
    

    <>
    <Table columns={columns} dataSource={data} bordered/>
    <Modal       
        footer ={[
                <div className="btn" key="submit">
                    <Button  onClick={handleCancel}>no</Button>   
                    <Button  onClick={handleOk}>yes</Button>
                </div>
                
                ]} 
          title="Reject" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Are you sure to reject this provider?</p>


    </Modal>
  </>
  )
}

export default App;

// function NewServiceProvider() {
//   return (
//     <div>NewServiceProvider</div>
//   )
// }

// export default NewServiceProvider