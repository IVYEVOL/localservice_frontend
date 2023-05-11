import React, {useEffect,  useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Button, Descriptions, Radio, Input } from 'antd';
import type { UploadChangeParam} from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/lib/input/TextArea';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import Cookies from 'js-cookie';



const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


const Profile: React.FC = () => {
  // get user id
  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : {};
  console.log(user.user_id)
  
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
    const formData = new FormData();
    fileList.forEach(item => {
        //将fileList中每个元素的file添加到formdata对象中
        //formdata对Key值相同的，会自动封装成一个数组
          formData.append('avatar', item['originFileObj']);
    });
    if('' == nick_name || nick_name == undefined){
      alert("nick_name can not be empty");
      return;
    }
    if('' == mobile || mobile == undefined){
      alert("mobile can not be empty");
      return;
    }
    formData.append('nick_name',nick_name);
    formData.append('mobile', mobile);
    console.log("------------"+nick_name)
    getAuthorization();
    axios.request({
      method: "PUT",
      url: "http://51.104.196.52:8090/api/v1/user/" + user.user_id,  //这个put上传接口，你同学弄的有问题，如果我不传递avatar这个参数，他就会把数据库这个值改成空字符串，按理说不可能每次都修改图片，所以应该判断下，如果是空则不修改
      data: formData
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
      url: "http://51.104.196.52:8090/api/v1/user/" + user.user_id,  //这里不能写死28
    }).then((ret) => {
      //这个就是获取到的数据列表
        var data  = ret.data.data
        setServiceData(data)
        var u
        if('' == data.avatar || data.avatar == undefined){

            u =  "http://localhost:5182/src/assets/profile.png" ;
        }else{
            u = 'http://51.104.196.52:8090/' + data.avatar
        }
        
        setImageUrl(u);
        console.log("u:"+u)
        console.log("data.avatar:"+data.avatar)
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

  const handleChange = (info:any) => {
    setFileList(info.fileList);
  }

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