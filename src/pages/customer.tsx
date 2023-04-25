import React from "react"
import { useNavigate } from 'react-router-dom';
import ProductCard from './customer/ProductCard'
import HeaderMenu from './customer/HeaderMenu'
import SearchCity from "./customer/SearchCity";
import CustomerMenu from "./customer/CustomerMenu";



const customer = () =>{
    return (
        <div>
        <CustomerMenu/>
        <HeaderMenu/>
        <SearchCity/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        </div>
    );

};

export default customer;