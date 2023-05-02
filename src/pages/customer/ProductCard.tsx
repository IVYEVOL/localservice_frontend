// import React, { useEffect, useState } from 'react'
// import { Card, Table } from 'antd';
// import './customerccss.css';
// import { NavLink } from 'react-router-dom';
// import ViewService from './ViewService';
// import { Outlet } from 'react-router-dom';
// import { getAuthorization } from '../../utils/tools';
// import axios from 'axios';
// import { ExclamationCircleFilled } from '@ant-design/icons';
// import Item from 'antd/lib/list/Item';
// import { render } from 'react-dom';
// import ServiceList from '../provider/ServiceList';

// const { Meta } = Card;


// const ProductCard = () => {
//     const columns = [
//         {
//             title: 'No',
//             dataIndex: 'key',
//             key: 'key',
//         },
//         {
//             title: 'ID',
//             dataIndex: 'ID',
//             key: 'ID',
//         },
//         {
//             title: 'Name',
//             dataIndex: 'Name',
//             key: 'Name',
//         },
        
//     ];
//     /* 在组件挂载或者即将挂载的时候调用*/
//     useEffect(() => {
//         // console.log(document.getElementsByClassName('ant-table-cell')[0])
//         let timer = setTimeout(() => {
//             showTable();
//         }, 0)

//         return () => clearTimeout(timer)
//     }, [])

    
//     const [data, setData] = useState()
//     var a = ""
//     const showTable = () => {

//         // getAuthorization();
//         // token鉴权的时候用一下（POST）
//         axios.get('http://51.104.196.52:8090/api/v1/public/service/all_service', {

//         })
//             .then(res => {

//                 const { data } = res.data.data;
//                 console.log(res.data.data)
//                 //这里的r是data里的每一个对象 i初始值为零每一轮+1

//                 // data.forEach((r: { key: any; }, i: any) => {
//                 //     r.key = i + 1;
//                 // });
//                 setData(data)


//                 // for (const key in data) {
//                 //     console.log(key, data[key]);

//                 //     <div>
//                 //       <p>Name: {data[key]}</p>
//                 //     </div>  

//                 // }


//                 // const servicelist2 = data.map(Item);

//                 console.log("data3123",data[1].ID)
                
//                 a = data[1].ID

//                 //  = data.map((Item) => {
//                 //     <div key={item.id}>
//                 //       <p>Name: {item.name}</p>
//                 //       <p>Age: {item.age}</p>
//                 //     </div>  
//                 //   });
//                 //  servicelist
//                 //   for(let i=0;i<data.length;i++){
//                 //     servicelist.push(`<div key={data[i].id}>
//                 //   </div> `)
//                 //   }
//                 //   console.log("servicelis")
                
//             })

//     }


    

//     return (
        
//         <div>
//             <Card
//                 hoverable
//                 className='ProductCard'
//                 cover={<img alt="example"
//                     src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg" />}>
//                 <Meta title="Home Cleaning Service" description="" />
//                 <div  style={{ marginTop: '20px' }}> Area: southampton </div>
//                 <div className='priceFont'>
//                 { }
//                 </div>
//                 <div className='view'>
//                     <div style={{ marginTop: '10px', display: 'inline' }}>Rating: 4.5</div>
//                     <NavLink className="nav-link" to="viewservice" >VIEW</NavLink>
//                 </div>

//             </Card> 

            
//             <Outlet />
//         </div>
//     );

// };

// export default ProductCard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductCard(props:any) {

    let a=JSON.stringify(props.data.data)
  console.log(JSON.stringify(props.data.data))
console.log("props")
console.log(JSON.parse(a))
  return (
    <div>
      <h1>Posts</h1>
      <ul>

        <p>{  }111</p>
      </ul>
    </div>
  );
}

export default ProductCard;



