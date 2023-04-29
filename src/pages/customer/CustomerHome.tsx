import React from "react";
import HeaderMenu from "./HeaderMenu";
import SearchCity from "./SearchCity";
import ProductCard from "./ProductCard";

const CustomerHome = () => {
    return (
        <div>
            <HeaderMenu />
            <SearchCity />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    )

}

export default CustomerHome;