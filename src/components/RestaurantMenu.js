import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "./utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [menuData,setMenuData] = useState(null);
  const {resId} = useParams();
  
  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
  if (resInfo) {
    getResMenu(resInfo);
  }
}, [resInfo]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API+resId);
    const getData = await data.json();

    setResInfo(getData.data);
  };

  function getResInfo(resInfo) {
    for (const card of resInfo?.cards || []) {
      if (card?.card) {
        return card?.card?.card?.info;
      }
    }
  }

  function getResMenu(resInfo) {
    const menuData = [];
    for (const card of resInfo?.cards || []) {
      const regularCards =
        card?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      for (const item of regularCards) {
        const itemCards = item?.card?.card || [];
        if (itemCards) {
          menuData.push(itemCards);
        }
      }
    }
    setMenuData(menuData)
  }
  
  const { name, cuisines, costForTwo } = getResInfo(resInfo) || {};
  console.log(menuData)

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{name}</h1>

      {
        menuData?.map((menuItem,index) =>{
            return(
                <div  className="menu-section" key={menuItem?.title || index}>
                  <div className = "menu-title">{menuItem?.title}</div>
                  <ul> {
                    menuItem?.itemCards?.map(item =>(
                        <li className= "menu-item" key={item?.card?.info?.id}>
                           <div className="menu-item-name">{item?.card?.info?.name}</div> 
                           <div className="menu-item-price">₹{item?.card?.info?.price/100}</div>
                           <div className="menu-item-description">{item?.card?.info?.description}</div> 
                        </li>
                    ))
                  }</ul>
                </div>
            )
        })
      }
    </div>
  );
};

export default RestaurantMenu;
