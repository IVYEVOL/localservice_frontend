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
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Dropzone from "react-dropzone";

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




const UpdateService: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("avatar", file);
    getAuthorization()
    axios.put("http://51.104.196.52:8090/api/v1/service/"+ id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const avatarUrl = res.data.avatarUrl;
        setImageUrl(avatarUrl)
       // setAvatar(avatarUrl);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // 处理表单提交事件
  };
  
  // get user id
  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : {};
  console.log(user.user_id)
  
  const { id } = useParams<{ id: string }>();
  
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


  const updateFormData  = () => {
    console.log("--------------updateFormData")
    getAuthorization();
    const title = form.getFieldValue("title");
  
    const longitude_latitude = form.getFieldValue("longitude") + "," + form.getFieldValue("latitude") ;

    const address = form.getFieldValue("address");

    const city = form.getFieldValue("city");

    const country = form.getFieldValue("country");

    const mobile = form.getFieldValue("phoneNumber");

    const areas_coverd = form.getFieldValue("areas_coverd");
  
    const category = form.getFieldValue("category");

    const price = form.getFieldValue("price");
    
    const description = form.getFieldValue("description");

   
    const availability = form.getFieldValue("availability");
   
    var Photos = form.getFieldValue("images");
    if('' == Photos || Photos == undefined){
      Photos = "http://localhost:5182/src/assets/profile.png" ;
      //alert("photos can not be empty");
      //return;
    }
    
    
    //token暂时写死
   // axios.defaults.headers.common['Authorization'] = "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NCwiRW1haWwiOiIyIiwic3ViIjoiVG9rZW4iLCJleHAiOjE2ODM1ODQyMTQsImlhdCI6MTY4MzU4MjQxNH0._LXx-1qcQE2gCgQdeGJUBzM3m3MJMYhyEYRatJ0YHJ4";
    axios.request({
      method: "PUT",
      url: "http://51.104.196.52:8090/api/v1/service/"+ id ,
      params: {
        title:title, 
        longitude_latitude:longitude_latitude, 
        address:address, 
        city:city, 
        country:country, 
        mobile:mobile, 
        areas_cover:areas_coverd, 
        category:category, 
       // prices:price.number, 
        description:description, 
        userid:user.user_id, 
        availability:availability, 
        Photos: Photos
      }
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

        <Form.Item name="areas_coverd" label="Service area">
          <Input />
        </Form.Item>




        <Form.Item name="category" label="Category">
          <Select>
            <Select.Option value="Cleaning">Cleaning</Select.Option>
            <Select.Option value="Electrical">Electrical repairs</Select.Option>
            <Select.Option value="Babysitting">Babysitting</Select.Option>
            <Select.Option value="Beauty">Beauty</Select.Option>
            <Select.Option value="Pest control">Pest control</Select.Option>
            <Select.Option value="Plumbing">Plumbing</Select.Option>
            <Select.Option value="Other services">Other services</Select.Option>
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
          <Input />
        </Form.Item>

        {/* <Form.Item name="images" label="Upload  images" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
         <form onSubmit={handleSubmit}>
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="profile-button">
                            <input {...getInputProps()} />
                             Change Photo
                        </div>
            )}
                </Dropzone>
             <button type="submit" className="profile-button">Submit Photo</button>
            </form>

        <Form.Item label="Add Service">
          <Button type="primary" onClick={updateFormData}>Submit</Button>
        </Form.Item>
        
      </Form>
    </>
  );
};

export default () => <UpdateService />;