import React, {useEffect,  useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Button, Descriptions, Radio, Input } from 'antd';
import type { UploadChangeParam} from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/lib/input/TextArea';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';



const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


const Profile: React.FC = () => {
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [nick_name, setName] = useState<string>();
  const [mobile, setMobile] = useState<string>();
  const [fileList, setFileList] = useState([]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if('' == nick_name || nick_name == undefined){
      alert("nick_name can not be empty");
      return;
    }
    if('' == mobile || mobile == undefined){
      alert("mobile can not be empty");
      return;
    }
    getAuthorization();
    axios.request({
      method: "PUT",
      url: "http://51.104.196.52:8090/api/v1/user/28",  //这个put上传接口，你同学弄的有问题，如果我不传递avatar这个参数，他就会把数据库这个值改成空字符串，按理说不可能每次都修改图片，所以应该判断下，如果是空则不修改
      data: {nick_name:nick_name, mobile:mobile}
    }).then((res) => {
        alert("Update User Successful");
        //更新成功，然后切换到本来的页面并且刷新数据
        setEditing(false);
        getUserData();
        setName('');
        setMobile('');
      }
    );
  };

  const getUserData = () => {
    getAuthorization();
    axios.request({
      method: "GET",
      url: "http://51.104.196.52:8090/api/v1/user/28",  //这里不能写死28
    }).then((ret) => {
      //这个就是获取到的数据列表
        var data  = ret.data.data
        setServiceData(data)
        //img                 //这里的三元表达式，是为了兼容下，你同学传递出来的图片地址是空，为了可以看到图片，后面你可以去掉
        // var u = 'http://51.104.196.52:8090/' + (data.avatar == '' ? 'upload/1683657704896592899petGrooming.png' : data.avatar);//cover={<img alt="example" src={`http://51.104.196.52:8090/upload/${service.photos}`} 
        var u = 'http://51.104.196.52:8090/' + data.avatar
        setImageUrl(u);
      }
    );
  };

  const defaultData = {
    ID: '',
    email: '',
    nick_name: '',
    role: '',
    CreatedAt: '',
    mobile: ''
  }


  const [serviceData, setServiceData] = useState(defaultData)
  useEffect(() => {
    //请求列表数据
    getUserData();
  }, [])



  return (
    <>
      <div>
      <br />
      <br />
      {/* 只能修改邮箱 姓名 手机号码 */}
      {editing ? (
        <div>
          <Input placeholder="Input new name" value={nick_name} onChange={(e) => setName(e.target.value)} />
          <br />
          <Input placeholder="Input new mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <br />
          <br />
          <Upload
              listType="picture-card"
              headers={{ 'content-type': 'multipart/form-data' }}
              beforeUpload={() => false}  
              fileList={fileList} 
              
            > 
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 1 }}>Upload image</div>
                </div>

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
            title="Custom Size"
            extra={<Button type="primary" onClick={handleEdit}>Edit</Button>}
          >
            <Descriptions.Item label="Email">{serviceData.email}</Descriptions.Item>
            <Descriptions.Item label="Nick Name">{serviceData.nick_name}</Descriptions.Item>
            <Descriptions.Item label="Role">{serviceData.role}</Descriptions.Item>
            <Descriptions.Item label="Mobile">{serviceData.mobile}</Descriptions.Item>
            <Descriptions.Item label="Created At">{serviceData.CreatedAt}</Descriptions.Item>
          </Descriptions>
          <img src={imageUrl} width={200} height={200} style={{ cursor:'pointer' }}/>
        </div>
      )
      }
    </div>
    <br />
    
    </>
    
  );
};

export default Profile;