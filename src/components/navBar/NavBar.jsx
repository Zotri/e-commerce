import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/logo.png";
import useStyle from "./styles";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ totalItems }) => {
	const classes = useStyle();
	const location = useLocation();

	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography
						component={Link}
						to='/'
						variant='h6'
						className={classes.titel}
						color='inherit'>
						<img
							src={logo}
							alt='E-Commerce'
							height='25px'
							className={classes.image}
						/>
						E-Commerce
					</Typography>
					<div className={classes.grow} />
					{location.pathname === "/" && (
						<div classeName={classes.button}>
							<IconButton
								component={Link}
								to='/cart'
								aria-label='show cart items'
								color='inherit'>
								<Badge badgeContent={totalItems} color='secondary'>
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
