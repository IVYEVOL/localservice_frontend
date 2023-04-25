import 'react'
import { Button, DatePicker, Form, TimePicker, Input, InputNumber } from 'antd';
import './customerccss.css';


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
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
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

const PayForm: React.FC = () => (
  <Form
    name="time_related_controls"
    {...formItemLayout}
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
  >
    <div className='contactdetails'> Contact Details</div>
    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
       <Input />
    </Form.Item>
    <Form.Item name={['user', 'phonenumber']} label="Phone Number">
       <Input />
    </Form.Item>

    <div className='contactdetails'> Shipping Details</div>
    <Form.Item name={['user', 'Postcode']} label="Post Code" >
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'address']} label="address" >
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'city']} label="city" >
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'phonenumber']} label="Phone Number">
       <Input />
    </Form.Item>
    <Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
    </Form.Item>
    <Form.Item name={['user', 'Description']} label="Description">
      <Input.TextArea />
    </Form.Item>

    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Confirm
      </Button>
    </Form.Item>
   
  </Form>
);

export default PayForm;



