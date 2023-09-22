// import "./App.css";
// // import StoryPromptForm from "./component/StoryPromptForm";
// // import StoryCard from "./component/StoryCard";
// // import { useState } from "react";
// function App() {
//   // const [stories, setStories] = useState([]); // Define and initialize stories state
//   // const addStory = (prompt, story) => {
//   //   const newStory = { prompt, story };
//   //   setStories([newStory, ...stories]);
//   // };
//   return (
//     <div className="App">
//       {/* <StoryPromptForm addStory={addStory} />

//       {stories.map((storyData, index) => (
//         <StoryCard
//           key={index}
//           prompt={storyData.prompt}
//           story={storyData.story}
//         />
//       ))} */}
//     </div>
//   );
// }

// export default App;
// -----------
import React, { useEffect, useState } from "react";
import "./App.css";
import StoryForm from "./component/StoryForm";
import StoryCard from "./component/StoryCard";
import Axios from "axios";
import RegisterForm from "./component/RegisterForm";
const dummyStory = {
  prompt: "A beautiful car",
  story: "bsadknsad",
  upvotes: 4,
};

function App() {
  const [stories, setStories] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isPromptEnabled, setIsPromptEnabled] = useState(false); // Add a state for enabling the prompt input
  const fetchStories = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/getDetails");
      const fetchedStories = response.data;
      setStories(fetchedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handleRegistration = () => {
    setIsRegistrationOpen(false);
    setIsPromptEnabled(true); // Enable the prompt input after registration
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await Axios.post("http://localhost:3001/setDetails", {
        prompt,
        story: "",
        upvotes: 0,
      });
      const newStory = response.data;
      setStories((prev) => [...prev, newStory]);
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <div className="App">
      <h1>Story Prompter</h1>
      {isRegistrationOpen && (
        <RegisterForm onRegistration={handleRegistration} />
      )}
      {isPromptEnabled && (
        <>
          <StoryForm onPromptSubmit={handlePromptSubmit} />
          <div className="story-container">
            {stories.map((story, index) => (
              <StoryCard key={index} story={story} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
