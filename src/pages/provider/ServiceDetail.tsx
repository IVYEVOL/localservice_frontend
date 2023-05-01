// import React from 'react'
// import { useLocation } from 'react-router-dom'

// function ServiceDetail() {
//   const {state} = useLocation()
//   const {id} = state
//   // alert(id)
//   return (
//     <div>{id}</div>
//   )
// }

// export default ServiceDetail
import React from 'react'
import { Rate, Avatar, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './providerCss.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import profile from '../../provider_data/services.json'


const ServiceDetail = () => {

    return (
       
        <div >
            <div className='servicename'>Pet Service</div>
            <div><img className='serviceimage' alt="Loading" src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg" /></div>
            <div className='serviceprice'>￡20</div>
            <div className='servicedesc'>City: London</div>
            <div className='servicedesc'>Area:London or somewhere else</div>
            <div className='servicedesc'>Mobile: 12345667 </div>
            <div className='servicedesc'>Availibility: </div>
            <div className='servicedesc'>category: Pet </div>
            <div className='servicedesc'>Description: </div>
            <div className='servicerate'>Rate：<Rate disabled defaultValue={3} /></div>
<Outlet/>
        </div>
    );

};

export default ServiceDetail;




