import 'react'
import PayForm from './PayForm';
import CustomerMenu from './CustomerMenu';
import { useParams } from 'react-router-dom';
import { Button, DatePicker, Form, TimePicker, Input, InputNumber, Upload } from 'antd';
import Cookies from 'js-cookie';
import { getAuthorization, getToken } from '../../utils/tools';
import form from 'antd/lib/form';
import { FormInstance } from 'antd/lib/form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface Service {
    key: number;
    ID: number;
    title: string;
    prices: number;
    city: string;
    description: string;
    address: string;
    category: string;
    photos: string;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    areas_coverd: number;
    availibility: string;
    longitude_latitude: string;
    mobile: string;
    user_id: number;
}
interface PayServiceProps {
    serviceData: Service;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};



const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.
    const values = {
        ...fieldsValue,

        'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
};


const PayService: React.FC<PayServiceProps> = ({ serviceData }) => {
    const navigate = useNavigate();
    console.log("servicedata")
    console.log(serviceData)
    const userJson = Cookies.get('user');
    const user = userJson ? JSON.parse(userJson) : {};
    console.log("user.user_id")
    console.log(user.user_id)

    const onFinish = (fieldsValue: any) => {//获取表单中各个字段的值，判断它们是否为空，然后使用axios库向API接口发送POST请求
        getAuthorization();
        const name = form.getFieldValue("name");
        if ('' == name || name == undefined) {
            alert("name can not be empty");
            return;
        }
        const email = form.getFieldValue("email");
        if ('' == email || email == undefined) {
            alert("email can not be empty");
            return;
        }
        const phonenumber = form.getFieldValue("phonenumber");
        if ('' == phonenumber || phonenumber == undefined) {
            alert("phonenumber can not be empty");
            return;
        }
        const Postcode = form.getFieldValue("Postcode");
        if ('' == Postcode || Postcode == undefined) {
            alert("Postcode can not be empty");
            return;
        }
        // const datetimepicker = form.getFieldValue("datetimepicker");
        // if ('' == datetimepicker || datetimepicker == undefined) {
        //     alert("datetimepicker can not be empty");
        //     return;
        // }
        const datetimepicker = fieldsValue["date-time-picker"];
        const city = form.getFieldValue("city");
        if ('' == city || city == undefined) {
            alert("city can not be empty");
            return;
        }
        const description = form.getFieldValue("description");
        if ('' == description || description == undefined) {
            alert("address can not be empty");
            return;
        }
        const address = form.getFieldValue("address");
        if ('' == address || address == undefined) {
            alert("address can not be empty");
            return;
        }
        axios.request({
            method: "POST",
            url: "http://51.104.196.52:8090/api/v1/order/add",
            params: { customer_name: name, customer_email: email, customer_phone: phonenumber, postcode: Postcode, address: address, city: city, date: datetimepicker, description: description, customer_id: user.user_id, service_id: serviceData.ID, provider_id: serviceData.user_id ,status: 'Pending'}
        }).then((res) => {
            alert("success");
            navigate('/');
        }
        );
    }

    const [form] = Form.useForm();

    return (
        <div>
            <div>
                <div ><img className='serviceimage' alt="Loading" src={`http://51.104.196.52:8090/upload/${serviceData.photos}`} /></div>
                <div className='servicename'>{serviceData?.title}</div>
                <div className='serviceprice'>￡{serviceData?.prices}</div>
            </div>
            <Form
                name="time_related_controls"
                {...formItemLayout}
                style={{ maxWidth: 600 }}
                form={form}
                onFinish={onFinish}
            >
                <div className='contactdetails'> Contact Details</div>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phonenumber" label="Phone Number">
                    <Input />
                </Form.Item>

                <div className="contactdetails"> Shipping Details</div>
                <Form.Item name="Postcode" label="Post Code" >
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="address" >
                    <Input />
                </Form.Item>
                <Form.Item name="city" label="city" >
                    <Input />
                </Form.Item>
                <Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PayService;