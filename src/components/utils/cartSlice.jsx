import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        resetItem:(state,action)=>{
            state.items = action.payload;
        },
        addItem : (state,action)=>{
            const itemIndex = state.items.findIndex((item)=> item.id==action.payload.id)
            if(itemIndex >=0 ){
                state.items[itemIndex].qty+=action.payload.qty
                toast.success(`${action.payload.name} is added to the cart again!`,
                {position:'bottom-left' })
            }else{
                state.items.push(action.payload);
                toast.success(`${action.payload.name} is added to the cart!`,
                {position:'bottom-left' })
            }
            window.localStorage.setItem('items', JSON.stringify(state.items));
        },
        updateItem:(state,action)=>{
            const itemIndex = state.items.findIndex((item)=> item.id==action.payload.id)
            if(itemIndex >=0 ){
                state.items[itemIndex].qty = action.payload.qty;
                window.localStorage.setItem('items', JSON.stringify(state.items));
                toast.success(`Quantity is updated to the cart!`,
                    {position:'bottom-left' })
            }
        },
        removeItem:(state,action)=>{
            const itemIndex = state.items.findIndex((item)=> item.id==action.payload.id)
            if(itemIndex >=0 ){
                state.items.splice(itemIndex,1);
                window.localStorage.setItem('items', JSON.stringify(state.items));
                toast.success(` Item is deleted from the cart!`,
                    {position:'bottom-left' })
            }
        },
        clearCart:(state)=>{
            state.items = [];
            window.localStorage.setItem('items', []);
        }
    }
})

export default cartSlice.reducer;
export const {resetItem,addItem,updateItem,removeItem,clearCart} = cartSlice.actions;