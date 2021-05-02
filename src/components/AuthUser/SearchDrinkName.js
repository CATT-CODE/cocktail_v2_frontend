import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export class SearchDrinkName extends Component {
	state = {
		searchNameArray: [],
		nameInput: "",
		displayInput: "",
	};

	handleInputOnChange = (event) => {
		this.setState({
			nameInput: event.target.value,
		});
	};

	handleSearchOnClick = async () => {
		this.setState({
			isLoading: true,
		});
		try {
			let payload = await axios.get(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.nameInput}`
			);
			if (payload.data.drinks === null || payload.data.length === 0) {
				toast.error(
					`No results for '${this.state.nameInput}', please try again`,
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
					isLoading: false,
					nameInput: "",
				});
				return;
			}
			this.setState({
				isLoading: false,
				searchNameArray: payload.data.drinks,
				displayInput: this.state.nameInput,
				nameInput: "",
			});
		} catch (e) {
			console.log(e);
		}
	};

	showSearchArray = () => {
		return this.state.searchNameArray.map((item) => {
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

	render() {
		return (
			<div class="container marketing">
				<h1 style={{ marginBottom: 20, marginTop: 50 }} class="text-muted">
					Search By <span class="text-light">Drink Name</span>
				</h1>
				<div
					class="input-group mb-3 center-block"
					style={{ marginTop: 50, width: 1250 }}
				>
					<input
						onKeyPress={(event) => {
							if (event.key === "Enter") {
								this.handleSearchOnClick();
							}
						}}
						type="text"
						value={this.state.nameInput}
						onChange={this.handleInputOnChange}
						name="nameInput"
						class="form-control"
						placeholder="Input A Drink Name"
					></input>
					<button
						type="submit"
						class="btn btn-outline-secondary"
						onClick={this.handleSearchOnClick}
						id="nameInput"
					>
						Search
					</button>
				</div>
				<div style={{ marginTop: 25 }}>
					{this.state.isLoading ? (
						<div>...Loading</div>
					) : (
						<div>
							{this.state.searchNameArray.length > 0 && (
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
}

export default SearchDrinkName;
