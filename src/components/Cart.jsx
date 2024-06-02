import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { URL } from './utils/Constants';
import { removeItem, updateItem, clearCart } from './utils/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store)=>store.cart.items);
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, newQty) => {
        setQuantities(prevQuantities => ({...prevQuantities,[id]: newQty}));

        dispatch(updateItem({id:id,qty:newQty}))
    };

    const handleItemRemove = (id)=>{
        dispatch(removeItem({id:id}))
    }
    const handleClearCart = ()=>{
        dispatch(clearCart())
    }

    const cartTotal = cartItems.reduce((total, item)=>{
        const qty = quantities[item.id] || item.qty;
        return total + item.price * qty;
    },0);

    return (
        <>
            <div className='w-[100%] bg-gray-100 '>
                <div className='text-center text-2xl font-semibold py-4'></div>
                
                <div className='w-full sm:w-[50%] mx-auto mt-28 px-2 bg-white shadow-md'>
                    {
                        cartItems.map(({id,image,name,price,qty})=>(
                            <div key={id} className='bg-white grid grid-cols-[40%_60%] sm:grid-cols-[25%_75%] border-b sm:p-4 p-2 relative'>
                                <div className='items-center ml-5'>
                                    <Link to={`/product-details/${id}`}><img src={URL+image} alt={name} className='w-3/5 h-full bg-gray-400'/></Link>
                                </div>
                                <div className='mt-1'>
                                    <h1 className='text-base font-medium w-[90%]'>{name}</h1>
                                    <div className='flex mt-3'>
                                        <select className='border-[2px] py-2 w-[50px] text-center rounded-xl bg-gray-200' onChange={(e) => handleQuantityChange(id, Number(e.target.value))}>
                                        {
                                            Array.from({ length: 10 }, (v,i) => i+1).map((i) => (
                                                <option key={i} value={i} selected={(quantities[id] || qty) === i}>{i}</option>
                                            ))
                                        }
                                        </select>
                                        {/* <input type='number' value={quantities[id] || qty} className='border-[2px] py-2 w-[50px] text-center rounded-xl bg-gray-200' onChange={(e) => handleQuantityChange(id, Number(e.target.value))}/> */}
                                        <div className='flex mt-[9px]'>
                                            {/* <h1 className='mx-4 text-sm font-medium text-gray-500'>${price.toFixed(2)}</h1> */}
                                            <h1 className='text-sm font-medium mx-4'>${(price* (quantities[id] || qty)).toFixed(2)} </h1>
                                        </div>
                                    </div>
                                    <h1 className='absolute cursor-pointer top-2 right-2 ' onClick={() =>handleItemRemove(id)}><FontAwesomeIcon icon="fa-solid fa-xmark" className='text-xl text-gray-500'/></h1>
                                </div>
                            </div>
                            
                        ))
                    }
                    <div className='flex justify-between px-2 py-2 bg-white'>
                        <h1 className='text-gray-500 text-[15px] font-normal ml-3'>Subtotal</h1>
                        <h1 className='text-[17px] font-medium mr-3'>${cartTotal.toFixed(2)}</h1>
                    </div>
                    <div className='flex justify-between px-2 bg-white'>
                        <h1 className='text-gray-500 text-[15px] font-normal ml-3'>Shipping</h1>
                        <h1 className='text-[17px] font-medium mr-3'>$0.00</h1>
                    </div>
                    <div className='flex justify-between px-2 pb-3 bg-white border-b'>
                        <h1 className='text-gray-500 text-[15px] font-normal ml-3'>Total</h1>
                        <h1 className='text-[17px] font-medium mr-3'>${cartTotal.toFixed(2)}</h1>
                    </div>
                    <div className="mt-6 text-center pb-4">
                        <Link to="/checkout"><button type="button" className="group w-[90%] sm:w-[90%] inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                            Checkout
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button></Link>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Cart