// import React, { useEffect, useState } from 'react'
// import CartItemComponent from '../../components/CartItemComponent/CartItemComponent';
// import OrderSummaryComponent from '../../components/OrderSummaryComponent/OrderSummaryComponent';
// import product4 from '../../assets/images/product4.svg'
// import product5 from '../../assets/images/product5.svg'
// import product6 from '../../assets/images/product6.svg'
// import styles from './MyCartPage.module.scss'
// import { useNavigate } from 'react-router-dom';

// const MyCartPage = () => {
//     const initialItems = [
//         { id: 1, name: 'Thuốc dưỡng lông cho chó VEGEBRAND Bee Slurry Hair Beauty', price: 170000, oldPrice: 200000, quantity: 1, img : product4 },
//         { id: 2, name: 'Bánh thưởng cho mèo CIAO vị cá ngừ & ức gà nướng', price: 55000, oldPrice: 100000, quantity: 1, img: product5 },
//         { id: 3, name: 'Bánh thưởng cho chó vị thịt gà WUJI Chicken Jerky Flavor', price: 55000, oldPrice: 95000, quantity: 1, img: product6 },
//       ];
//     const [cartItems, setCartItems] = useState(initialItems);
//     const [discount, setDiscount] = useState(0);
//     const [checkedItems, setCheckedItems] = useState([]);
//     const [shippingFee, setShippingFee] = useState(0);
//     const navigate = useNavigate();

//     const handleCheckout = () => {
//         navigate('/check-out', {
//           state: { cartItems, checkedItems, discount, shippingFee }
//         });
//     };

//     const handleQuantityChange = (id, amount) => {
//       setCartItems(prevItems =>
//         prevItems.map(item =>
//           item.id === id ? { ...item, quantity: item.quantity + amount } : item
//         )
//       );
//     };

//     const handleRemoveItem = id => {
//       setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//     };

//     const handleCheckItem = id => {
//       setCheckedItems(prevCheckedItems => {
//           const newCheckedItems = prevCheckedItems.includes(id)
//               ? prevCheckedItems.filter(itemId => itemId !== id)
//               : [...prevCheckedItems, id];

//           if (newCheckedItems.length === 0) {
//               setDiscount(0);
//               setShippingFee(0);
//           } else {
//               setDiscount(20000);
//               setShippingFee(30000);
//           }

//           return newCheckedItems;
//       });
//   };

//     const handleCheckAll = (isChecked) => {
//       if (isChecked) {
//           setCheckedItems(cartItems.map(item => item.id));
//           setDiscount(20000);
//           setShippingFee(30000);
//       } else {
//           setCheckedItems([]);
//           setDiscount(0);
//           setShippingFee(0);
//       }
//   };

//     let totalAmount = cartItems.reduce((total, item) => {
//       if (checkedItems.includes(item.id)) {
//         return total + item.price * item.quantity;
//       }
//       return total;
//   }, 0) - discount + shippingFee;

//   totalAmount = totalAmount < 0 ? 0 : totalAmount;

//   let safe = cartItems.reduce((total, item) => {
//     if (checkedItems.includes(item.id)) {
//       return total + (item.oldPrice - item.price) * item.quantity;
//     }
//     return total;
// }, 0) + discount;

//   const [isInMobile, setisInMobile] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(max-width: 739px)');
//     const handleViewportChange = () => setisInMobile(mediaQuery.matches);

//     handleViewportChange();
//     mediaQuery.addEventListener('change', handleViewportChange);

//     return () => {
//       mediaQuery.removeEventListener('change', handleViewportChange);
//     };
//   }, []);

