import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  editCurrentPage,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";

function AdminCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  const { pages } = useSelector((state) => state.allProduct.product);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append("type", activeTypeProduct);
    formData.append("image", image);

    await dispatch(saveProduct(formData));
    await dispatch(editCurrentPage(pages));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img} alt=""></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className="admin-create">
      <span>Thêm sản phẩm</span>
      <form
        className="admin-create-product"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <span>Tên sản phẩm:</span>
        <input {...register("name")} placeholder="Tên sản phẩm"></input>
        <span>Số lượng:</span>
        <input
          {...register("amount")}
          placeholder="Số lượng"
          type="number"
        ></input>
        <span>Giá niêm yết:</span>
        <input {...register("price")} placeholder="Giá niêm yết" type="number"></input>
        <span>Giá khuyến mãi:</span>
        <input
          {...register("salePrice")}
          placeholder="Giá khuyến mãi"
          type="number"
        ></input>
        <span>Loại sản phẩm:</span>
        <div className="filter-menu-firm">
          {
            List ? (List.map((item) => MenuFirmProduct(item))) : ''
          }
        </div>
        {SelectList && SelectList.length > 0
          ? SelectList.map((item) => (
              <div className="select-type">
                <select {...register(`${item.property}`)}>
                  <option>{item.name}</option>
                  {item.options.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
            ))
          : ""}

        <input
          type="file"
          {...register("image")}
          onChange={handleFileImageChange}
        ></input>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
}

export default AdminCreate;
