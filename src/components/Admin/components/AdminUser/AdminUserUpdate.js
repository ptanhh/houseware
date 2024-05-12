import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    getUserById,
    saveUser,
  } from "../../../../actions/UserAction";
import { useEffect, useState } from "react";

function AdminUserUpdate(props){
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [avatar, setAvatar] = useState("");
    const detailUser = useSelector((state) => state.getUserById.user);

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);
    
    const handleFileAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        let formData = new FormData();
    
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("address", data.address);
        formData.append("phone", data.phone);
        formData.append("avatar", avatar);
        formData.append("_id", id);
    
        await dispatch(saveUser(formData));
        history.push("/admin/customer");
    };

    return (
        <div className="admin-create">
          <span>Cập nhật tài khoản</span>
          {detailUser ? (
            <form
              className="admin-create-user"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <span>Tên tài khoản: </span>
              <input
                {...register("name")}
                placeholder="Tên tài khoản"
                defaultValue={detailUser.name}
              ></input>
              <span>Email: </span>
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                defaultValue={detailUser.email}
              ></input>
              <span>Password:</span>
              <input
                {...register("password")}
                placeholder="Mật khẩu"
                type="text"
                defaultValue={detailUser.password}
              ></input>
              <span>Địa chỉ:</span>
              <input
                {...register("address")}
                placeholder="Địa chỉ"
                type="text"
                defaultValue={detailUser.address}
              ></input>
              <span>Điện thoại:</span>
              <input
                {...register("phone")}
                placeholder="Số điện thoại"
                type="number"
                defaultValue={detailUser.phone}
              ></input>
    
              <input
                type="file"
                {...register("avatar")}
                onChange={handleFileAvatarChange}
              ></input>
              <button type="submit">Cập nhật tài khoản</button>
            </form>
          ) : (
            ""
          )}
        </div>
      );
}

export default AdminUserUpdate;
