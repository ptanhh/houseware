import axios from "axios";



export const createOrderGhn = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/order/update/${orderId}`
    );
    dispatch({ type: "CREATE_ORDER_GHN", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_GHN_FAIL", payload: error });
  }
};


export const PrintOrderGhn = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/order/print/${orderId}`
    );
    console.log(data);
      window.open(data)
    dispatch({ type: "PRINT_ORDER_GHN", payload: data });
  } catch (error) {
    console.log(error);
  }
};
