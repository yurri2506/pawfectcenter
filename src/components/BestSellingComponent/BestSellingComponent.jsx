import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CardComponent from "../CardComponent/CardComponent";
import TitleComponent from "../TitleComponent/TitleComponent";
import { Link } from "react-router-dom";

const BestSellingComponent = ({ products, isInMobile,  onClick}) => {
  return (
    <div>
      <TitleComponent
        title="Sản phẩm bán chạy"
        textTransform="uppercase"
        textAlign="center"
        fontSize={isInMobile ? "3rem" : "4rem"}
      />
      <div style={isInMobile ? { margin: "0 4px" } : undefined} className="row">
        {products.map((product, index) => (
          <div key={index} className="col l-3 m-4 c-6">
            <Link
              to={`/product-details/${product._id}`}
              style={{textDecoration: "none"}}
            >
              <CardComponent
                src={`data:image/png;base64,${product.product_images[0] || ""}`}
                alt="ảnh sản phẩm"
                name={product.product_title}
                oldPrice={product.product_price}
                newPrice={(
                  product?.product_price *
                  (1 - product?.product_percent_discount / 100)
                ).toLocaleString()}
                start={product.rating}
                percent={product?.product_percent_discount}
              />
            </Link>
          </div>
        ))}
      </div>
      <ButtonComponent
        width="200px"
        height="50px"
        title="Xem thêm"
        color="#000"
        border="1px solid #000"
        background="#fff"
        borderRadius="15px"
        fontSize="2rem"
        showIcon={false}
        onClick={onClick}
      />
    </div>
  );
};

export default BestSellingComponent;
