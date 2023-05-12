import React, { useEffect, useState } from 'react'
import './customerccss.css'
import Dropzone from "react-dropzone";
import axios from 'axios';
import { getAuthorization, removeToken } from '../../utils/tools';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Button, Descriptions, Radio, Input } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/lib/input/TextArea';

interface UserData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  email: string;
  password: string;
  nick_name: string;
  avatar: string;
  mobile: string;
  role: string;
}

const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const [imageUrl, setImageurl] = useState("")
  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : {};
  console.log(user.user_id)

  const [userdetail, setUserdetail] = useState<UserData>()
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nick_name, setName] = useState<string>();
  const [mobile, setMobile] = useState<string>();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      getUserData()
    }, 0);

    return () => clearTimeout(timer);
  }, []);


  const getUserData = () => {
    getAuthorization();
    axios.request({
      method: "GET",
      url: "http://51.104.196.52:8090/api/v1/user/" + user.user_id,  //这里不能写死28
    }).then((ret) => {
      console.log(ret.data.data)
      setUserdetail(ret.data.data)
      console.log("userdetail")
      console.log(userdetail)
    }
    );
  };

  const handleEdit = (event: any) => {//点击编辑按钮事件
    setEditing(true);
  }

  const handleSave = () => {//更新信息成功后点击save操作
    const formData = new FormData();
    fileList.forEach(item => {
      //将fileList中每个元素的file添加到formdata对象中
      //formdata对Key值相同的，会自动封装成一个数组
      formData.append('avatar', item['originFileObj']);
    });
    if ('' == nick_name || nick_name == undefined) {
      alert("nick_name can not be empty");
      return;
    }
    if ('' == mobile || mobile == undefined) {
      alert("mobile can not be empty");
      return;
    }
    formData.append('nick_name', nick_name);
    formData.append('mobile', mobile);
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    setFileList(info.fileList);
  }
  const handleLogout = () => {
    // 执行注销操作，例如清除用户信息、删除令牌等
    removeToken();
    // 跳转到登录页面或其他适当的位置
    navigate('/');
  };


  return (
    <>
      <div>
        <br />
        <br />
        {/* 只能修改邮箱 姓名 手机号码 */}
        {editing ? (
          <div  className="profile-card">
            <Input className='inputedit' placeholder="Input new name" value={nick_name} onChange={(e) => setName(e.target.value)} />
            <br />
            <Input className='inputedit' placeholder="Input new mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <br />
            <br />

            <Upload
            className='upload-container'
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
          <div className="profile-card">
            <img className="profile-avatar" src={`http://51.104.196.52:8090/${userdetail?.avatar}`} alt="profile" height={40} style={{ margin: 10 }} />
            <h2 className="profile-name">{userdetail?.nick_name}</h2>
            <p className="profile-info">Email: {userdetail?.email}</p>
            <p className="profile-info">Mobile: {userdetail?.mobile}</p>
            <form onSubmit={handleEdit}>
              <button type="submit" className="profile-button">edit</button>
            </form>
            {/* <button className="profile-button" onClick={handleLogout}>Log out</button> */}
          </div>
        )
        }
      </div>
      <br />

    </>

  )
}

export default Profile;
