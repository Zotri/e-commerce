import React, { useState, useEffect } from "react";
import "./App.css";
import { Products, NavBar, Cart } from "./components/";
import { commerce } from "./lib/commers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	// using useEffect to fetch products immediately after the application loads
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({
		line_items: [],
		subtotal: {
			formatted_with_symbol: ""
		}
	});

	const fetchItemsFromCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const handleCartClick = async (producId, quantity) => {
		const { cart } = await commerce.cart.add(producId, quantity);

		setCart(cart);
	};

	const handleUpdateCartQuantity = async (productId, quantity) => {
		//quantity in object because quantity one of the items that you want to update
		const { cart } = await commerce.cart.update(productId, { quantity });

		setCart(cart);
	};

	const hanldeRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);

		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();

		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchItemsFromCart();
	}, []);

	console.log("cart", cart);
	//console.log("cart items", cart.total_items);
	console.log("- - - products api commerce - - -", products);
	return (
		<Router>
			<div>
				<NavBar totalItems={cart.total_items} />
				<Switch>
					<Route exact path='/'>
						<Products products={products} onCartClick={handleCartClick} />
					</Route>

					<Route exact path='/cart'>
						<Cart
							cart={cart}
							onUpdateCartQuantity={handleUpdateCartQuantity}
							onRemoveFromCart={hanldeRemoveFromCart}
							onEmptyCart={handleEmptyCart}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
