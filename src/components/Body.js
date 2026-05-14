import { useState, useEffect } from "react";
import RestaurantCard from "../RestaurantCard";
import Shimmer from "./shimmer";
import {Link} from "react-router-dom"

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]); //original data
  const [listOfRestaurants, setListOfRestaurants] = useState([]); //ui data
  const [searchText, setSearchText] = useState("");

  function getTopRatedRestaurants() {
    let listOfTopRated = allRestaurants.filter(
      (res) => res.info.avgRating > 4.0,
    );
    setListOfRestaurants(listOfTopRated);
  }


  function getSearchData() {
    if(!searchText.trim()){
        setListOfRestaurants(allRestaurants);
        return;
    }
    let searchList = allRestaurants.filter((res) => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase()) 
    });
    setListOfRestaurants(searchList)
  }

  useEffect(() => {
    getRestaurantData();
  },[]);

  const getRestaurantData = async () => {
    const data = await fetch(
      "https://namastedev.com/api/v1/listRestaurants",
    );
    const getData = await data.json();
    let restaurantsList =
      getData?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestaurants(restaurantsList); 
    setListOfRestaurants(restaurantsList);
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="top-filter">
        <div>
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key == "Enter"){
                   getSearchData();
                }
            }}
          />
          <button className="search-btn" onClick={getSearchData}>
            Search
          </button>
        </div>
        <button className="top-rated-btn" onClick={getTopRatedRestaurants}>
          Top Rated
        </button>

      </div>
      <div className="res-container">
        {listOfRestaurants.map((res) => (
         <Link to={"/restaurant/" + res.info.id} key={res.info.id}  style={{ textDecoration: "none", color: "inherit" }}> <RestaurantCard  resList={res} /> </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
