import 'react'
import MessageCard from './MessageCard'
import { Card } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { EditOutlined, NotificationOutlined, StarOutlined } from '@ant-design/icons';


const MesssageList = () => {
    return (
        <div>
            <Card title="Message List" style={{marginLeft:110, width:1300,margin: '0 auto'}}>
                <Card
                    className='messagecard'
                    type="inner"
                    style={{width:1200}}
                    title={
                        <span>
                          <NotificationOutlined style={{ marginRight: 8 }} />
                          Request updating for your order
                        </span>
                      }
                    extra={
                        <NavLink to="requestupdatingmessage">MORE</NavLink>
                    }>
                    There are some details for you to update
                </Card>
                <Card 
                    className='messagecard'
                    type="inner"
                    style={{width:1200}}
                    title={
                        <span style={{borderRadius:10}}>
                          <StarOutlined style={{ marginRight: 8 }} />
                          Review the service!
                        </span>
                      }
                    extra={<NavLink to="servicereviewmessage">MORE</NavLink>}>
                    There are service for you to review
                </Card>
                <Outlet />
            </Card>
        </div>
    )
}

export default MesssageList;