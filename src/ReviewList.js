import React, {useState, useEffect} from 'react'

import ReviewHighlighter from './ReviewHighlighter';
import data from './reviews_data.json';

function ReviewList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.review_id} className="review">
             <div className="parent"> 
          <img id="images" src={item.source.icon} alt="This is reviewer profile" />
          <div id="reviewer">
            <strong>{item.reviewer_name}</strong> wrote a review at <strong>Booking.com</strong>
          </div>
          </div>
          <div className="date"> 
           <div className="rating">
           Rating :{item.rating_review_score}/10
           </div >
              {item.date}</div>
              <div id="content">
              <ReviewHighlighter review={item} />
              </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;