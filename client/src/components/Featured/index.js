import React from "react";
import './style.css';
const apiKey = process.env.REACT_APP_API_KEY;

export default class Featured extends React.Component {
    state = {
        meals: []
    }

    componentDidMount() {
        fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=799c454c6da54da4bab574ff67c13190&number=6`
        )
            .then((respone) => respone.json())
            .then((data) => {
                this.setState({ meals: data.recipes });
            })
            .catch(() => {
                console.log("error");
            })
    };

    render() {
        return (
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        <div className="display-4 head">Featured Meals</div>
                        <div className="gid1">
                        {this.state.meals.map(meals => {
                            return (
                                     <div className="card d-flex align-items-start flex-column meal">
                                     <img alt="recipe" className="card-img-top" src={meals.image}></img>
                                     <div className="card-body" >
                                        <h1 className="card-title">{meals.title}</h1>
                                        <p className="card-text"> Serving Size: {meals.servings} <br />
                                            Health Score: {meals.healthScore} <br />
                                            Preperation Time: {meals.readyInMinutes}
                                        </p>
                                        <a id="filterBtnTwo" className="btn btn-default filter-button card-bottom goto" href={meals.sourceUrl}>
                                            Go to recipe
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                        </div>
                    </div>
                </div>
        )
    }


}