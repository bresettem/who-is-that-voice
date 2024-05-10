const sameNameElements = (data) => {
  // Check if data is empty
  if (data.length === 0) {
    throw new Error("Data is empty");
    return [];
  }

  try {
    // Flatten the array of arrays into a single array
    const flattenedData = data.flat();
    // Group elements by name using reduce
    const groupedData = flattenedData.reduce((acc, curr) => {
      const existingItem = acc.find((x) => x.name === curr.name);
      if (existingItem) {
        existingItem.characters.push({
          title: curr.title,
          // character: curr.characters[0].character, // assuming only one character in characters array
          characters: curr.characters, // assuming only one character in characters array

          episodeNum: parseInt(curr.episodeNum),
        });
      } else {
        acc.push({
          ...curr,
          characters: [
            {
              title: curr.title,
              // character: curr.characters[0].character,
              characters: curr.characters,
              episodeNum: parseInt(curr.episodeNum),
            },
          ],
        });
      }
      return acc;
    }, []);

    // Sort the groupedData by name
    const sortedData = groupedData.sort((a, b) => a.name.localeCompare(b.name));

    // Filter out elements with characters arrays of a different length
    const maxLength = data.length;
    const correctData = sortedData.filter(
      (item) => item.characters.length === maxLength
    );

    // Return the result
    correctData.sort((a, b) => {
      let aEpisodeNum;
      let bEpisodeNum;
      if (a.characters.length >= 2) {
        aEpisodeNum = a.characters[1].episodeNum;
      } else {
        aEpisodeNum = a.characters[0].episodeNum;
      }
      if (b.characters.length >= 2) {
        bEpisodeNum = b.characters[1].episodeNum;
      } else {
        bEpisodeNum = b.characters[0].episodeNum;
      }
      return bEpisodeNum - aEpisodeNum;
    });
    return correctData;
  } catch (err) {
    console.error("err", err);
    throw new Error(err);
    return [];
  }
};

export default sameNameElements;
