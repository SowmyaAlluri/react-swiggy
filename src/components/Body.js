import { useState, useEffect } from "react";
import RestaurantCard from "../RestaurantCard";
import Shimmer from "./shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  function getTopRatedRestaurants() {
    let listOfTopRated = listOfRestaurants.filter(res =>  res.info.avgRating > 4.0 );
    setListOfRestaurants(listOfTopRated);
  }


  useEffect(()=>{
    getRestaurantData();
  },[])

  const getRestaurantData = async () =>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4331118&lng=78.3667071&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    const getData = await data.json();
    let restaurantsList = getData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setListOfRestaurants(restaurantsList)
  }


  return listOfRestaurants.length === 0 ? (<Shimmer/>): (
    <div className="body">
      <div className="top-filter">
       <div>
            <input type="text" className="search-input"/>
            <button className="search-btn">Search</button>
        </div>
        <button className="top-rated-btn" onClick={getTopRatedRestaurants}>
          Top Rated
        </button>
       
      </div>
      <div className="res-container">
        {listOfRestaurants.map((res) => (
          <RestaurantCard key={res.info.id} resList={res} />
        ))}
      </div>
    </div>
  );
};

export default Body;
