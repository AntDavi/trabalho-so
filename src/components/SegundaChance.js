import Frame from '../frames/ReferenciaSegundaChance.js';

export const SegundaChance = ({
  testeInitial,
  maxRefReset,
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

  const framesAmount = testAmount

  let intervalFrame = minQ1;
  for (let index = 0; index < framesAmount; index++) {
    const frameDoTesteAtual = intervalFrame;
    intervalFrame += +testAmount;

    let frame = [];

    let count = (maxRefReset - 1);

    /** Algoritmo Segunda Chance */
    for (let index = 0; index < splitItems.length; index++) {
      const position = splitItems[index];
      const currentPosition = frame.findIndex((e) => {
        return e.index === position;
      })

      if (currentPosition !== -1) {
        if (frame[currentPosition].isRef === 0) {
          frame[currentPosition].alterarRef();
        }
        corrects += 1;
      } else {
        faults += 1;
        if (frame.length < frameDoTesteAtual) {
          const referencia = new Frame(position, 1);
          frame.push(referencia);
        } else {

          let hasSmaller = false;
          const newList = frame.slice();

          frame.some((position) => {
            if (position.isRef === 0) {
              newList.shift();
              hasSmaller = true;
              return true;
            } else {
              newList.shift();
              const data = new Frame(position.index, 0);
              newList.push(data);
            }
          });

          if (!hasSmaller) {
            newList.shift();
          }

          const newPosition = new Frame(position, 1);
          frame = newList;
          frame.push(newPosition);
        }
      }
      if (index === count) {
        count += maxRefReset;
        frame.forEach((position) => {
          position.zerarRef();
        })
      }
    }
    /* Algoritmo Segunda Chance */

    answers.push(corrects);
    corrects = 0;
    faults = 0;
  }
  return answers;
};
