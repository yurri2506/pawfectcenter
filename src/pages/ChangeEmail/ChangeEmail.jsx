// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import styles from './ChangeEmail.css';
// import ProfileUser from "../MyOrderPage/UserProfile.jsx";
// import myAvatar from "../../assets/images/avatar.jpg";

// import { Button, Form, Input } from 'antd';

// const cx = classNames.bind(styles);

// const initialData = {
//   currentEmail: 'thanhhuyen@gmail.com.vn',
// };

// function ChangeEmail() {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   const [isFormFilled, setIsFormFilled] = useState(false);

//   const handleValuesChange = (changedValues, allValues) => {
//     if (allValues.newEmail && allValues.newEmail.trim() !== '') {
//       setIsFormFilled(true);
//     } else {
//       setIsFormFilled(false);
//     }
//   };

//   const handleSave = (values) => {
//     alert('Hãy xác thực email mới!');
//     navigate('/verification');
//   };

//   const handleCancel = () => {
//     navigate('/account/profile');
//   };

//   return (
//     <div className='grid wide'>
//     <div style={{ margin: "0 auto", padding: "20px" }} className={cx('container')}>
//       <div className="profile-container">
//         <ProfileUser
//           full_name="Nguyễn Lê Thanh Huyền"
//           src_img={myAvatar}
//           name="yurri_2506"
//         />

//         <div className={cx('content')}>
//           <span className={cx('header')}>Đổi email</span>
//           <Form
//             layout="horizontal"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 18 }}
//             className={cx('form')}
//             form={form}
//             initialValues={initialData}
//             onFinish={handleSave}
//             onValuesChange={handleValuesChange}
//           >
//             <Form.Item
//               label="Email hiện tại"
//               name="currentEmail"
//             >
//               <Input disabled value={initialData.currentEmail} />
//             </Form.Item>

//             <Form.Item
//               label="Email mới"
//               name="newEmail"
//               rules={[
//                 { required: true, message: 'Nhập email mới!' },
//                 { type: 'email', message: 'Email không hợp lệ!' },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
//               <Button
//                 htmlType="reset"
//                 className={cx('cancel-button')}
//                 onClick={handleCancel}
//               >
//                 Hủy
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className={cx('confirm-button')}
//                 disabled={!isFormFilled}
//                 style={{
//                   backgroundColor: isFormFilled ? '#E87428' : '#d9d9d9',
//                   borderColor: isFormFilled ? '#E87428' : '#d9d9d9',
//                 }}
//               >
//                 Xác nhận
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default ChangeEmail;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChangeEmail.module.scss'
import './ChangeEmail.scss'
import UserProfileComponent from '../../components/UserProfileComponent/UserProfileComponent'
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { sendOtp } from '../../services/Email.service.js';
import clsx from 'clsx';

function ChangeEmail() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isFormFilled, setIsFormFilled] = useState(false);
  const { _id, isAuthenticated, user_email, user_name, full_name, user_avt_img } = useSelector((state) => state.user); // Lấy email từ Redux
  const [error, setError] = useState('');
  const initialData = {
    currentEmail: user_email,
    newEmail: ''
  };
  const handleValuesChange = (changedValues, allValues) => {
    if (allValues.newEmail && allValues.newEmail.trim() !== '') {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  };

  const handlesendOtp = async (email) => {
    try {
      const response = await sendOtp(email);
      console.log(response)
    } catch (error) {
      setError(error.message || "Có lỗi xảy ra.");
      //setShowPopup(true);
    }
  };

  const handleSave = (values) => {
    const { newEmail } = values
    handlesendOtp(newEmail);
    navigate('/verification', { state: { newEmail } });
  };

  const handleCancel = () => {
    navigate('/account/profile');
  };

  return (
    <div className={styles.main}>
      <div className='grid wide'>
        <div className={styles.wrapMain}>
          <UserProfileComponent
            full_name={full_name}
            src_img={user_avt_img}
            user_name={user_name}
            className={styles.user}
          />

          <div className={styles.wrapInfo}>
            <h2 className={styles.change}>{user_email ? 'Đổi email' : 'Thêm email mới'}</h2>

            <Form
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className={clsx('ChangeEmail_form__EgdcD', styles.form)}
              form={form}
              initialValues={{ currentEmail: user_email || '' }}
              onFinish={handleSave}
              onValuesChange={handleValuesChange}
            >
              <Form.Item
                label="Email hiện tại"
                name="currentEmail"
              >
                {user_email ? (
                  <Input disabled value={user_email} />
                ) : (
                  <span style={{ color: 'red' }}>Chưa có email</span>
                )}
              </Form.Item>

              <Form.Item
                label="Email mới"
                name="newEmail"
                rules={[
                  { required: true, message: 'Nhập email mới!' },
                  { type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <div className={styles.btn}>
                  <Button
                    htmlType="reset"
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.submitBtn}
                    disabled={!isFormFilled}
                    style={{
                      backgroundColor: isFormFilled ? '#E87428' : '#d9d9d9',
                      borderColor: isFormFilled ? '#E87428' : '#d9d9d9',
                    }}
                  >
                    {user_email ? 'Xác nhận' : 'Thêm email mới'}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeEmail;

