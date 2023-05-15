import 'react'
import MessageCard from './MessageCard'
import { Card } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { EditOutlined, NotificationOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import Cookies from 'js-cookie';

interface addInfo {
  ID: number;
  user_id: number;
  order_id: number;
  message: string;
  status: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  request: string;
}

const MesssageList = () => {
  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : {};
  console.log(user.user_id)
  const [addinfos, setAddinfos] = useState<addInfo[]>([]);
  const [messages, setMessages] = useState<addInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userJson) {
      navigate('/customer/login');
      console.log(222222222222222222222222222222);
    } else {
      let timer = setTimeout(() => {
        showAddinfoById();
        showMessageById()

      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  const showAddinfoById = () => {//获取order
    getAuthorization()
    axios
      .get('http://51.104.196.52:8090/api/v1/update/info/find_info_pending?user_id=' + user.user_id, {})//获取该ID的order
      .then((res) => {
        console.log("res.data.data")
        console.log(res.data.data)
        setAddinfos(res.data.data);

        // 在这里调用 showServiceById 函数
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showMessageById = () => {//获取message
    getAuthorization()
    axios
      .get('http://51.104.196.52:8090/api/v1/update/info/find_msg_pending?user_id=' + user.user_id, {})//获取该ID的order
      .then((res) => {
        console.log("message")
        console.log(res.data.data)
        setMessages(res.data.data);
        // 在这里调用 showServiceById 函数
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Card title="Request from providers " style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}>
        {addinfos.map((addinfo, index) => (
          <Card
            className='messagecard'
            type="inner"
            style={{ width: 1200 }}
            title={
              <span>
                <NotificationOutlined style={{ marginRight: 8 }} />
                Request updating for your order
              </span>
            }
            extra={
              <NavLink to={`requestupdatingmessage/${addinfo.order_id}/${addinfo.ID}`}>Update</NavLink>
            }>
            <div>
              Booking Date: {new Date(addinfo.CreatedAt).toISOString().substring(0, 10)} {new Date(addinfo.CreatedAt).toISOString().substring(11, 19)}
            </div>
            <div>Provider request: {addinfo.message}</div>
          </Card>
        ))}
      </Card>
      <Card title="let's review services" style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}>
        {messages.map((message, index) => (
          <Card
            className='messagecard'
            type="inner"
            style={{ width: 1200 }}
            title={
              <span style={{ borderRadius: 10 }}>
                <StarOutlined style={{ marginRight: 8 }} />
                Review the service!
              </span>
            }
            extra={
              <NavLink to={`servicereviewmessage/${message.order_id}/${message.ID}`}>Review</NavLink>
            }>
            There are service for you to review
          </Card>
        ))}
        <Outlet />
      </Card>
    </div>
  )
}

export default MesssageList;



