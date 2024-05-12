import React, { useEffect, useState } from "react";
import "./FilterMenu.css";
import { Dropdown } from "antd";
import { DownOutlined} from "@ant-design/icons";
import {
  filterProductByRandomField,
} from "../../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllSelectList } from "../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../actions/ListTypeProductAction";

export default function FilterMenu() {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState({});
  const filterMenuList = useSelector(state => state.selectList.List)
  const { List} = useSelector(state => state.allTypeProduct)
  console.log(List)

  useEffect(() => {
    dispatch(filterProductByRandomField(dataFilter));
  }, [dataFilter]);

  useEffect(() => {
    dispatch(getAllSelectList())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllTypeProduct())
  }, [dispatch])

  const MenuFirmProduct = (item) => (
    <div
      className={
        dataFilter[`type`] === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img} alt=""></img>
    </div>
  );

  const HandleFilterProductByType = async (name) => {
    if (dataFilter.type === name) {
      delete dataFilter[`type`];
      const newDataFilter = { ...dataFilter };
      setDataFilter({ ...newDataFilter });
    } else {
      setDataFilter({ ...dataFilter, type: name });
    }
  };

  return (
    <div>
      <div className="filter-menu-firm">
        {
          List ? (List.map((item) => MenuFirmProduct(item))) : ''
        }
      </div>
    </div>
  );
}
