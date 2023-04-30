import React from 'react'
import { Card } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import ViewService from './ViewService';
import { Outlet } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = () => {
    return (
        <div>
         
            <Card
                hoverable
                className='ProductCard'

                cover={<img alt="example" src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg" />}
            >
                <Meta title="Home Cleaning Service" description="" />
                <div style={{ marginTop: '20px' }}> Area: southampton </div>
                <div className='priceFont'>￡49.50</div>
                <div className='view'>
                    <div style={{ marginTop: '10px',display:'inline'}}>Rating: 4.5</div>
                    <NavLink  className="nav-link" to="viewservice" >VIEW</NavLink>
                </div>

            </Card>
            <Outlet/>
        </div>
    );

};

export default ProductCard;




