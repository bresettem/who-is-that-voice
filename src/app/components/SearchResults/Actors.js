// actors.js
import axios from "axios";
import FTFullCredits from "@/app/data/ft_get_full_credits.json";
import HowNotToFullCredits from "@/app/data/how_not_to_summon_a_demon_lord_get_full_credits.json";
import extractId from "./IdExtractor";

const actors = async (keyword) => {
  try {
    console.log("in actors", keyword);
    let title;
    let data;

    if (process.env.NODE_ENV === "development") {
      if (keyword === "tt1528406") {
        data = FTFullCredits;
        title = FTFullCredits.base.title;
      } else {
        data = HowNotToFullCredits;
        title = HowNotToFullCredits.base.title;
      }
    } else {
      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-full-credits",
        params: {
          tconst: keyword,
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        title = response.data.base.title;

        console.log(response.data);
        data = response.data;
      } catch (error) {
        console.error(error);
      }
    }
    const items = await Promise.all(
      data.cast.map((result) => ({
        id: extractId(result.id),
        image: result.image
          ? result.image.url
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNWoZhTRyuOwc2TBBgSHMzxK1Oj4KQInvuMBCSGeMJCNnGoRaH_RExpbQ5RaMJPxibMjQ&usqp=CAU",
        name: result.name,
        characters: result.characters ? result.characters : null,
        title: title,
        episodeNum: result.episodeCount,
      }))
    );

    console.log("actors:", items);
    return items;
  } catch (error) {
    console.error("Error fetching actors:", error);
    throw error;
  }
};

export default actors;
