const validatorName = (str) => {
  if (str.length < 2) return "The name must have more than 2 letters";
  if (/[^a-zA-Z, ]/g.test(str)) return "Name could be letters, no symbols!";
};

const validatorSummary = (str) => {
  if (str.length < 2) return "The summary should be more longer";
};

const validatorLengthImg = (str) => {
  if (str.length > 255) return "The URL is not valid";
};

export { validatorName, validatorSummary, validatorLengthImg };
