import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import PrivateRoute from "./components/AuthUser/PrivateRoute/PrivateRoute";
// import AuthCTDetail from "./components/AuthUser/AuthCTDetail";
// import SearchIngredient from "./components/AuthUser/SearchIngredient";
// import RandomSelection from "./components/AuthUser/RandomSelection";
// import SearchDrinkName from "./components/AuthUser/SearchDrinkName";

const MainRouter = (props) => {
	return (
		<Router user={props.user}>
			<NavBar user={props.user} handleUserLogout={props.handleUserLogout} />
			<Switch>
				{/* <PrivateRoute
					exact
					path={"/search-ingredient"}
					component={SearchIngredient}
				/>
				<PrivateRoute
					exact
					path={"/search-drink-name"}
					component={SearchDrinkName}
				/>
				<PrivateRoute
					exact
					path={"/random-selection"}
					component={RandomSelection}
				/>
				<PrivateRoute
					exact
					path="/recipe-detail/:id"
					component={AuthCTDetail}
				/> */}
				<Route
					exact
					path="/login"
					render={(routerProps) => (
						<Login {...routerProps} handleUserLogin={props.handleUserLogin} />
					)}
				/>
				<Route exact path="/sign-up" component={SignUp} />
				<Route exact path="/" component={Home} />
			</Switch>
		</Router>
	);
};

export default MainRouter;
