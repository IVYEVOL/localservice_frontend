

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { RcFile } from 'antd/lib/upload';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


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
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  // get user id
  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : {};
  console.log(user.user_id)

  const defaultData = {
    city: '',
    prices: '',
    address:'',
    category:'',
    description:'',
    mobile:'',
    title:'',
    areas_coverd:'',
    availibility:'',
    longitude_latitude: ''
}


const [serviceData, setServiceData] = useState(defaultData)
const [editing, setEditing] = useState(false);
const [loading, setLoading] = useState(false);
const [imageUrl, setImageUrl] = useState<string>();
const [title, setTitle] = useState<string>();
const [areas_coverd, setAreasCoverd] = useState<string>();
const [longitude_latitude,setLongitudeLatitude] = useState<string>();
const [description, setDescription] = useState<string>();
const [availibility, setAvailibility] = useState<string>();
const [category, setCategory] = useState<string>();
const [address, setAddress] = useState<string>();
const [mobile, setMobile] = useState<string>();
const [prices, setPrices] = useState<string>();
const [fileList, setFileList] = useState([]);

//get service id
const { id } = useParams<{ id: string }>();
const serviceId = Number(id); // 将id转换为number类型
 console.log('接收的id为' + serviceId)

// const showServiceById = () => {//获取service数据
//   axios
//       .get('http://51.104.196.52:8090/api/v1/public/service/' + serviceId, {})//获取该ID的service
//       .then((res) => {
//           const service: Service = res.data.data
//           console.log('服务id')
//           console.log(service.ID); // 获取服务 ID
//           setService(service);

//       })
//       .catch((err) => {
//           console.log(err);
//       });
// };


const getServiceDataById = () => {
  getAuthorization();
  axios.request({
    method: "GET",
    url: 'http://51.104.196.52:8090/api/v1/public/service/' + serviceId,
  }).then((res) => {
    //这个就是获取到的数据列表
      var data  = res.data.data
      setServiceData(data)
      var u
      if('' == data.photos || data.photos == undefined){

          u =  "http://51.104.196.52:9000/src/assets/findserviceLogo.png" ;
      }else{
          u = 'http://51.104.196.52:8090/' + data.photos
      }
      
      setImageUrl(u);
      console.log("u:"+u)
      console.log("data.photos:"+data)
    }
  );
};
useEffect(() => {
  //请求列表数据
  getServiceDataById();
}, [])

const handleEdit = () => {
  setTitle(serviceData.title);
  setAreasCoverd(serviceData.areas_coverd);
  setPrices(serviceData.prices);
  setAddress(serviceData.address);
  setCategory(serviceData.category);
  setMobile(serviceData.mobile);
  setDescription(serviceData.description);
  setAvailibility(serviceData.availibility);
  setLongitudeLatitude(serviceData.longitude_latitude);
  setEditing(true);
};

const uploadButton = (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

  

  //mobile.match(/^(?:(?:\+44\s*\d{10})|(?:0\d{4}\s*\d{6}))$/)
  const handleSave = () => {
    const formData = new FormData();
    fileList.forEach(item => {
        //将fileList中每个元素的file添加到formdata对象中
        //formdata对Key值相同的，会自动封装成一个数组
          formData.append('photo', item['originFileObj']);
    });
    
    formData.append('title',('' == title || title == undefined) ? defaultData.title : title);
    formData.append('category',('' == category || category == undefined) ? defaultData.category : category);
    formData.append('areas_coverd',('' == areas_coverd || areas_coverd == undefined) ? defaultData.areas_coverd : areas_coverd);
    formData.append('prices',('' == prices || prices == undefined) ? defaultData.prices : prices);
    formData.append('address',('' == address || address == undefined) ? defaultData.address : address);
    formData.append('availibility',('' == availibility || availibility == undefined) ? defaultData.availibility : availibility);
    formData.append('mobile',('' == mobile || mobile == undefined) ? defaultData.mobile : mobile);
    formData.append('description',('' == description || description == undefined) ? defaultData.description : description);
    formData.append('longitude_latitude',('' == longitude_latitude || longitude_latitude == undefined) ? defaultData.longitude_latitude : longitude_latitude);

    getAuthorization();
    axios.request({
      method: "PUT",
      url: "http://51.104.196.52:8090/api/v1/service/" + id,
      data: formData
    }).then((res) => {
        alert("Update Service Successful");
       // 更新成功，然后切换到本来的页面并且刷新数据
        setEditing(false);
        getServiceDataById();
        // setTitle('');
        // setMobile('');
      }
    );
  };
  
  function showFormData() {
    console.log(form.getFieldsValue());//Get all form data

      //If the form data has not been changed, the data obtained will be undefined
  }



    
  const [form] = Form.useForm();

  const handleChange = (info:any) => {
    setFileList(info.fileList);
  }



  return (
    <>
      {editing ? (
        <div>

        <br />
        <Input id='titleInput' placeholder="Input new title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <Input placeholder="Input new availibility" value={availibility} onChange={(e) => setAvailibility(e.target.value)} />
        <br />
        <Input placeholder="Input new description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <br />
        
        <Upload
                  multiple={true}
                  //陈列样式，现在是卡片式
                  listType="picture-card"
                  beforeUpload={() => {
                     //阻止上传
                      return false;
                  }}
                  onChange={(info) => { handleChange(info) }}
                  action=''
              >
                  {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        <br />
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
       
      ) : (
        <div>
          <Descriptions
            bordered
            title="Edit Your Service"
            extra={<Button type="primary" onClick={handleEdit}>Edit</Button>}
          >
            <Descriptions.Item label="title">{serviceData.title}</Descriptions.Item>
            <Descriptions.Item label="Availibility">{serviceData.availibility}</Descriptions.Item>
            <Descriptions.Item label="Mobile">{serviceData.mobile}</Descriptions.Item>
            <Descriptions.Item label="Description">{serviceData.description}</Descriptions.Item>
          </Descriptions>
          <img src={imageUrl} width={200} height={200} style={{ cursor:'pointer' }}/>
        </div>
      )
      }
      
    </>
  );
};

export default () => <UpdateService />;
