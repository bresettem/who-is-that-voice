// actors.js
import axios from "axios";
import FTFullCredits from "@/app/data/ft_get_full_credits.json";
import extractId from "./IdExtractor";

const actors = async (keyword) => {
  try {
    console.log("in actors", keyword);
    const title = FTFullCredits.base.title;

    const items = await Promise.all(
      FTFullCredits.cast.map((result) => ({
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
