import React, { useEffect, useState } from 'react'
import './customerccss.css'
import Dropzone from "react-dropzone";
import axios from 'axios';
import { getAuthorization, removeToken } from '../../utils/tools';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

  const [userdetail,setUserdetail] = useState<UserData>(  )

  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("avatar", file);
    getAuthorization()

    // axios
    //   .get('http://51.104.196.52:8090/api/v1/user/29', {
    //   })//获取所有service
    //   .then((res) => {
    //     console.log(res.data);

    //     const user: UserData = res.data.data((item: any, index: number) => ({
    //       key: index,
    //       ID: item.ID,
    //       CreatedAt: item.CreatedAt,
    //       UpdatedAt: item.UpdatedAt,
    //       DeletedAt: item.DeletedAt,
    //       email: item.email,
    //       password: item.password,
    //       nick_name: item.nick_name,
    //       avatar: item.avatar,
    //       mobile: item.mobile,
    //       role: item.role,
    //     }));
    //     setImageurl(user.avatar)
    //     console.log(user)
    //     console.log(user.avatar)
    //     console.log(res.data)


    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // axios.put("http://51.104.196.52:8090/api/v1/user/29", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((res) => {
    //     const avatarUrl = res.data.avatarUrl;
    //     setImageurl(avatarUrl)
    //     setAvatar(avatarUrl);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  useEffect(() => {
    let timer = setTimeout(() => {
     getUserInfo()

    }, 0);

    return () => clearTimeout(timer);
  }, []);


  const getUserInfo = () => {//获取usershuju
    getAuthorization()
    axios
      .get('http://51.104.196.52:8090/api/v1/user/' + user.user_id, {})//获取所有service
      .then((res) => {
        console.log(res.data.data)
        setUserdetail(res.data.data)
        console.log("userdetail")
       

      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleSubmit = (event: any) => {
    event.preventDefault();
    // 处理表单提交事件
  }


  return (
    <div className="profile-card">
      <img className="profile-avatar" src={`http://51.104.196.52:8090/upload/${userdetail?.avatar}`} alt="profile" height={40} style={{ margin: 10 }} />
      <h2 className="profile-name">{userdetail?.nick_name}</h2>
      <p className="profile-info">Email: {userdetail?.email}</p>
      <p className="profile-info">Mobile: {userdetail?.mobile}</p>
      <form onSubmit={handleSubmit}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="profile-button">
              <input {...getInputProps()} />
              Upload Avatar
            </div>
          )}
        </Dropzone>
        <button type="submit" className="profile-button">Submit</button>
      </form>
    </div>
  )
}

export default Profile;