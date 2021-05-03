import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SearchIngredient () {
	
	const [searchIngredientArray, setSearchIngredientArray] = useState([]);
	const [ingredientInput, setIngredientInput] = useState("");
	const [displayInput, setDisplayInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	
	function handleInputOnChange(event) {
		setIngredientInput(event.target.value);
	};

	async function handleSearchOnClick () {
			setIsLoading(true)
		try {
			let payload = await axios.get(
				`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.ingredientInput}`
			);
			if (payload.data === undefined || payload.data.length === 0) {
				toast.error(
					`No results for '${this.state.ingredientInput}', please try again`,
					{
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					}
				);
				this.setState({
					setIsLoading(false)
					ingredientInput: "",
				});
				return;
			}
			this.setState({
				displayInput: this.state.ingredientInput,
				searchIngredientArray: payload.data.drinks,
				ingredientInput: "",
				isLoading: false,
			});
		} catch (e) {
			console.log(e);
		}
	};

	showSearchArray = () => {
		return this.state.searchIngredientArray.map((item) => {
			return (
				<div class="col-lg-4" style={{ marginTop: 25 }} key={item.idDrink}>
					<img
						src={item.strDrinkThumb}
						alt="something"
						className="bd-placeholder-img rounded-circle"
						width="225"
						height="225"
						style={{
							marginBottom: 15,
							boxShadow:
								"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						}}
					/>
					<h2 style={{ marginBottom: 15 }} class="text-light">
						{item.strDrink}
					</h2>
					<p>
						<a
							class="btn btn-secondary"
							href={`/recipe-detail/${item.idDrink}`}
						>
							View Recipe &raquo;
						</a>
					</p>
				</div>
			);
		});
	};

		return (
			<div class="container marketing">
				<h1 style={{ marginBottom: 20, marginTop: 50 }} class="text-muted">
					Search By <span class="text-light">Ingredient</span>
				</h1>
				<div
					class="input-group mb-3 center-block"
					style={{ marginTop: 48, width: 1250 }}
				>
					<input
						type="text"
						value={this.state.ingredientInput}
						onChange={(e) => handleInputOnChange(e)}
						onKeyPress={(event) => {
							if (event.key === "Enter") {
								this.handleSearchOnClick();
							}
						}}
						name="ingredientInput"
						class="form-control"
						placeholder="Input An Ingredient"
					/>
					<button
						type="submit"
						class="btn btn-outline-secondary"
						onClick={this.handleSearchOnClick}
						id="ingredientInput"
					>
						Search
					</button>
				</div>
				<div style={{ marginTop: 25 }}>
					{this.state.isLoading ? (
						<div>...Loading</div>
					) : (
						<div>
							{this.state.searchIngredientArray.length > 0 && (
								<h2 class="text-muted">
									Results for '<span>{this.state.displayInput}</span>'
								</h2>
							)}
							<div className="row">{this.showSearchArray()}</div>
						</div>
					)}
				</div>
			</div>
		);
}

export default SearchIngredient;
