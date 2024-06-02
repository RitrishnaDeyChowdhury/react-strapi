import React from 'react'
import { useState, useEffect } from 'react';
import Product from './Product';

import { Link } from 'react-router-dom';
import Description from './Description';

import useProductList from './hooks/useProductList';
import { useDispatch } from 'react-redux';
import { resetItem } from './utils/cartSlice';
import { ToastContainer } from 'react-toastify';

const Body = () => {
    const {listOfProducts,isLoading,error} = useProductList(); //custom hook

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: {error}</div>

    if (listOfProducts.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <>
            <section className="text-gray-600 body-font bg-gray-200 py-8 z-0">
                <div className="w-[90%] container m-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6 sm:mt-[60px] mt-[100px]">
                        {listOfProducts.map((product) => (
                            <Product resData={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
            <Description />
        </>
    );
};

export default Body;
