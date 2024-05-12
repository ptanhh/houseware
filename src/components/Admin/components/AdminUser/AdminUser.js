import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListUser from './ListUser';
import './AdminUser.css'
import {
    getAllUser, paginationUser,
} from "../../../../actions/UserAction";

// function AdminUser(props) {
//     const dispatch = useDispatch();
//     const currentPage = useSelector((state) => state.users.currentPage)
//     const { users, loading } = useSelector((state) => state.users.user)

    // useEffect(() => {
    //     dispatch(paginationUser(currentPage));
    // }, [dispatch, currentPage]);

//     return (
//         <div className="admin-user">
//             <span>Thông tin tài khoản</span>
            // {loading ? (
            //     <h2>Loading</h2>
            // ) : (
            //     <ListUser listProducts={users}></ListUser>
            // )}

//         </div>
//     );
// }

function AdminUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.user)

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch])
    return (
        <div className="admin-user">
            <span>Quản lý tài khoản</span>
            {
                users ? (<ListUser users={users}></ListUser>) : (<h2> Loading</h2>)
            }
        </div>
    );
}

export default AdminUser;