//     return (
//       <div className={styles.main}>
//         <div className='grid wide'>
//             <h2>GIỎ HÀNG CỦA BẠN</h2>
//             <div className={styles.checkAll}>
//               <input
//                 type="checkbox"
//                 checked={checkedItems.length === cartItems.length}
//                 onChange={(e) => handleCheckAll(e.target.checked)}
//               />
//               <h3>Chọn tất cả</h3>
//             </div>
//             <div className={styles.cart}>
//               <div className={styles.cartItems}>
//                 {cartItems.map(item => (
//                   <CartItemComponent
//                     key={item.id}
//                     item={item}
//                     onQuantityChange={handleQuantityChange}
//                     onRemove={handleRemoveItem}
//                     onCheck={handleCheckItem}
//                     isChecked={checkedItems.includes(item.id)}
//                     isInMobile={isInMobile}
//                   />
//                 ))}
//               </div>
//               <OrderSummaryComponent
//                 onClick={handleCheckout}
//                 totalAmount={totalAmount}
//                 discount={discount}
//                 shippingFee={shippingFee}
//                 safe={safe}
//               />
//             </div>
//         </div>
//       </div>
//     );
// }

// export default MyCartPage

import React, { useEffect, useState } from "react";
import CartItemComponent from "../../components/CartItemComponent/CartItemComponent";
import OrderSummaryComponent from "../../components/OrderSummaryComponent/OrderSummaryComponent";
import styles from "./MyCartPage.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProductCart,
  getAllProductByUserId,
  updateCart,
  updateCart2,
} from "../../services/Order.service";
import { useQuery } from "@tanstack/react-query";
import product4 from "../../assets/images/product4.svg";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const MyCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [isInMobile, setisInMobile] = useState(false);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { id } = useParams();

  // Hàm fetch dữ liệu từ API
  const fetchCartData = async ({ queryKey }) => {
    const [, userId, token] = queryKey; // Giải nén queryKey
    try {
      const cartProduct = await getAllProductByUserId(userId, token);
      if (!cartProduct || !cartProduct.data) {
        throw new Error("No cart data returned from API");
      }
      return cartProduct; // React Query tự động xử lý Promise này
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
      throw new Error("Failed to fetch cart data");
    }
  };

  // Sử dụng useQuery để gọi API
  const { data, isLoading, error } = useQuery({
    queryKey: ["product-data", id, accessToken],
    queryFn: fetchCartData,
    enabled: !!id && !!accessToken, // Chỉ chạy khi cả id và accessToken có giá trị
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.data?.products) {
      const items = data.data.products.map((item) => ({
        product_id: item.product_id?._id,
        id: item.variant,
        name: item.product_id?.product_title || "Không có tên sản phẩm",
        oldPrice: item?.product_price || 0,
        price:
          item.product_price *
          (
            1 -
            item.product_id?.product_percent_discount / 100
          ).toLocaleString() || 0,
        quantity: item.quantity || 1,
        img:
          item.product_id?.product_images && item.product_id?.product_images[0]
            ? `data:image/jpeg;base64,${item.product_id?.product_images[0]}`
            : product4,
        product_order_type: item.product_order_type
          ? item.product_order_type
          : "Không rõ",
      }));
      setCartItems(items);
    }
  }, [data]);

  // Hàm xử lý các sự kiện
  const handleCheckout = () => {
    console.log(checkedItems.length === 0);
    if (checkedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào");
    } else {
      navigate(`/check-out/${id}`, {
        state: { cartItems, checkedItems, discount, shippingFee },
      });
    }
  };

  const handleQuantityChange = async (id1, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id1
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
    const itemUpdate = cartItems.find((item) => item.id === id1);

    // Chuẩn bị dữ liệu gửi lên Backend
    const updateData = {
      products: [
        {
          product_id: itemUpdate.product_id,
          variant: id1,
          quantity: Math.max(1, itemUpdate.quantity + amount),
        },
      ],
    };
    try {
      // Gửi yêu cầu API để xóa sản phẩm
      const response = await updateCart2(id, updateData, accessToken);
      if (response) {
        console.log("Cập nhật sản phẩm thành công!");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleRemoveItem = async (id1) => {
    // Tìm sản phẩm bị xóa từ `cartItems`
    const itemToRemove = cartItems.find((item) => item.id === id1);

    if (!itemToRemove) {
      alert("Sản phẩm không tồn tại trong giỏ hàng.");
      return;
    }
    // Loại bỏ sản phẩm khỏi trạng thái
    const updatedItems = cartItems.filter((item) => item.id !== id1);
    setCartItems(updatedItems);

    // Chuẩn bị dữ liệu gửi lên Backend
    const removeData = {
      products: [
        {
          product_id: itemToRemove.product_id,
          variant: id1,
        },
      ],
    };
    try {
      // Gửi yêu cầu API để xóa sản phẩm
      const response = await deleteProductCart(id, removeData, accessToken);

      if (response) {
        alert("Xóa sản phẩm thành công!");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");

      // Khôi phục trạng thái nếu API thất bại
      setCartItems((prevItems) => [...prevItems, itemToRemove]);
    }
  };

  const handleCheckItem = (id) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((itemId) => itemId !== id)
        : [...prevCheckedItems, id];

      if (newCheckedItems.length === 0) {
        setDiscount(0);
        setShippingFee(0);
      } else {
        setDiscount(20000);
        setShippingFee(30000);
      }

      return newCheckedItems;
    });
  };

  const handleCheckAll = (isChecked) => {
    if (isChecked) {
      setCheckedItems(cartItems.map((item) => item.id));
      setDiscount(20000);
      setShippingFee(30000);
    } else {
      setCheckedItems([]);
      setDiscount(0);
      setShippingFee(0);
    }
  };

  // Tính toán tổng giá trị
  const frontTotal = checkedItems.reduce((total, id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    return item ? total + item.price * item.quantity : total;
  }, 0);

  const safe =
    checkedItems.reduce((total, id) => {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      return item
        ? total + (item.oldPrice - item.price) * item.quantity
        : total;
    }, 0) + discount;

  const backTotal =
    checkedItems.reduce((total, id) => {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      return item ? total + item.price * item.quantity : total;
    }, 0) -
    discount +
    shippingFee;

  // Xử lý hiển thị giao diện di động
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 739px)");
    const handleViewportChange = () => setisInMobile(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  if (isLoading) {
    return <div>Đang tải dữ liệu giỏ hàng...</div>;
  }

  const handleRemoveAllItems = async () => {
    // Chuẩn bị dữ liệu gửi lên Backend
    const removeData = {
      products: cartItems.map((item) => ({
        product_id: item.product_id,
        variant: item.id,
      })),
    };
    try {
      // Gửi yêu cầu API để xóa sản phẩm
      const response = await deleteProductCart(id, removeData, accessToken);

      if (response) {
        alert("Xóa nhiều sản phẩm thành công!");
      }

      setCartItems([]);
      setCheckedItems([]);
      setDiscount(0);
      setShippingFee(0);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
    }
  };
  const navigateProduct = (id) => {
    navigate(`/product-details/${id}`)
  }


  return (
    <div className={styles.main}>
      <div className="grid wide">
        <h2>GIỎ HÀNG CỦA BẠN</h2>
        <div className={styles.allBtn}>
          <div className={styles.checkAll}>
            {cartItems.length > 0 && (
              <>
                <input
                  type="checkbox"
                  checked={checkedItems.length === cartItems.length}
                  onChange={(e) => handleCheckAll(e.target.checked)}
                />
                <h3>Chọn tất cả</h3>
              </>
            )}
          </div>
          <div className={styles.removeAll}>
            {cartItems.length > 0 && (
              <button
                className={styles.removeAllButton}
                onClick={handleRemoveAllItems}
              >
                Xóa tất cả
              </button>
            )}
          </div>
        </div>
        <div className={styles.cart}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              // <Link
              //   to={`/product-details/${item.product_id}`}
              //   className="product-link"
              // >
              //   <CartItemComponent
              //     key={item.id}
              //     item={item}
              //     onQuantityChange={handleQuantityChange}
              //     onRemove={handleRemoveItem}
              //     onCheck={handleCheckItem}
              //     isChecked={checkedItems.includes(item.id)}
              //     isInMobile={isInMobile}
              //   />
              // </Link>
                <CartItemComponent
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onCheck={handleCheckItem}
                  isChecked={checkedItems.includes(item.id)}
                  isInMobile={isInMobile}
                  onClick={() => navigateProduct(item.product_id)}
                />
            ))}
          </div>
          <OrderSummaryComponent
            onClick={handleCheckout}
            frontTotal={Math.max(frontTotal, 0)}
            backTotal={Math.max(backTotal, 0)}
            discount={discount}
            shippingFee={shippingFee}
            safe={safe}
            products={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCartPage;
