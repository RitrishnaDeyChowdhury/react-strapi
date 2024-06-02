import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import Navbar from './components/Navbar';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from "./components/utils/appStore";
import 'react-toastify/dist/ReactToastify.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash,faXmark } from '@fortawesome/free-solid-svg-icons';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Registration from './components/Registration';
library.add(faTrash,faXmark);
function AppLayout() {
	return (
		<Provider store={appStore}>
			<div>
				<Navbar />
				<Outlet />
			</div>
		</Provider>
	);
}
const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Body />
			},
            {
				path: "/about",
				element: <About />
			},
            {
				path: "/blog",
				element: <Blog />
			},
            {
				path: "/contact-us",
				element: <Contact />
			},
            {
				path: "/cart",
				element: <Cart />
			},
			{
				path: "/checkout",
				element: <Checkout/>
			},
			{
				path: "/login",
				element: <Login/>
			},
			{
				path: "/registration",
				element: <Registration/>
			},
            {
				path: "/product-details/:pid",
				element: <ProductDetails />
			}
		],
		errorElement: <Error />
	}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);