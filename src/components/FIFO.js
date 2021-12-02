export const FIFO = ({
  testeInitial,
  testAmount,
  minQ1,
  maxQ2,
}) => {
  const splitItems =  testeInitial
    .replace(/W/g, '')
    .replace(/R/g, '')
    .split('-');

  splitItems.pop();

  const answers = [];
  const labelFrame = [];
  let correct = 0;
  let faults = 0;

  const framesAmount = +Math.trunc((maxQ2 - minQ1) / (testAmount)) + 1;

  // Intervalo de Frames
  let intervalFrames = minQ1;
  for (let index = 0; index < framesAmount; index++) {
    const frame = [];
    const currentFrame = intervalFrames;
    intervalFrames += +testAmount;

    /** Algoritmo FIFO **/
    for (let index = 0; index < splitItems.length; index++) {
      const position = splitItems[index];
      const currentPosition = frame.find(value => value === position);

      if (currentPosition) {
        correct += 1;
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
    /** Algoritmo FIFO **/
    
    labelFrame.push(currentFrame);
    answers.push(correct);
    correct = 0;
    faults = 0;
  }
  return [answers, labelFrame];
};
