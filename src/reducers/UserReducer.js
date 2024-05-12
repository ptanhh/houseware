const initialState = {
    user: [],
    currentPage: 1,
};

export const UserSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return {...state, userInfo: action.payload };
        case 'USER_LOGIN_FAIL':
            return {...state, error: action.payload };
      default:
        return state;
    }
};

export const UserSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP_SUCCESS':
            return {...state, userInfo: action.payload };
        default:
            return state;
    }
};

export const UserSignoutReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNOUT_SUCCESS':
            return {...state};
        default:
            return state;
    }
};

export const getAllUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_USER': {
            return { ...state, user: action.payload };
        }
        case 'DELETE_USER': {
            return { ...state };
        }
        case 'EDIT_CURRENT_PAGE_USER': {
            return { ...state, currentPage: action.payload };
        }
        case 'PAGINATION_USER':
            console.log(action.payload);
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export const getUserByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_USER_BY_ID':{
            return {...state, user: action.payload}
        }

        default: return state
    }
}

// export const deleteUserReducer = (state = {}, action) => {
//     switch (action.type) {     
//         default: return state
//     }
// }