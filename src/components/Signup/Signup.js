import React, { useState, useEffect } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SignupUser } from '../../actions/UserAction'
import { Link } from 'react-router-dom'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

function Login(props) {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = data => {
    if (password === confirmPassword) {
      dispatch(SignupUser(data))
    } else {
      alert("wrong repeat password")
    }
  }

  useEffect(() => {
    const handleShowPassword = () => {
      const passFields = document.querySelectorAll('.pass-key');
      passFields.forEach(passField => {
        const showBtn = passField.nextElementSibling;
  
        if (showBtn) {
          showBtn.addEventListener('click', function () {
            if (passField.type === "password") {
              passField.type = "text";
              showBtn.textContent = "Ẩn";
              showBtn.style.color = "#3498db";
            } else {
              passField.type = "password";
              showBtn.textContent = "Hiện";
              showBtn.style.color = "#222";
            }
          });
        }
      });
  
      return () => {
        passFields.forEach(passField => {
          const showBtn = passField.nextElementSibling;
          if (showBtn) {
            showBtn.removeEventListener('click');
          }
        });
      };
    };
  
    handleShowPassword();
  }, []);
  


  return (
    <div className="bg-img">
      <div className="content">
        <header>Đăng ký</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <UserOutlined className='icon' />
            <input {...register("name")} required placeholder="Tên"></input>
          </div>
          <div className="field space">
            <MailOutlined className='icon' />
            <input type="email" {...register("email")} required placeholder="Email"></input>
          </div>
          <div className="field space">
            <LockOutlined className='icon' />
            <input type="password" {...register("password")} className="pass-key" onChange={(e) => setPassword(e.target.value)} required placeholder="Mật khẩu"></input>
            <span className="show">Hiện</span>
          </div>
          <div className="field space">
            <LockOutlined className='icon' />
            <input type="password" {...register("repeat password")} className="pass-key" onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Xác nhận mật khẩu"></input>
            <span className="show">Hiện</span>
          </div>
          {/* <div className="pass">
                  <a href="#">Forgot Password?</a>
               </div> */}
          <div className="field space">
            <input type="submit" value="Đăng ký"></input>
          </div>
        </form>
        <div className="signup">
          Bạn đã có tài khoản?
          <Link to="/login"> Đăng nhập?</Link>
        </div>
      </div>
    </div>

  );
}

export default Login;