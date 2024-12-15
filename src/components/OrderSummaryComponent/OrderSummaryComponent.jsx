// import React, { useState } from 'react'
// import styles from './OrderSummaryComponent.module.scss'
// import { RiCoupon3Line } from "react-icons/ri";
// import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import UnderLineComponent from '../UnderLineComponent/UnderLineComponent';
// import VoucherComponent from '../VoucherComponent/VoucherComponent';
// import VoucherDetailComponent from '../VoucherDetailComponent/VoucherDetailComponent';

// const OrderSummaryComponent = ({ frontTotal, backTotal, discount, shippingFee, safe, onClick }) => {
//   const [selectedVouchers, setSelectedVouchers] = useState({
//     shipping: null,
//     product: null,
//   });

//   const [appliedVouchers, setAppliedVouchers] = useState({
//     shipping: null,
//     product: null,
//   });

//   const handleVoucherSelection = (voucher, type) => {
//     setSelectedVouchers((prev) => ({
//       ...prev,
//       [type]: prev[type]?.id === voucher.id ? null : voucher,
//     }));
//   };

//   const applyVouchers = () => {
//     setAppliedVouchers(selectedVouchers);
//   };

//   return (
//     <div className={styles.orderSummary}>
//       <h3>Order Summary</h3>
//       {/* <input
//             type="text"
//             placeholder="Nhập mã giảm giá..."
//             value={coupon}
//             onChange={(e) => setCoupon(e.target.value)}
//           />
//           <span><RiCoupon3Line /></span>
//           <button className={styles.btn} onClick={handleApplyCoupon}>Áp dụng</button> */}
//       {/* <VoucherComponent 
//           coupon={coupon}
//           onChange={(e) => setCoupon(e.target.value)}
//           onClick={handleApplyCoupon}
//         /> */}
//       <div className={styles.voucher}>
//         <VoucherComponent
//           onVoucherSelect={handleVoucherSelection}
//           selectedVouchers={selectedVouchers}
//           applyVouchers={applyVouchers}
//         />
//         <div className={styles.voucherDetail}>
//           <VoucherDetailComponent voucher={appliedVouchers.product} type="product" />
//           <VoucherDetailComponent voucher={appliedVouchers.shipping} type="shipping" />
//         </div>
//       </div>
//       <UnderLineComponent
//         width="100%"
//         height="2px"
//         background="rgba(0, 0, 0, 0.2)"
//         margin="30px 0 20px"
//       />
//       <p>Tổng tiền hàng: <p className={styles.normal}>  {frontTotal.toLocaleString()} VNĐ</p></p>
//       <p>Tiết kiệm <p className={styles.normal}>{safe.toLocaleString()} VNĐ</p></p>
//       <p>Tổng thanh toán: <p className={styles.total}>{backTotal.toLocaleString()} VNĐ</p></p>
//       <div className={styles.wrapBtn}>
//         <ButtonComponent
//           primary
//           title="Mua hàng"
//           width="80%"
//           textAlign="center"
//           onClick={onClick}
//           className={styles.btnBuy}
//           showIcon={false}
//         />
//       </div>
//     </div>
//   );
// }

// export default OrderSummaryComponent

import React, { useState } from 'react'
import styles from './OrderSummaryComponent.module.scss'
import { RiCoupon3Line } from "react-icons/ri";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import UnderLineComponent from '../UnderLineComponent/UnderLineComponent';
import VoucherComponent from '../VoucherComponent/VoucherComponent';
import VoucherDetailComponent from '../VoucherDetailComponent/VoucherDetailComponent';

const OrderSummaryComponent = ({ frontTotal, backTotal, discount, shippingFee, safe, onClick, products }) => {

  const [selectedVouchers, setSelectedVouchers] = useState({
    shipping: null,
    product: null,
  });

  const [appliedVouchers, setAppliedVouchers] = useState({
    shipping: null,
    product: null,
  });

  const handleVoucherSelection = (voucher, type) => {
    setSelectedVouchers((prev) => ({
      ...prev,
      [type]: prev[type]?.id === voucher.id ? null : voucher,
    }));
  };

  const applyVouchers = () => {
    setAppliedVouchers(selectedVouchers);
  };

  return (
    <div className={styles.orderSummary}>
      <h3>Order Summary</h3>
      {/* <input
            type="text"
            placeholder="Nhập mã giảm giá..."
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <span><RiCoupon3Line /></span>
          <button className={styles.btn} onClick={handleApplyCoupon}>Áp dụng</button> */}
      {/* <VoucherComponent 
          coupon={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          onClick={handleApplyCoupon}
        /> */}
      <div className={styles.voucher}>
        <VoucherComponent
          onVoucherSelect={handleVoucherSelection}
          selectedVouchers={selectedVouchers}
          applyVouchers={applyVouchers}
          products = {products}
        />
        <div className={styles.voucherDetail}>
          <VoucherDetailComponent voucher={appliedVouchers.product} type="product" />
          <VoucherDetailComponent voucher={appliedVouchers.shipping} type="shipping" />
        </div>
      </div>
      <UnderLineComponent
        width="100%"
        height="2px"
        background="rgba(0, 0, 0, 0.2)"
        margin="30px 0 20px"
      />
      <p>Tổng tiền hàng: <p className={styles.normal}>  {frontTotal.toLocaleString()} VNĐ</p></p>
      <p>Tiết kiệm <p className={styles.normal}>{safe.toLocaleString()} VNĐ</p></p>
      <p>Tổng thanh toán: <p className={styles.total}>{backTotal.toLocaleString()} VNĐ</p></p>
      <div className={styles.wrapBtn}>
        <ButtonComponent
          primary
          title="Mua hàng"
          width="80%"
          textAlign="center"
          onClick={onClick}
          className={styles.btnBuy}
          showIcon={false}
        />
      </div>
    </div>
  );
}

export default OrderSummaryComponent