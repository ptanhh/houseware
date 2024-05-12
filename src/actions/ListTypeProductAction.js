import axios from 'axios'

export const getAllTypeProduct = () => async (dispatch) => {
    try {
        const {data} = await axios.get('/typeList')
        dispatch({type: 'GET_ALL_TYPE_PRODUCT', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const CreateNewTypeProduct = (type) => async (dispatch) => {
    console.log(type.get('name'), type.get('img'))
    try {
        const {data} = await axios.post(`/typeList/create`, type)
        dispatch({type: 'CREATE_NEW_TYPE_PRODUCT', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteTypeProduct = (type) => async (dispatch) => {
    console.log(type._id)
    try {
        const {data} = await axios.delete(`/typeList/delete/${type._id}`)
        dispatch({type: 'DELETE_TYPE_PRODUCT', payload: data})
    } catch (error) {
        console.log(error)
    }
}