// import React, { useState } from 'react';
// import { Button, Form, Input, DatePicker, Select } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import styles from './AccountPage.css';
// import ProfileUser from "../MyOrderPage/UserProfile.jsx";
// import myAvatar from "../../assets/images/avatar.jpg";
// import moment from 'moment';

// const cx = classNames.bind(styles);

// const initialData = {
//   Input: 'yurri_2506',
//   HoTen: 'Nguyễn Lê Thanh Huyền',
//   NgaySinh: moment('25/06/2204', 'DD/MM/YYYY'),
//   GioiTinh: 'female',
// };

// function EditAccount() {
//   const navigate = useNavigate();

//   const [form] = Form.useForm();
//   const [isFormFilled, setIsFormFilled] = useState(false);

//   const handleSave = (values) => {
//     alert('Cập nhật thông tin thành công!');
//     navigate('/account/profile');
//   };

//   const handleCancel = () => {
//     navigate('/account/profile');
//   };

//   const handleValuesChange = (_, allValues) => {
//     const requiredFields = ['Input', 'HoTen', 'NgaySinh', 'GioiTinh'];
//     const isAllFieldsFilled = requiredFields.every(
//       (field) => allValues[field] && allValues[field].toString().trim() !== ''
//     );
//     setIsFormFilled(isAllFieldsFilled);
//   };

//   return (
//     <div className='grid wide'>
//     <div style={{ margin: "0 auto", padding: "20px" }} className={cx('container')}>
//       <div className={cx('profile-container')}>
//         <ProfileUser
//           full_name="Nguyễn Lê Thanh Huyền"
//           src_img={myAvatar}
//           name="yurri_2506"
//         />

//         <div className={cx('content')}>
//           <span className={cx('header')}>Sửa thông tin tài khoản</span>

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
//               label="Tên người dùng"
//               name="Input"
//               rules={[{ required: true, message: 'Nhập tên người dùng!' }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Họ và tên"
//               name="HoTen"
//               rules={[{ required: true, message: 'Nhập họ và tên!' }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Ngày sinh"
//               name="NgaySinh"
//               rules={[{ required: true, message: 'Nhập ngày sinh!' }]}
//             >
//               <DatePicker format="DD/MM/YYYY" />
//             </Form.Item>

//             <Form.Item
//               label="Giới tính"
//               name="GioiTinh"
//               rules={[{ required: true, message: 'Chọn giới tính!' }]}
//             >
//               <Select>
//                 <Select.Option value="male">Nam</Select.Option>
//                 <Select.Option value="female">Nữ</Select.Option>
//                 <Select.Option value="other">Khác</Select.Option>
//               </Select>
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
//                 Lưu thay đổi
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default EditAccount;


import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.scss'
import './AccountPage.scss'
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { editUser } from '../../services/User.service.js';
import { updateUser } from '../../redux/slices/userSlice.js';
import UserProfileComponent from '../../components/UserProfileComponent/UserProfileComponent.jsx';
import clsx from 'clsx';


function EditAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isFormFilled, setIsFormFilled] = useState(false);
  const access_token = localStorage.getItem("accessToken")
  const { isAuthenticated, user_phone, user_email, user_name, user_avt_img, _id, full_name, user_birth, user_sex, user_address } = useSelector(
    (state) => state.user
  );

  const initialData = {
    user_name: user_name,
    full_name: full_name,
    user_birth: moment(user_birth),
    user_sex: user_sex,
  };

  const handleSave = (values) => {
    //const{User_name, HoTen, NgaySinh, GioiTinh} = values
    console.log('gia tri', values)
    const res = handleUpdateUser(values)
    dispatch(
      updateUser({
        ...res?.data
      })
    );
    // alert('Cập nhật thông tin thành công!');
    // navigate('/account/profile');
    navigate('/account/profile')
  };

  const handleCancel = () => {
    navigate('/account/profile');
  };

  const handleValuesChange = (_, allValues) => {
    const requiredFields = ['user_name', 'full_name', 'user_birth', 'user_sex'];
    const isAllFieldsFilled = requiredFields.every(
      (field) => allValues[field] && allValues[field].toString().trim() !== ''
    );
    setIsFormFilled(isAllFieldsFilled);
  };

  const handleUpdateUser = async (userData) => {
    try {
      console.log('user', userData)
      const res = await editUser(_id, access_token, userData);
      console.log("Fetched update user", res);
      dispatch(
        updateUser({
          ...res?.data
        })
      );

    } catch (error) {
      console.error("Error in handleUpdate:", error);
    }
  }

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
            <h2 className={styles.change}>Sửa thông tin tài khoản</h2>

            <Form
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className={clsx('AccountPage_form__NByn5', styles.form)}
              form={form}
              initialValues={initialData}
              onFinish={handleSave}
              onValuesChange={handleValuesChange}
            >
              <div className={clsx('AccountPage_filed__9Lfm3', styles.filed)}>
              <Form.Item
                label="Tên người dùng"
                name="user_name"
                rules={[{ required: true, message: 'Nhập tên người dùng!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Họ và tên"
                name="full_name"
                rules={[{ required: true, message: 'Nhập họ và tên!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="user_birth"
                rules={[{ required: true, message: 'Nhập ngày sinh!' }]}
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="user_sex"
                rules={[{ required: true, message: 'Chọn giới tính!' }]}
              >
                <Select>
                  <Select.Option value="Nam" style={{display: "block"}}>Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                  <Select.Option value="Khác">Khác</Select.Option>
                </Select>
              </Form.Item>
              </div>

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
                    Lưu thay đổi
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

export default EditAccount;
