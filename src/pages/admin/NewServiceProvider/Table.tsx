import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Pagination, message, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import {getAuthorization, getToken } from '../../../utils/tools';
import { ExclamationCircleFilled } from '@ant-design/icons';


const App: React.FC = () => {

    const { confirm } = Modal;

    const providerBan = (r: any) => {
      confirm({
        title: 'Do you Want to Ban this provider?',
        icon: <ExclamationCircleFilled />,
        content: 'Are you sure?',
        onOk() {
          console.log(r)
            del(r)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };


    const providerApr = (r: any) => {
        confirm({
          title: 'Do you want to approve this provider?',
          icon: <ExclamationCircleFilled />,
          content: 'Are you sure?',
          onOk() {
            console.log(r)
              apr(r)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

          // 删除的逻辑
    const del = (r: any) =>{
        // console.log(r)
        getAuthorization();
        axios.delete('http://51.104.196.52:8090/api/v1/user/'+r.ID, {

        })
            .then(res => {
                // console.log(res);
                // console.log(res.data.code)
                // 删除成功后提示
                // let { meta } = res.data;
                if (res.data.code == 200) {
                  message.success(res.data.msg);
                } else {
                  message.error(res.data.msg);
                }
                // 删除后延迟两秒重新加载table
                setTimeout(() => {
                    showTable();
                }, 200)

            })
    }

      // 更改service status的逻辑
  const apr = (r: any) => {
    getAuthorization();
    axios.patch('http://51.104.196.52:8090/api/v1/user/approve/' + r.ID, {
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
  

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            width:70
        },
        {
            title: 'Provider ID',
            dataIndex: 'ID',
            key: 'ID',
            width:90
        },
        {
            title: 'Service Provider Name',
            dataIndex: 'nick_name',
            key: 'nick_name',
            width:200
        },
        {
            title: 'Phone number',
            dataIndex: 'mobile',
            key: 'mobile',
            width:110
        },
        {
            title: 'Description',
            dataIndex: 'text',
            key: 'text',
            width: 280
        },
    
        {
            title: 'Action',
            key: 'action',
            render: (text: any) => (
                <Space size="middle">
                    <a>check Detail</a>
                    <Button type="primary" onClick={providerBan.bind(this,text)} >
                        Approve
                    </Button>
                    <Button type="primary" onClick={providerBan.bind(this,text)} danger>
                        Ban
                    </Button>
                    
                    {/* <a onClick={del.bind(this,text)}>Reject</a> */}
                </Space>
            ),
            
        },
    ];

    /* 在函数式组件里面使用useState来定义数据 []就是初始值
 setData是在给data赋值的时候使用 */
    let [data, setData] = useState([]);

    // 这个total用作花式分页，如果api传来的数据中有‘total’这一项的话
    // let [total, setTotal] = useState(0);


    // window.timer = null;

    /* 在组件挂载或者即将挂载的时候调用*/
    useEffect(() => {
        console.log(document.getElementsByClassName('ant-table-cell')[0])
        /* 利用防抖来解决useEffect执行两次的问题 */
        // clearTimeout(window.timer);
        // window.timer = setTimeout(() => {
        //     showTable();
        // }, 0)
        showTable();
        // window.timer 实在还是爆红的话，直接下面这行
        // showTable();

    }, [])

    



    //后端请求
    const showTable = () => {
        getAuthorization();
        axios.post('http://51.104.196.52:8090/api/v1/user/provider_list', {
            
        })
            .then(res => {

                let { data, total } = res.data;
                // let { data: { users, total } } = res.data;

                console.log(res.data)
                // 这里的r是data里的每一个对象 i初始值为零每一轮+1

                // js 的写法
                // data.forEach((r, i) => {
                //     r.key = i;
                // });
                data.forEach((r: { key: any; }, i: any) => {
                    r.key = i+1;
                });
                setData(data)
            })
    }


    return (
        <div>
            <Table columns={columns} 
                dataSource={data} 
                bordered
                pagination={{ pageSize: 8 }} 
                scroll={{ x:950, y: 400 }}/>
        </div>


    )
}

export default App;