import React, { useEffect, useRef, useState } from 'react';
// import './index.css';
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Badge, InputRef, Modal, message } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { getAuthorization } from '../../../utils/tools';
import axios from 'axios';

interface DataType {
  key: number;
  // ID: service id
  ID: number;
  // user_id: provider id
  user_id: number;
  // service title
  title: string;
  // service city
  city: string;
  // service category
  category: string
  // service mobile
  mobile: string
  // service status
  Status: string
}

type DataIndex = keyof DataType;

const App: React.FC = () => {


  const { confirm } = Modal;

  const serviceReject = (r: any) => {
    confirm({
      title: 'Do you want to REJECT service ' + r.ID + '?',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        delService(r)
      },
      onCancel() {
      },
    });
  };

  // 删除的逻辑
  const delService = (r: any) => {
    getAuthorization();
    // delete service
    axios.delete('http://51.104.196.52:8090/api/v1/service/delete/' + r.ID, {
    })
      .then(res => {
        if (res.data.code == 200) {
          message.success(res.data.msg);
        } else {
          message.error(res.data.msg);
        }
        setTimeout(() => {
          showTable();
        }, 200)

      })
  }

  const serviceApprove = (r: any) => {
    confirm({
      title: 'Do you want to APPROVE this service?',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        aprService(r)
      },
      onCancel() {
      },
    });
  };

  // 更改service status的逻辑
  const aprService = (r: any) => {
    getAuthorization();
    axios.patch('http://51.104.196.52:8090/api/v1/service/approve/' + r.ID, {
    })
      .then(res => {
        if (res.data.code == 200) {
          message.success(res.data.msg);
        } else {
          message.error(res.data.msg);
        }
        setTimeout(() => {
          showTable();
        }, 200)

      })
  }

  /* 在组件挂载或者即将挂载的时候调用*/
  useEffect(() => {
    // console.log(document.getElementsByClassName('ant-table-cell')[0])
    let timer = setTimeout(() => {
      showTable();
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const [data, setData] = useState()
  const showTable = () => {

    getAuthorization();
    axios.post('http://51.104.196.52:8090/api/v1/public/service/all_service', {

    })
      .then(res => {

        let { data } = res.data;

        data.forEach((r: { key: any; }, i: any) => {
          r.key = i + 1;
        });
        setData(data)
      })
  }


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
      fixed:'left',
      width:70
    },
    {
      title: 'Provider ID',
      dataIndex: 'user_id',
      key: 'user_id',
      ...getColumnSearchProps('user_id'),
      sorter: (a, b) => a.user_id - b.user_id,
      sortDirections: ['descend', 'ascend'],
      width:120
    },
    {
      title: 'Service ID',
      dataIndex: 'ID',
      key: 'ID',
      ...getColumnSearchProps('ID'),
      sorter: (a, b) => a.ID - b.ID,
      sortDirections: ['descend', 'ascend'],
      width:120
    },
    {
      title: 'Service Category',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
      width:180
    },
    {
      title: 'Service Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      width:180
    },
    {
      title: 'Service City',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city'),
      width:140
    },
    {
      title: 'Service Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      ...getColumnSearchProps('mobile'),
      width:200
    },
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
          
      },
      sorter: (a, b) => a.Status.length - b.Status.length,
      sortDirections: ['descend', 'ascend'],
      width:120
    },

    {
      title: 'Action',
      key: 'action',

      render: (text) => (
        <Space size="small">

          <a onClick={checkServiceDetail.bind(this, text)}>Check detail</a>

          <Button type="primary" onClick={serviceApprove.bind(this, text)}>
            approve
          </Button>
          <Button type="primary" onClick={serviceReject.bind(this, text)} danger>
            Reject
          </Button>
        </Space>
      ),
      fixed:'right'
      
    },
  ];

  // const checkServiceDetail=(r:any)=>{
  //   let url = 'http://localhost:5173/admin/service_detail/' + r.ID;
  //   window.open(url)
    
  // }
  const checkServiceDetail=(r:any)=>{
    let url = 'http://localhost:5173/admin/service_detail/' + r.ID;
    window.location.href=url
    
  }

  return <Table columns={columns}
                dataSource={data} 
                bordered
                pagination={{ pageSize: 8 }} 
                scroll={{ x:1360, y: 400 }} />;
};

export default App;