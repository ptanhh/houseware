import axios from 'axios'
import { axiosClient } from "../services/config.services";

export const login = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('/user/login', user)
      console.log(data)
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data.message)
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data.message });
    }
};


export const SignupUser = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('/user/register', user)
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
      document.location.href = '/';
    } catch (error) {
       console.log(error)
    }
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({type: 'USER_SIGNOUT_SUCCESS', payload: {} })
  document.location.href = '/';
};

export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await  axios.get('/user')
    console.log(data)
    dispatch({type: 'GET_ALL_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/user/detail/${id}`
    );
    dispatch({ type: "GET_USER_BY_ID", payload: data });
  } catch (error) {
    dispatch({ type: "GET_USER_BY_ID_FAIL", payload: error.message });
  }
};

export const saveUser = (user) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    console.log("update");
    const { data } = await axios.put(
      `/user/update`,
      user,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "SAVE_USER", payload: data });
  } catch (error) {
    dispatch({ type: "SAVE_USER_FAIL", payload: error.message });
  }
};


export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete(`/user/delete/${userId}`)
    dispatch({type: 'DELETE_USER', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAIL', error: error.message})
  }
}

export const editCurrentPageUser = (page) => async (dispatch) => {
  dispatch({ type: "EDIT_CURRENT_PAGE_USER", payload: page });
}

export const paginationUser = (page) => async (dispatch) => {
  try {
    const data = await axiosClient.get(`/user/paginationUser/${page}`);
    dispatch({ type: "PAGINATION_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
