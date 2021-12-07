export const MRU = ({
  testeInitial,
  testAmount,
  minQ1,
  maxQ2,
}) => {
  const splitItems = testeInitial
    .replace(/W/g, '')
    .replace(/R/g, '')
    .split('-');

  splitItems.pop();

  const answers = [];
  let corrects = 0;
  let faults = 0;

  const frameInterval = Math.round((maxQ2 - minQ1) / (testAmount)) + 1;
  const framesAmount = typeof (testAmount) === 'string' ? +frameInterval : testAmount.length;

  let intervalFrames = minQ1;
  for (let index = 0; index < framesAmount; index++) {
    let frame = [];
    const currentFrame = intervalFrames;
    intervalFrames += +testAmount;

    /* Algoritmo MRU */
    for (let index = 0; index < splitItems.length; index++) {
      const position = splitItems[index];
      const currentPosition = frame.findIndex((e) => {
        return e === position;
      })

      if (currentPosition !== -1) {
        if (currentPosition > 0 && currentPosition !== frame.length) {
          const newList = [];

          frame.forEach((nome) => {
            if (nome !== position) {
              newList.push(nome);
            }
          });

          newList.push(position);
          frame = newList;
        } else if (currentPosition === 0) {
          frame.shift();
          frame.push(position);
        }
        corrects += 1;
      } else {
        faults += 1;
        if (frame.length < currentFrame) {
          frame.push(position);
        } else {
          frame.shift();
          frame.push(position);
        }
      }
    }
    /* Algoritmo MRU */

    answers.push(corrects);
    corrects = 0;
    faults = 0;
  }
  return answers;
};
