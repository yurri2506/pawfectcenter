// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import styles from './SortProductComponent.module.scss'
// import ButtonComponent from '../ButtonComponent/ButtonComponent'
// import { FaChevronDown } from 'react-icons/fa6'
// import { CiFilter } from "react-icons/ci";
// import clsx from 'clsx'
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";


// const SortProductComponent = ({handleNavbar, isInViewport, isInMobile}) => {
//     const [selectedButton, setSelectedButton] = useState('Liên quan');

//     const navigate = useNavigate()

//     const [isPriceAscending, setIsPriceAscending] = useState(true); 

//     const handleClick = (item) => {
//         if (item === 'Giá') {
//             setIsPriceAscending(!isPriceAscending); 
//         }
//         setSelectedButton(item); 
//     };

//   return (
//     <div>
//         <div className={styles.sort}>
//             {isInViewport || isInMobile ? (
//                 null
//             ) : (<span>Sắp xếp theo</span>)}
//             {isInMobile ? (
//                 <ul className={clsx('row', styles.newNav)}>
//                     {['Liên quan', 'Mới nhất', 'Bán chạy', 'Giá'].map((item, index) => (
//                         <li 
//                             key={index}
//                             className={clsx('col c-3', {
//                                 [styles.active]: selectedButton === item,
//                             })}
//                             onClick={() => handleClick(item)}
//                             // onClick={() => navigate('/')}
//                         >
//                             {item}
//                             {index === 3 && (
//                                 isPriceAscending ? (
//                                     <FaArrowUp className={styles.icon} />
//                                 ) : (
//                                     <FaArrowDown className={styles.icon} />
//                                 )
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <div style={{display: "flex", alignItems: "center"}}>
//                     <div className={styles.allBtn}>
//                         <ButtonComponent 
//                             title="Liên quan"
//                             width="110px"
//                             height="45px"
//                             fontSize="2rem"
//                             widthDiv="none"
//                             className={styles.btn}
//                             primary={selectedButton === 'Liên quan'}
//                             onClick={() => handleClick('Liên quan')}
//                         />
//                         <ButtonComponent 
//                             title="Mới nhất"
//                             width="110px"
//                             height="45px"
//                             fontSize="2rem"
//                             widthDiv="none"
//                             className={styles.btn}
//                             primary={selectedButton === 'Mới nhất'}
//                             onClick={() => handleClick('Mới nhất')}  
//                         />
//                         <ButtonComponent 
//                             title="Bán chạy"
//                             width="110px"
//                             height="45px"
//                             fontSize="2rem"
//                             widthDiv="none"
//                             className={styles.btn}
//                             primary={selectedButton === 'Bán chạy'}
//                             onClick={() => handleClick('Bán chạy')}
//                         />
//                     </div>
//                     <div className={styles.price}>
//                         <span>Giá</span>
//                         <FaChevronDown className={styles.icon}/>
//                         <ul>
//                             <li>
//                                 <Link to={"/"}>
//                                     Giá: Thấp đến Cao
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to={"/"}>
//                                     Giá: Cao đến Thấp
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             )}
//             {isInViewport || isInMobile ? (
//                     <div onClick={handleNavbar} className={styles.filter}>
//                         <CiFilter className={styles.icon}/>
//                         <span>LỌC</span>
//                     </div>
//                 ) : null
//             }
//         </div>
//     </div>
//   )
// }

// export default SortProductComponent
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SortProductComponent.module.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { FaChevronDown } from 'react-icons/fa6';
import { CiFilter } from "react-icons/ci";
import clsx from 'clsx';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SortProductComponent = ({ handleNavbar, isInViewport, isInMobile, handleFilterChange }) => {
  const [selectedButton, setSelectedButton] = useState('Liên quan');
  const [isPriceAscending, setIsPriceAscending] = useState(true); // Quản lý trạng thái sắp xếp giá

  const navigate = useNavigate();

  // Cập nhật giá trị sort khi người dùng thay đổi lựa chọn
  const handleClick = (item) => {
    let sortValue = '';

    if (item === 'Giá') {
      // Đổi chiều sắp xếp giá khi người dùng chọn "Giá"
      setIsPriceAscending(!isPriceAscending);
      sortValue = isPriceAscending ? 'price_asc' : 'price_desc';
    } else if (item === 'Liên quan') {
      sortValue = 'popular'; // Liên quan = popular
    } else if (item === 'Bán chạy') {
      sortValue = 'best_selling'; // Bán chạy = best_selling
    } else if (item === 'Mới nhất') {
      sortValue = 'newest'; // Mới nhất = newest
    }

    setSelectedButton(item);

    // Gọi handleFilterChange để thay đổi bộ lọc với sort mới
    handleFilterChange({ sort: sortValue });
  };

  return (
    <div>
      <div className={styles.sort}>
        {isInViewport || isInMobile ? (
          null
        ) : (<span>Sắp xếp theo</span>)}
        {isInMobile ? (
          <ul className={clsx('row', styles.newNav)}>
            {['Liên quan', 'Mới nhất', 'Bán chạy', 'Giá'].map((item, index) => (
              <li 
                key={index}
                className={clsx('col c-3', {
                  [styles.active]: selectedButton === item,
                })}
                onClick={() => handleClick(item)}
              >
                {item}
                {index === 3 && (
                  isPriceAscending ? (
                    <FaArrowUp className={styles.icon} />
                  ) : (
                    <FaArrowDown className={styles.icon} />
                  )
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.allBtn}>
              <ButtonComponent 
                title="Liên quan"
                width="110px"
                height="45px"
                fontSize="2rem"
                widthDiv="none"
                className={styles.btn}
                primary={selectedButton === 'Liên quan'}
                onClick={() => handleClick('Liên quan')}
                showIcon={false}
              />
              <ButtonComponent 
                title="Mới nhất"
                width="110px"
                height="45px"
                fontSize="2rem"
                widthDiv="none"
                className={styles.btn}
                primary={selectedButton === 'Mới nhất'}
                onClick={() => handleClick('Mới nhất')} 
                showIcon={false}
              />
              <ButtonComponent 
                title="Bán chạy"
                width="110px"
                height="45px"
                fontSize="2rem"
                widthDiv="none"
                className={styles.btn}
                primary={selectedButton === 'Bán chạy'}
                onClick={() => handleClick('Bán chạy')}
                showIcon={false}
              />
            </div>
            <div className={styles.price}>
              <span>Giá</span>
              <FaChevronDown className={styles.icon} />
              <ul>
                <li>
                  <Link to={"/"} onClick={() => handleFilterChange({ sort: 'price_asc' })}>
                    Giá: Thấp đến Cao
                  </Link>
                </li>
                <li>
                  <Link to={"/"} onClick={() => handleFilterChange({ sort: 'price_desc' })}>
                    Giá: Cao đến Thấp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {isInViewport || isInMobile ? (
          <div onClick={handleNavbar} className={styles.filter}>
            <CiFilter className={styles.icon} />
            <span>LỌC</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SortProductComponent;