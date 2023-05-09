import React, {useEffect, useState} from 'react';
// import './index.css';
import { DownOutlined ,ExclamationCircleFilled} from '@ant-design/icons';
import { TableColumnsType, message } from 'antd';
import { Badge, Dropdown, Space, Table, Button, Modal } from 'antd';
import axios from 'axios';
import { getAuthorization } from '../../../utils/tools';

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

    useEffect(() => {
        // console.log(document.getElementsByClassName('ant-table-cell')[0])
        getAllProvider()
    }, [])

    const[providers, setProviders] = useState()
    const getAllProvider = () =>{
        getAuthorization();
        axios.post('http://51.104.196.52:8090/api/v1/user/provider_list', {

        })
            .then(res => {
                let { data } = res.data;
                console.log(data);
                
                data.forEach((r: { key: any; }, i: any) => {
                    r.key = i+1;
                });
                setProviders(data)
            })
    }
    
    const [expandedRowRecord, setExpandedRowRecord] = useState();
    const handldOnExpand = (expanded: any, record: any) => {
        console.log(expanded);
        console.log('record');
        
        console.log(record);
        console.log(record.ID)
        
        // if(!expanded)  return  //如果是关闭就返回
        getServiceByProviderID(record) 
        // const providerID = record.ID
               
      }

    // 根据provider id 获取其下所有service的逻辑
    const getServiceByProviderID = (r: any) =>{
        getAuthorization()
        axios.get('http://51.104.196.52:8090/api/v1/service/provider_service/'+r.ID, {

        })
            .then(res => {
                let { data } = res.data;
                console.log('get service by provider ID');
                
                console.log(data);
                
                data.forEach((r: { key: any; }, i: any) => {
                    r.key = i+1;
                });
                setExpandedRowRecord(data)
            })
    }



  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      // { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'No', dataIndex: 'key', key: 'key' },
      { title: 'Service ID', dataIndex: 'ID', key: 'ID' },
      { title: 'Service', dataIndex: 'title', key: 'title' },
      {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
        render: (text: any) => {
            
            if (text == 'Pending' || text == 'pending'){
                return (<Badge status='warning' text={text}/>)
            } else if (text == 'Approved' || text == 'approved'){
                return (<Badge status='success' text={text}/>)
            }
            
        }
      },
      { title: 'Review Number', dataIndex: 'reviewNum', key: 'reviewNum' },
      { title: 'Bad Review Number', dataIndex: 'badReviewNum', key: 'badReviewNum' },
      {
        title: 'Action',
        
        key: 'operation',

        render: (text: any) => (
          <Space size="middle">
            {/* <a href='#'>Service Detail</a> */}
            {/* <a>Detail Reviews</a> */}
            <a onClick={checkServiceDetail.bind(this, text)}>Check detail</a>
            <Button type="primary" onClick={checkDetailReviews.bind(this,text)} block>
                Detail Reviews
            </Button>
            <Button type="primary" onClick={serviceBan.bind(this,text)} danger>
                Ban
            </Button>
          </Space>
        ),

      },
    ];
    // const data = [];
    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: (i+1).toString(),
    //     date: '2014-12-24 23:12:00',
    //     service: 'Laundry',
    //     reviewNum: '123',
    //     badReviewNum: '12'
    //   });
    // }
    return <Table columns={columns} dataSource={expandedRowRecord} pagination={false} />;
  };

  const checkServiceDetail=(r:any)=>{
    let url = 'http://localhost:5173/admin/service_detail/' + r.ID;
    window.location.href=url
    
  }

  const checkDetailReviews=(r:any)=>{
    console.log(r.ID)
    let url = 'http://localhost:5173/admin/service_reviews/' + r.ID;
    window.open(url)
    
  }

  const columns: TableColumnsType<DataType> = [
    { title: 'No', dataIndex: 'key', key: 'key' },
    { title: 'Provider', dataIndex: 'nick_name', key: 'nick_name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'mobile', key: 'mobile' },
    // { title: 'Review Number', dataIndex: 'reviewNum', key: 'reviewNum' },
    // { title: 'Bad Review Number', dataIndex: 'badReviewNum', key: 'badReviewNum' },
    { title: 'Date', dataIndex: 'CreatedAt', key: 'CreatedAt' },
    { title: 'Action', key: 'operation', render: (text: any) => (
      <Space size="middle">
      {/* <a>Invite {record.name}</a> */}
      {/* <a onClick={()=>{window.location.href="https://baidu.com"}} >Check detail</a> */}

      {/* <a onClick={handle} >Check detail</a> */}

      {/* <a onClick={handle.bind(this,text)} >Check detail</a> */}
      

      {/* <Button type="primary" onClick={()=>{window.location.href="https://baidu.com"}} >
          Check Detail
      </Button> */}
      {/* <a>Approve</a> */}
      <Button type="primary" onClick={providerBan.bind(this,text)} danger>
          Ban
      </Button>
    </Space>
    ) },
  ];

//   const data: DataType[] = [];
//   for (let i = 0; i < 100; ++i) {
//     data.push({
//       key: (i+1).toString(),
//       provider: 'Provider '+ (i+1).toString(),
//       reviewNum: '1234',
//       badReviewNum: '123',
//       platform: 'iOS',
//       version: '10.3.4.5654',
//       upgradeNum: 500,
//       creator: 'Jack',
//       createdAt: '2014-12-24 23:12:00',
//     });
//   }

const { confirm } = Modal;

const providerBan = (r: any) => {
  confirm({
    title: 'Do you want to ban this provider?',
    icon: <ExclamationCircleFilled />,
    content: 'Are you sure?',
    onOk() {
        delProvider(r)
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const serviceBan = (r: any) => {
  confirm({
    title: 'Do you want to ban this service?',
    icon: <ExclamationCircleFilled />,
    content: 'Are you sure?',
    onOk() {
        // console.log(r.ID);
        
        delService(r)

      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const delProvider = (r: any) =>{
    getAuthorization();
    axios.delete('http://51.104.196.52:8090/api/v1/user/'+r.ID, {

    })
        .then(res => {

            if (res.data.code == 200) {
              message.success(res.data.msg);
            } else {
              message.error(res.data.msg);
            }

            setTimeout(() => {
                getAllProvider()
            }, 200)

        })
}

// const[currProviderID, setCurrProviderID] = useState()
const delService = (r: any) =>{
    console.log('r在这里')
    console.log(r);
    console.log(r.ID)
    // setCurrProviderID(r.ID)
    getAuthorization();
    axios.delete('http://51.104.196.52:8090/api/v1/service/delete/'+r.ID, {

    })
        .then(res => {

            if (res.data.code == 200) {
              message.success(res.data.msg);
            } else {
              message.error(res.data.msg);
            }
            // setTimeout(() => {
            //     // getServiceByProviderID(r)
            //     console.log('set time out log ')
            //     console.log(r);
            //     getServiceByProviderID(r)
            // }, 200)
            window.location.reload()
        });

}




  return (
    <>
      <Table
        // rowKey='rowID'
        columns={columns}
        // expandable={{expandedRowRender ,onExpand:handleExpand}}
        expandable={{expandedRowRender}}
        dataSource={providers}
        bordered
        onExpand={handldOnExpand}
        size='large'
      />
    </>
  );
};

export default App;