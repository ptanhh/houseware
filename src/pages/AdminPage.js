import React from "react";
import Admin from "../components/Admin/Admin";
function AdminPage(props) {
  const user = JSON.parse(localStorage.getItem('userInfo')  || '{}');
  return (
    <div>
      {user && user.email === 'tuanap.dev@gmail.com' ? <Admin></Admin> :<p style={{
        color: 'red',
        textAlign: 'center',
        fontSize:30
      }}>Permission denied!</p>}
    </div>
  );
}

export default AdminPage;
