import React, { useEffect, useState } from 'react'
import { Card, Table } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import ViewService from './ViewService';
import { Outlet } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Meta } = Card;

// const ProductCard = () => {




//     return (

//         <div>
         
//             <Card
//                 hoverable
//                 className='ProductCard'

//                 cover={<img alt="example" src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg" />}
//             >
//                 <Meta title="Home Cleaning Service" description="" />
//                 <div style={{ marginTop: '20px' }}> Area: southampton </div>
//                 <div className='priceFont'>￡49.50</div>
//                 <div className='view'>
//                     <div style={{ marginTop: '10px',display:'inline'}}>Rating: 4.5</div>
//                     <NavLink  className="nav-link" to="viewservice" >VIEW</NavLink>
//                 </div>

//             </Card>
//             <Outlet/>
//         </div>
//     );

// };

const ProductCard = () => {
       


    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
        },
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
    ];

//     /* 在函数式组件里面使用useState来定义数据 []就是初始值
//  setData是在给data赋值的时候使用 */
//     let [data, setData] = useState([]);

//     // 这个total用作花式分页，如果api传来的数据中有‘total’这一项的话
//     // let [total, setTotal] = useState(0);

    /* 在组件挂载或者即将挂载的时候调用*/
    useEffect(() => {
        // console.log(document.getElementsByClassName('ant-table-cell')[0])
        let timer = setTimeout(() => {
            showTable();
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    // useEffect(() => {},[])的‘[]’意味着只有数据第一次被捕获时才应该渲染数组
    // 已经测试过，如果这里不用useEffect()，showTable()会无限渲染

    

    const[data, setData] = useState()
    const showTable = () => {
        
        // getAuthorization();
        // token鉴权的时候用一下（POST）
        axios.get('http://51.104.196.52:8090/api/v1/public/service/category', {
            
        })
            .then(res => {

                let { data } = res.data;

                console.log(res.data)
                // 这里的r是data里的每一个对象 i初始值为零每一轮+1

                data.forEach((r: { key: any; }, i: any) => {
                    r.key = i+1;
                });
                setData(data)
            })
    }


    return (
        <div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default ProductCard;




