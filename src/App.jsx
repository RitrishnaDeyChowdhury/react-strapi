import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import Navbar from './components/Navbar';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import { createBrowserRouter,Outlet,RouterProvider, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from "./components/utils/appStore";
import 'react-toastify/dist/ReactToastify.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash,faXmark } from '@fortawesome/free-solid-svg-icons';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Registration from './components/Registration';
import Payment from './components/Payment';
import ThankYou from './components/ThankYou';
import ProtectedRoute from './components/ProtectedRoute';
library.add(faTrash,faXmark);
function AppLayout() {
	const location = useLocation();
  	const [showNavbar, setShowNavbar] = useState(false);

	useEffect(() => {
		const hideNavbarPaths = ['/checkout', '/payment', '/thank-you'];
		const shouldHideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));
		setShowNavbar(!shouldHideNavbar);
	  }, [location.pathname]);

	
	return (
		<Provider store={appStore}>
			<div>
				{ showNavbar && <Navbar />}
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
				// element: <Checkout/>
				element: <ProtectedRoute element={<Checkout />} />,
			},
			{
				path: "/payment",
				element: <ProtectedRoute element={<Payment />} />,
				// element: <Payment/>
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
			},
			{
				path: "/thank-you/:orderId",
				element: <ThankYou />
			}
		],
		errorElement: <Error />
	}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);