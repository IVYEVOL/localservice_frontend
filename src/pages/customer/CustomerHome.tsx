import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import ViewService from './ViewService';
import { Outlet } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface Service {
  key: number;
  ID: number;
  title: string;
  prices:number;
}

const { Meta } = Card;

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
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      showTable();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const [data, setData] = useState<Service[]>([]);

  const showTable = () => {
    axios
      .get('http://51.104.196.52:8090/api/v1/public/service/all_service', {})
      .then((res) => {
        const services = res.data.data.map((service: any, index: number) => ({
          key: index + 1,
          ID: service.ID,
          title: service.title,
          prices:service.prices
        }));
        setData(services);
        console.log(res.data.data[0].title)
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  return (
    <div>
    {data.map((item)=>{
        return (<Card
            hoverable
            className='ProductCard'
            cover={<img alt='example' src='https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg' />}
        >
            <Meta title={item.title} description='' />
            <div style={{ marginTop: '20px' }}>{item.ID}</div>
            <div className='priceFont'>￡{item.prices}</div>
            <div className='view'>
                <div style={{ marginTop: '10px', display: 'inline' }}>Rating: 4.5</div>
                <NavLink className='nav-link' to='viewservice'>
                    VIEW
                </NavLink>
            </div>
        </Card>)
    })}
      <><Table columns={columns} dataSource={data} /><Outlet /></>
    </div>
  );
};

export default ProductCard;
