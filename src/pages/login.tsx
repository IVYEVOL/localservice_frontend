import { Row, Col, Card, Form, Input, Button, message } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/auth';
import { defaultImg, setToken } from '../utils/tools';

function Login() {
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
        <Card title='Login'>
        <Form
            labelCol={{
              md: {
                span: 4,
              },
            }}
            onFinish={async (v) => {
              // console.log(v);
              try {
                const res = await loginAPI(v);
                // console.log(res);
                if (res.code == 200) {
                  message.success('Login Successful');
                  setToken(res.data.token);
                  // return user data
                  navigate('/admin/dashboard');
                } 
              } catch(err:any) {
                message.error(err.response.data.msg);
                // console.log(err);
              }
            }}
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter email',
                },
              ]}
            >
              <Input placeholder='Please enter email' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter password',
                },
              ]}
            >
              <Input.Password placeholder='Please enter password' />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                style={{
                  display: 'block',
                  margin: '8px auto',
                  width: '20vw',
                }}
              >
                Login
              </Button>
              Not a member?&nbsp;<a href="/#/register" >Register now!</a>
              <a className="login-form-forgot" href="" style={{
                  float: 'right',
                }}>
                Forgot password
              </a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
