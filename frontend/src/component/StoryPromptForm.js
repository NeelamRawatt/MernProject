import React, { useState } from "react";
import "../StoryPromptForm.css";
import Axios from "axios"; // Import Axios

function StoryPromptForm() {
  const [prompt, setPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:3000/generate-story",
        { prompt }
      );

      const generatedStory = response.data.story;

      setGeneratedStory(generatedStory);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  return (
    <div className="story-prompt-container">
      <h2>Provide a Story Prompt</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          className="story-prompt-textarea"
          placeholder="Enter your story prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <br />
        <button type="submit" className="submit-button">
          Generate Story
        </button>
      </form>
      {generatedStory && (
        <div className="generated-story">
          <h3>Generated Story:</h3>
          <p>{generatedStory}</p>
        </div>
      )}
    </div>
  );
}

export default StoryPromptForm;
