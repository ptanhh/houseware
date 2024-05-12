import React, { useEffect, useState } from "react";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./DashBoard.css";
import ChartDashBoard from "./ChartDashBoard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../../actions/ProductAction";
import axios from "axios";
import {formatPrice} from '../../../../untils/index'

export default function DashBoard(props) {
  const dispatch = useDispatch();
  const { user } = props
  const currentMonth = new Date().getMonth() + 1;

  const [productCount, setProductCount] = useState(0)
  useEffect(() => {
    dispatch(getAllProduct());
    const getData = async () => {
      try {
        const response = await axios.post(`/products/count`);
        if (response.data && response.data.count !== undefined) {
          setProductCount(response.data.count);
        } else {
          setProductCount(0);
        }
      } catch (error) {
        console.error("Error fetching product count:", error);
        setProductCount(0);
      }
    };
    getData();
  }, [dispatch]);

  const [newUser, setNewUser] = useState(0)
  useEffect(() => {
    const fetchDailyAccess = async () => {
      try {
        const response = await axios.get(`/user/getNewUser`);
        if (response.data && response.data.count !== undefined) {
          setNewUser(response.data.count);
        } else {
          setNewUser(0);
        }
      } catch (error) {
        console.error("Error fetching daily access count:", error);
        setNewUser(0);
      }
    };
    fetchDailyAccess();
  }, []);

  const [doanhThuThang, setDoanhThuThang] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/order/doanhthuthang`);
        setDoanhThuThang(response.data.currentMonthRevenue);
      } catch (error) {
        setError(error.message || 'Có lỗi xảy ra khi lấy dữ liệu.');
      }
    };

    fetchData();
  }, []);

  const { orderPendding } = useSelector((state) => state.allOrder)
  let totalNewOrder
  if (orderPendding) {
    totalNewOrder = orderPendding.length
  }

  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          {/* <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <SearchOutlined></SearchOutlined>
              </span>
            </form>
          </div> */}
          <div className="dashboard-top-content">
            <li className="dashboard-top-content-avatar">
              {user && user.avatar && (
                <li className="dashboard-top-content-avatar">
                  <img src={user.avatar} alt=""></img>
                  <span>{user.name}</span>
                </li>
              )}
              <span>Phạm Tuấn Anh</span>
            </li>
            {/* <li className="dashboard-top-content-bell">
              <BellOutlined></BellOutlined>
            </li> */}
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingOutlined></ShoppingOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{productCount}</span>
                  <span className="title">Sản phẩm</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingCartOutlined></ShoppingCartOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{newUser}</span>
                  <span className="title">Người dùng mới</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <DollarCircleOutlined></DollarCircleOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{formatPrice(doanhThuThang)}</span>
                  <span className="title">Doanh thu tháng {currentMonth}</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <FileTextOutlined></FileTextOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{totalNewOrder}</span>
                  <span className="title">Đơn đặt hàng</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashBoard></ChartDashBoard>
        </div>

        <div className="dashboard-new">
          <div className="dashboard"></div>
          <div className="dashboard"></div>
        </div>
      </div>
    </section>
  );
}
