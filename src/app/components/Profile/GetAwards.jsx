// GetAwards.jsx
import axios from "axios";

const getAwards = async (keyword) => {
  if (!keyword) {
    throw new Error("Keyword is empty!");
  }

  try {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/actors/v2/get-awards-summary",
      params: {
        nconst: keyword,
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    console.log("response", response);
    // Check if the response is successful
    if (response.status !== 200) {
      throw new Error(`Failed to fetch awards. Status: ${response.status}`);
    }

    // Return the fetched data
    return response.data.data.name;
  } catch (error) {
    // Log and rethrow any errors
    console.error("Error fetching awards:", error);
    throw error;
  }
};

export default getAwards;
