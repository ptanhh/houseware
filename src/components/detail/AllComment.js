import React, { useState } from "react";
import { Col } from "antd";
import { WechatOutlined, PushpinOutlined, LockOutlined  } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  pinCommentProduct,
  repCommentProduct,
} from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
import AllRepComment from "./AllRepComment";
import { getFirstCharacterUser } from "../../untils";
import imageLogo from "../../assets/images/logo-r3.png"

function AllComment(props) {
  const { id } = useParams();
  const { allComment, user } = props;
  console.log("allCommet: ", allComment);
  const dispatch = useDispatch();
  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const { userInfo } = useSelector((state) => state.userSignin);
  const [repValue, setRepValue] = useState("");
  const showRepComment = (id) => {
    setRepCmt({ key: id, status: !repCmt.status });
  };
  const handleRepComment = (value) => {
    if (userInfo) {
      const comment = {
        idComment: repCmt.key,
        isAdmin: userInfo.isAdmin,
        content: repValue,
        nameUser: userInfo.name,
      };
      console.log(comment);
      dispatch(repCommentProduct(id, comment));
      setRepValue("");
      setRepCmt({ key: "", status: false });
    } else alert("Bạn phải đăng nhập mới có thể sử dụng chức năng này");
  };

  const PinComment = (comment) => {
    const UpdateComment = { ...comment, status: "pin" };
    console.log(UpdateComment);

    dispatch(pinCommentProduct(id, UpdateComment));
  };

  return (
    <div class="all-comment">
      {allComment.map((comment) => (
        <>
          <Col span={18} style={{ marginTop: "1rem" }} xs={24} sm={24} md={18}>
            <div className="all-comment-info">
              <div style={{ display: "flex" }}>
                {comment.isAdmin ? (
                  <div className="all-comment-info-name admin">
                    <img src={user.avatar} alt=""></img>
                  </div>
                ) : (
                  <div className="all-comment-info-name">
                    {getFirstCharacterUser(comment.author)}
                  </div>
                )}
                {comment.isAdmin ? (
                  <strong>
                    {comment.author} <span>QTV</span>
                  </strong>
                ) : (
                  <strong>{comment.author}</strong>
                )}
              </div>

              {userInfo.isAdmin ? (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                    onClick={() => PinComment(comment)}
                  >
                    {
                      comment.status === 'pin' ? (<LockOutlined></LockOutlined>) : (<PushpinOutlined></PushpinOutlined>) 
                    }
                  </div>
                </div>
              ) : (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                  >
                    {
                      comment.status === 'pin' ? (<PushpinOutlined></PushpinOutlined>) : ''
                    }
                  </div>
                </div>
              )}
            </div>
            <div className="all-comment-content">{comment.content}</div>
            <div className="all-comment-more">
              <a
                className="all-comment-more-chat"
                onClick={() => showRepComment(comment._id)}
              >
                <WechatOutlined style={{ color: "#a77743" }} /> <p> Trả lời</p>
              </a>
            </div>
            {comment.replies.length > 0 ? (
              <AllRepComment
                allrepcomment={comment.replies}
                showRepComment={showRepComment}
                id={comment._id}
              ></AllRepComment>
            ) : (
              ""
            )}
          </Col>
          {repCmt.status === true && repCmt.key === comment._id ? (
            <Col
              span={18}
              xs={24}
              md={18}
              align="start"
              style={{
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                className="comment-area"
                style={{ display: "flex", alignItems: "center" }}
              >
                <textarea
                  placeholder="Xin mời để lại câu hỏi, tôi sẽ trả lời trong 1h từ 8h - 22h mỗi ngày."
                  rows={10}
                  cols={3}
                  vaule={repValue}
                  onChange={(e) => setRepValue(e.target.value)}
                ></textarea>
              </div>

              <div className="comment-send">
                <button onClick={() => handleRepComment()}>Trả lời</button>
              </div>
            </Col>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}

export default AllComment;
