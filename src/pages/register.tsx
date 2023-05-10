import { Row, Col, Card, Form, Input, Button, Checkbox, message, Radio } from 'antd';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/auth';
import { defaultImg } from '../utils/tools';
import TextArea from 'antd/lib/input/TextArea';

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register() {
  const navigate = useNavigate();
  return (
    <Row>
      <Col
        md={{
          span: 8,
          push: 8,
        }}
        xs={{
          span: 22,
          push: 1,
        }}
      >
        <img
          src={defaultImg}
          style={{
            display: 'block',
            margin: '20px auto',
            borderRadius: '16px',
            width: '200px',
          }}
        />
        <Card title='Register'> 
        <Form
      name="register"
      onFinish={async (v) => {
        try {
          const res = await registerAPI(v);
          console.log(res);
          if (res.code == 200) {
            message.success('Register Successful');
            navigate('/login');
          } 
        } catch(err:any) {
          message.error(err.response.data.msg);
          // console.log(err);
        }
      }}
    >
      <Form.Item
        name="email"
        label="Email"
        
        rules={[
          {
            required: true,
            message: 'Please input your email',
          },
          {
            required: true,
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: 'Please input right email address!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item 
      name="role"
      label="role">
        <Radio.Group>
          <Radio onClick={() => document.getElementById('provider_textarea')!.style.display='none'} value={"Customer"}>Customer</Radio>
          <Radio onClick={() => document.getElementById('provider_textarea')!.style.display=''} value={"Provider"}>Provider</Radio>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item
        name="nick_name"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[{ required: false, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="Phone Number"
        rules={[
          { 
            required: false, 
            message: 'Please input your phone number!' 
          },
        ]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <div id="provider_textarea" style={{display:"none"}}>

        <Form.Item
        name="status"
        initialValue={"Pending"}
        hidden>
        </Form.Item>

        <Form.Item
          name="text"
          label="Provider short description"
          rules={[
            { 
              required: false, 
              message: 'Please input your phone number!' 
            },

          ]}
        >
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 50, marginBottom: 24 }}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                console.log('Change:', e.target.value);
              }}
              placeholder="Reason for application (less than 80 characters)"
            />
        </Form.Item>
      </div>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a> 
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{
                  display: 'block',
                  margin: '8px auto',
                  width: '20vw',
                }}>
          Register
        </Button>
        <div style={{
                  margin: '8px auto',
                }}>
        Already a member?
        <a className="login-form-forgot" href="/login">&nbsp;
          Login
        </a> 
        &nbsp;using your account.
        </div>
        
      </Form.Item>
    </Form>

        </Card>
      </Col>
    </Row>
    
  );
}

export default Register;
