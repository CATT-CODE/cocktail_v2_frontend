import React from "react";
import { Link } from "react-router-dom";
// import "./NavBar.css";

function NavBar(props) {
  return (
    <body>
      <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <p className="h5 my-0 me-md-3 fw-normal" style={{ marginLeft: 22 }}>
            <Link to="/">
              <i class="fas fa-cocktail"></i>
            </Link>
          </p>
          {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button> */}
          <div class="collapse navbar-collapse" id="navbarCollapse">
            {props.user ? (
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="nav-link" href="/favorites" style={{textDecoration: 'underline'}}>
                    {props.user.email}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login" onClick={props.handleUserLogout}>
                    Logout
                  </a>
                </li>
                <nav class="nav" style={{marginLeft: 1450}} >
                  <li><a class="nav-link" href="/search-drink-name">Drink Name</a></li>
                  <li><a class="nav-link" href="/search-ingredient">Ingredient</a></li>
                  <li><a class="nav-link" href="/random-selection">Random</a></li>
                </nav>
              </ul>
            ) : (
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/sign-up">
                    Sign Up
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            )}
            {/* <form class="form-inline mt-2 mt-md-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
          </div>
        </nav>
      </header>
    </body>
  );
}

export default NavBar;
