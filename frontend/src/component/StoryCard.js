// // StoryCard.js
// import React, { useState } from "react";
// import "../StoryCard.css";
// function StoryCard({ prompt, story }) {
//   const [upvotes, setUpvotes] = useState(0);

//   const handleUpvote = () => {
//     setUpvotes(upvotes + 1);
//   };

//   return (
//     <div className="story-card">
//       <h3>Prompt:</h3>
//       <p>{prompt}</p>
//       <h3>Generated Story:</h3>
//       <p>{story}</p>
//       <button onClick={handleUpvote}>Upvote ({upvotes})</button>
//     </div>
//   );
// }

// export default StoryCard;
import React, { useEffect, useState } from "react";
import Axios from "axios";
function StoryCard({ story }) {
  const [upvotes, setUpvotes] = useState(story?.upvotes); //jb bhi load hoga to initial value bakcend se set nhi kr rahi thi ab hoga

  const handleUpvote = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:3001/upvote/${story._id}` //and yaha undefined jaa raha tha
      );
      if (response.status === 200) {
        setUpvotes((prev) => prev + 1); //kabi bhi kisi bhi state ko khud ke value se update krna hoga to use this syntax
        // setUpvotes(upvotes+1)  //this will work BUt supoose useEffect ke andar se ye function call hota and upvote dependency array me nhi hota useEffect ke to usko hr baar upvote ka initial value milega
      }
    } catch (error) {
      console.error("Error upvoting story:", error);
    }
  };

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prev) => prev + 1);
  //     console.log(count, "updated");
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="story-card">
      <p className="post-text">{story.prompt}</p>
      <div className="upvote-container">
        <button className="upvote-button" onClick={handleUpvote}>
          <span role="img" aria-label="heart emoji">
            ❤️
          </span>
        </button>
        <p className="upvotes">Upvotes: {upvotes}</p>
      </div>
    </div>
  );
}

export default StoryCard;
