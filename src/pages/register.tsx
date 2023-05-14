import { Row, Col, Card, Form, Input, Button, Checkbox, message, Radio } from 'antd';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/auth';
import { defaultImg } from '../utils/tools';
import TextArea from 'antd/lib/input/TextArea';
import emailjs from 'emailjs-com';

function sendEmail(e: any) {
  e.preventDefault();

  emailjs.sendForm('service_wyvmosv', 'template_rh00lsq', e.target, '1MjITxyW_M-5uEiTK')
    .then((result: any) => {
      alert("Sending Email successful");
      console.log(result);
    }, (error: any) => {
      alert("Invalid Email");
      console.log(error.text);
    });
}

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
  const [defaultMessage, setDefaultMessage] = useState(
    Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
  )
  const [verificationCode, setVerificationCode] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [flag, setFlag] = useState(0)

  const handleVerification = () => {
    if (verificationCode === defaultMessage.toString()) {
      setFlag(1)
      alert("Verification successful!");
    } else {
      console.log(verificationCode, defaultMessage)
      alert("Verification failed!");
    }
  };

  const handleInputChange1 = (event: any) => {
    const value = event.target.value;
    setInputValue1(value);
    setInputValue2(value);
  };

  const navigate = useNavigate();
  return (
    <Col>
      <div >

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


          <div style={{ border: '1px solid gray', padding: '10px' }}>
            <form onSubmit={sendEmail} >
              <input style={{ display: 'none' }} type="email" name="user_email" value={inputValue2} />
              <textarea style={{ display: 'none' }} name="message" defaultValue={defaultMessage}></textarea>
              <input type="submit" value="Send Verification Code" />
            </form>

            <input
              style={{ marginTop: '20px' }}
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button style={{ marginLeft: '10px' }} onClick={handleVerification}>Verify</button>
          </div>

          
          <Card title='Register'>
            <Form
              name="register"
              onFinish={async (v) => {
                try {
                  const res = await registerAPI(v);
                  // console.log(res);
                  if (res.code == 200) {
                    message.success('Register Successful');
                    navigate('/login');
                  }
                } catch (err: any) {
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

                <Input onChange={handleInputChange1} />
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
                  <Radio onClick={() => document.getElementById('provider_textarea')!.style.display = 'none'} value={"Customer"}>Customer</Radio>
                  <Radio onClick={() => document.getElementById('provider_textarea')!.style.display = ''} value={"Provider"}>Provider</Radio>
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

              <div id="provider_textarea" style={{ display: "none" }}>

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
                }}  disabled={flag !== 1}>
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
      </div>

    </Col>
  );
}

export default Register;
