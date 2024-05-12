import React from 'react';
import User from './User';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentPageUser, paginationUser } from '../../../../actions/UserAction';

function ListUser(props) {
    const dispatch = useDispatch()
    const { users } = props;
    const currentPage = useSelector(state => state.users.currentPage)
    const { pages } = useSelector(state => state.users.user)

    const HandleChangePage = async (number) => {
        await dispatch(paginationUser(number))
        dispatch(editCurrentPageUser(number))
    }

    return (
        <div className="admin-user-list">
            <table>
                <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên tài khoản</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>SĐT</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;#</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;#</th>
                </tr>
                {
                    users ? users.map((item, index) => (<User user={item} number={index}></User>)) : ''
                }
            </table>
            {/* <div className="pagination">
                <Pagination defaultCurrent={1} current={currentPage} total={pages * 10} onChange={HandleChangePage} />
            </div> */}
        </div>
    );
}


export default ListUser;