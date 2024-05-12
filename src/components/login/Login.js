import React, { useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/UserAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import { MailOutlined, LockOutlined } from '@ant-design/icons';

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }

    const handleShowPassword = () => {
      const passField = document.querySelector('.pass-key');
      const showBtn = document.querySelector('.show');

      if (showBtn && passField) {
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

      return () => {
        if (showBtn && passField) {
          showBtn.removeEventListener('click');
        }
      };
    };

    handleShowPassword();
  }, [userInfo, history]);

  return (
    <div className="bg-img">
         <div className="content">
            <header>Đăng nhập</header>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="field">
                  <MailOutlined className='icon'/>
                  <input type="text" {...register("email")} required placeholder="Email"></input>
               </div>
               <div className="field space">
                  <LockOutlined className='icon'/>
                  <input type="password" {...register("password")} className="pass-key" required placeholder="Mật khẩu"></input>
                  <span className="show">Hiện</span>
               </div>
               {/* <div className="pass">
                  <a href="#">Forgot Password?</a>
               </div> */}
               <div className="field space">
                  <input type="submit" value="Đăng nhập"></input>
                  {error ? <h2>{error}</h2> : <></>}
               </div>
            </form>
            <div className="signup">
               Bạn chưa có tài khoản?
               <Link to="/register"> Tạo tài khoản?</Link>
            </div>
         </div>
      </div>

  );
}

export default Login;