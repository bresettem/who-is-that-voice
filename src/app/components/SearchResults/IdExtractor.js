// IdExtractor.jsx
const extractId = (inputString) => {
  const match = inputString.match(/\/([^/]+)\/$/);

  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error(
      "Unable to extract alphanumeric sequence from the input string."
    );
  }
};

export default extractId;
