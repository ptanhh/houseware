import React, {useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../../actions/OrderAction";


export default function ChartDashBoard() {
  const dispatch = useDispatch()
  const [doanhThu, setDoanhThu] = useState([])

  useEffect(() => {
    dispatch(getAllOrder());
    const getData = async () =>{
      const response = await axios.post(`/order/doanhthu`);
      setDoanhThu(response.data)
    }
    getData()
  }, [dispatch])

  const chartOptions = {
    series: [{
        name: 'Doanh thu',
        data: doanhThu
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
  }

  return (
    <div className="dashboard-middle-chart">
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type='line'
        width="500"
      />
    </div>
  );
}
