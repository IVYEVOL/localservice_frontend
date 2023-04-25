import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Pagination, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { getToken } from '../../../utils/tools';

// interface DataType {
//     key: string;
//     name: string;
//     age: number;
//     address: string;
//     tags: string[];
// }









const App: React.FC = () => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
    
        {
            title: 'Action',
            key: 'action',
            render: (text: any) => (
                <Space size="middle">
                    <a>check Detail</a>
                    <a onClick={del.bind(this,text)}>Reject</a>
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
    
    // 删除的逻辑
    const del = (r: any) =>{
        console.log(r)
        axios.delete('http://51.104.196.52:8090/api/v1/public/service/category/', {
            // headers:{
            //     // Authorization.sessionStorage.token
            //     Authorization: "Bearer:" + getToken()
            // }
            params: {
                id: r.ID
            },
        })
            .then(res => {
                // 删除成功后提示
                let { meta } = res.data;
                if (meta.status == 200) {
                  message.success(meta.msg);
                } else {
                  message.error(meta.msg);
                }
            })
    }


    const showTable = () => {
        axios.get('http://51.104.196.52:8090/api/v1/public/service/category', {
            // headers:{
            //     Authorization.sessionStorage.token
            // }
            // params: {
            //     pagenum,
            //     pagesize,
            //     query
            // },
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
                    r.key = i;
                });
                setData(data)
            })
    }


    return (
        <div>
            <Table columns={columns} dataSource={data}/>
            {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
            {/* <Pagination
            style={{marginTop:'10px'}}
                total={total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} providers`}
            /> */}
        </div>


    )
}

export default App;