import React, { useState, useEffect } from "react";
import ReadMoreReact from "read-more-react";

import "./tours.css";
const url = "https://course-api.com/react-tours-project";

const Tours = () => {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTours = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setTour(data);
    console.log(tour);
  };
  useEffect(() => {
    getTours();
  }, []);

  if (loading) {
    return "Loading...";
  }

  if (tour.length === 0) {
    return (
      <div className="title">
        <h2>no tours left</h2>
        <button className="btn" onClick={() => getTours()}>
          refresh
        </button>
      </div>
    );
  }

  const handleClick = (id) => {
    const newTours = tour.filter((item) => {
      return item.id !== id;
    });
    setTour(newTours);
  };

  return (
    <div>
      {tour.map((spot) => {
        const { id, name, image, info, price } = spot;
        return (
          <div key={id} className="container-tours">
            <img src={image} className="img" />
            <h3 className="title-secondary">{name}</h3>
            <span className="prc">Rs.{price}/-</span>
            <ReadMoreReact
              className="para"
              text={info}
              min={80}
              ideal={100}
              max={120}
              readMoreText="click here to read more"
            />
            <button className="btn" onClick={() => handleClick(id)}>
              Not Interested
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tours;
