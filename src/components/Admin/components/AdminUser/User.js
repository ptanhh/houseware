import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser, paginationUser } from '../../../../actions/UserAction';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";

function User(props) {
    const {user, number} = props
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.users.currentPage)

    const handleDeleteUser = async (user) => {
        await dispatch(deleteUser(user._id))
        dispatch(paginationUser(currentPage));
    };

    return (
        <tr>
            <td>{number + 1}</td>
            <td><img style={{width: '50px', height: '50px', borderRadius: '50%'}} src={user.avatar} alt=""></img></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td className="update-user">
                <Link to={`/admin/customer/update/${user._id}`}>
                    <EditOutlined></EditOutlined>
                </Link>
            </td>
            <td className="delete-user" onClick={(e) => handleDeleteUser(user)}><DeleteOutlined /></td>
        </tr>
    );
}

export default User;