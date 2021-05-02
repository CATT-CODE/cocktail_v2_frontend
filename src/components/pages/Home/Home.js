import React, { useState, useEffect } from "react";
import { checkIsUserLoggedIn } from "../lib/helpers";
import Axios from "../../lib/axios/Axios";
import randomImg from "../../images/random.png";
import nameImg from "../../images/name.jpg";
import ingredientsImg from "../../images/ingredients.jpg";
import "./Home.css";

function Home(props) {
	
	const [ctArray, setCtArray] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [ctName, setCtName] = useState("");
	const [ctDescription, setCtDescription] = useState("");
	const [ctID, setCtID] = useState("");
	const [ctImg, setCtImg] = useState("");



	// async componentDidMount() {
	// 	this.setState({
	// 		isLoading: true,
	// 	});
	// 	try {
	// 		let ctData = await axios.get(
	// 			`https://www.thecocktaildb.com/api/json/v1/1/random.php`
	// 		);
	// 		this.setState({
	// 			ctArray: ctData.data.drinks[0],
	// 			isLoading: false,
	// 			ctName: ctData.data.drinks[0].strDrink,
	// 			ctDescription: ctData.data.drinks[0].strCategory,
	// 			ctID: Number(ctData.data.drinks[0].idDrink),
	// 			ctImg: ctData.data.drinks[0].strDrinkThumb,
	// 		});
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

		return (
			<main>
				<div class="carousel slide" data-bs-ride="carousel">
					<div id="my-carousel-bg" class="carousel-inner">
						<div class="carousel-item active">
							{/* <img className="thumbnail" id="ctMainImg" src={this.state.ctImg} alt="something"/>  */}
							<div className="w3-card-4">
								<img
									src={this.state.ctImg}
									alt="LAME"
									style={{
										width: 400,
										marginLeft: 1215,
										marginTop: 55,
										boxShadow:
											"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
									}}
								/>
							</div>
							{checkIsUserLoggedIn() ? (
								<div class="container">
									<div class="carousel-caption text-start">
										<h1>{this.state.ctName}</h1>
										<p class="text-secondary">{this.state.ctDescription}</p>
										<p>
											<a
												class="btn btn-lg btn-secondary"
												href={`/recipe-detail/${this.state.ctID}`}
											>
												View The Recipe &raquo;
											</a>
										</p>
									</div>
								</div>
							) : (
								<div class="container">
									<div class="carousel-caption text-start">
										<h1>{this.state.ctName}</h1>
										<p>{this.state.ctDescription}</p>
										<p>
											<a class="btn btn-lg btn-secondary" href="/sign-up">
												Sign Up To View Recipes &raquo;
											</a>
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div class="container marketing">
					<div class="row">
						<div class="col-lg-4">
							<img
								src={nameImg}
								alt="something"
								className="bd-placeholder-img rounded-circle"
								width="225"
								height="225"
								style={{
									marginBottom: 15,
									boxShadow:
										"0 4px 50px 50px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
								}}
							/>
							<h2 style={{ marginBottom: 15 }} class="text-light">
								<span class="text-muted">Search By</span> Drink Name
							</h2>
							<p>
								<a class="btn btn-secondary" href="/search-drink-name">
									Go &raquo;
								</a>
							</p>
						</div>
						<div class="col-lg-4">
							<img
								src={ingredientsImg}
								alt="something"
								className="bd-placeholder-img rounded-circle"
								width="225"
								height="225"
								style={{
									marginBottom: 15,
									boxShadow:
										"0 4px 50px 50px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
								}}
							/>
							<h2 style={{ marginBottom: 15 }} class="text-light">
								<span class="text-muted">Search By</span> Ingredient
							</h2>
							<p>
								<a
									class="btn btn-secondary"
									href="/search-ingredient"
									style={{ marginBottom: 15 }}
								>
									Go &raquo;
								</a>
							</p>
						</div>
						<div class="col-lg-4">
							<img
								src={randomImg}
								alt="something"
								href="/random-selection"
								className="bd-placeholder-img rounded-circle"
								width="225"
								height="225"
								style={{
									marginBottom: 15,
									boxShadow:
										"0 4px 50px 50px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
								}}
							/>
							<h2 style={{ marginBottom: 15 }} class="text-light">
								<span class="text-muted">Random </span>
								Collection
							</h2>
							<p>
								<a class="btn btn-secondary" href="/random-selection">
									Go &raquo;
								</a>
							</p>
						</div>
					</div>
				</div>
			</main>
		);
}


export default Home;
