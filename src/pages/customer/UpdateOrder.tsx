import 'react'

import CustomerMenu from './CustomerMenu';
import PayForm_service from './PayForm_service';
import { Button, DatePicker, Form, TimePicker, Input, InputNumber } from 'antd';
import './customerccss.css';


const UpdateOrder = () => {
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


    const onFinish = (fieldsValue: any) => {
        // Should format date value before submit.
        const values = {
            ...fieldsValue,

            'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log('Received values of form: ', values);
    };


    const UpdateForm: React.FC = () => (
        <Form
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name={['user', 'Description']} label="Description">
                <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>

        </Form>
    );

    const ProviderRequest: React.FC = () => (
        <div style={{marginLeft:150}}>
            <div>Provider's Request:</div>
            <div>Please give more detailed Description </div>
        </div>

    )
    return (
        <div>
            <PayForm_service />
            <ProviderRequest />
            <UpdateForm />
        </div>
    )
}

export default UpdateOrder;




