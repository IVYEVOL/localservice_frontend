import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { Button, Form, Input, InputNumber } from 'antd';
import { Card, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const RequestUpdatingMessage = () => {
  const { id, id2 } = useParams<{ id: string; id2: string }>();
  const orderID = Number(id); // 将id转换为number类型
  console.log('接收的id为' + orderID)
  const addinfoID = Number(id2); // 将id转换为number类型

  const [servicetitle, setServicetitle] = useState("Loadig...")


  const [description, setDescription] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    let timer = setTimeout(() => {
      getServiceTitleByOrderId()
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 当 servicetitle 发生变化时重新渲染组件
    // 此时 servicetitle 的值已经是最新的
  }, [servicetitle]);


  const getServiceTitleByOrderId = () => {
    getAuthorization();
    axios
      .get('http://51.104.196.52:8090/api/v1/order/find_by_order?order_id=' + orderID, {})
      .then(async (res) => {
        console.log("res.data.data.service_title");
        console.log(res.data.data);
        setServicetitle(res.data.data[0].service_title)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values: any) => {
    const description = values.description;
    if (!description) {
      alert("Description cannot be empty.");
      return;
    }
    getAuthorization();
    axios.request({
      method: "PUT",
      url: "http://51.104.196.52:8090/api/v1/order/update_status/" + orderID,
      data: {
        description: description,
      },
    }).then((res) => {
      alert("Submit Successful");
      changeAddinfoStatus()
      navigate('/');
    }
    );
    console.log('Received values of form:', values);
    console.log('Received values of form:', values);
  };

  const changeAddinfoStatus = () => {
    getAuthorization();
    axios.request({
      method: "PATCH",
      url: `http://51.104.196.52:8090/api/v1/update/info/update_info_status/${addinfoID}?status=Completed`,
    }).then((res) => {
      console.log("changeAddinfoStatus success")
    }).catch((error) => {
      console.error("Error in changeAddinfoStatus:", error);
    });
  }




  return (
    <div>
      <Card>
        <Card
          style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}
          type="inner"
          title="Update Your Service"
        >
         
         {servicetitle && ( <div style={{ marginLeft: 130 }}>
              <div style={{ fontSize: '24px' }}>{servicetitle}</div>
              {/* ... */}
            </div>
         )}

          <Form
            name="simple_form"
            onFinish={onFinish}
            style={{ marginTop: 30, marginLeft: 35, width: 500 }}
          >
            <Form.Item name="description" label="Addtional Info">
              <Input.TextArea
                style={{ width: '100%', minHeight: 200 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Card>
    </div>
  )

}
export default RequestUpdatingMessage;