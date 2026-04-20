import { CDN_URL } from "../src/components/utils/constants";


 const RestaurantCard = (props) => {
    const imgId = props.resList.info.cloudinaryImageId;

  return (
    <div className="res-card">
      <img
        className="res-card-img"
        alt="res-card-img"
        src={
          CDN_URL + imgId }
      />
      <h3>{props.resList.info.name}</h3>
      <h5>{props.resList.info.cuisines.join(", ")}</h5>
      <h5>{props.resList.info.avgRating} stars</h5>
      <h6>{props.resList.info.sla.deliveryTime} mins </h6>
      <h6>{props.resList.info.costForTwo} </h6>

      
    </div>
  );
};

export default RestaurantCard;