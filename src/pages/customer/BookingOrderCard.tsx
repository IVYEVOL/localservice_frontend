import React from 'react';
import { Card } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const BookingOrderCard: React.FC = () => (
    <Card title="BoookingOrder List">
        <Card
            // cover={
            //     <img 
            //       alt="example"
            //       src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg"
            //     />
            //   }
            className='messagecard'
            type="inner"
            title="Home cleanning Service"
            extra={
           
            <NavLink to="order">MORE</NavLink>
        }>
            <div>Booking Date:13/5/20023</div>
            <div>Booking Status: pending</div>
            <div>Booking Price: 96</div>
        </Card>
        <Outlet/>
    </Card>
);

export default BookingOrderCard;





// import React from 'react';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar, Card } from 'antd';

// const { Meta } = Card;

// const BookingOrderCard: React.FC = () => (
//   <Card
//     style={{ width: 300 }}
//     cover={
//       <img
//         style={{display:'inline'}}
//         alt="example"
//         src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg"
//       />
//     }
//     actions={[
//       <SettingOutlined key="setting" />,
//       <EditOutlined key="edit" />,
//       <EllipsisOutlined key="ellipsis" />,
//     ]}
//   >
//     <Meta
//       avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
//       title="Card title"
//       description="This is the description"
//     />
//   </Card>
// );

// export default BookingOrderCard;