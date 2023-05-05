import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import Axios from 'axios'
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
const { Option } = Select;

type Currency = 'gbp' | 'dollar';

interface PriceValue {
  number?: number;
  currency?: Currency;
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState<Currency>('gbp');

  const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
    onChange?.({ number, currency, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };


  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="gbp">GBP</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};


const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};




const AddService: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const onFinish = (values: any) => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };


  const postFormData  = () => {
    getAuthorization();
    const title = form.getFieldValue("title");
    if('' == title || title == undefined){
      alert("title can not be empty");
      return;
    }
    const description = form.getFieldValue("description");
    if('' == description || description == undefined){
      alert("description can not be empty");
      return;
    }
    const price = form.getFieldValue("price");
    if('' == price || price == undefined){
      alert("price can not be empty");
      return;
    }
    const address = form.getFieldValue("address");
    if('' == address || address == undefined){
      alert("address can not be empty");
      return;
    }
    const category = form.getFieldValue("category");
    if('' == category || category == undefined){
      alert("category can not be empty");
      return;
    }
    const mobile = form.getFieldValue("phoneNumber");
    if('' == mobile || mobile == undefined){
      alert("mobile can not be empty");
      return;
    }
    axios.defaults.headers.common['Authorization'] = "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NCwiRW1haWwiOiIxIiwic3ViIjoiVG9rZW4iLCJleHAiOjE2ODMyNTg4ODgsImlhdCI6MTY4MzI1NzA4OH0.Yutn2vWOfl3uVrn-iTvy_bweDu4xBJ2Z1bgpVoLKcg8";
    axios.request({
      method: "POST",
      url: "http://51.104.196.52:8090/api/v1/service/add",
      params: {title:title, description:description, prices:price.number, address:address, category:category, userid:2, mobile:mobile}
    }).then((res) => {
        alert("success");
      }
    );
  }
  
  function showFormData() {
    console.log(form.getFieldsValue());//Get all form data

      //If the form data has not been changed, the data obtained will be undefined
  }



    
  const [form] = Form.useForm();




  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form}
        
      >
        <Form.Item name = "title" label="Title">
          <Input/>
        </Form.Item>


        <Form.Item label="Location" style={{ marginBottom: 0 }}>
          <Form.Item
            name="longitude"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="Input Longitude" />
          </Form.Item>
          <Form.Item
            name="latitude"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <Input placeholder="Input latitude" />
          </Form.Item>
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input  type="text"  id="location-input" />
        </Form.Item>
        <Form.Item name="city" label="City">
          <Input  type="text"  id="location-input" />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <Input  type="text"  id="location-input" />
        </Form.Item>
        <div className="map" id="gmp-map"></div>

        <Form.Item
          name="phoneNumber"
          label="Phone number"
          // rules={[{ required: true, message: 'Please enter the correct mobile phone number', pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g") }]}>
          rules={[{ message: 'Please enter the correct mobile phone number' }]}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Service area">
          <Input />
        </Form.Item>




        <Form.Item name="category" label="Category">
          <Select>
            <Select.Option value="demo">Cleaning</Select.Option>
            <Select.Option value="demo">Electrical repairs</Select.Option>
            <Select.Option value="demo">Babysitting</Select.Option>
            <Select.Option value="demo">Beauty</Select.Option>
            <Select.Option value="demo">Pest control</Select.Option>
            <Select.Option value="demo">Plumbing</Select.Option>
            <Select.Option value="demo">Other services</Select.Option>
          </Select>
        </Form.Item>

        {/* <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item> */}

        <Form.Item name="price" label="Price" rules={[{ validator: checkPrice }]}>
          <PriceInput />
        </Form.Item>

        <Form.Item name="description" label="Description" >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="availability" label="Availability" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="images" label="Upload  images" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item label="Add Service">
          <Button type="primary" onClick={postFormData}>Submit</Button>
        </Form.Item>
        
      </Form>
    </>
  );
};

export default () => <AddService />;