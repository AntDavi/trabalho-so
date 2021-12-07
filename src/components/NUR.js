import Frame from "../frames/ReferenciaNUR.js";

export const NUR = ({
  testeInitial,
  maxRefReset,
  testAmount,
  minQ1,
  maxQ2,
}) => {
  const splitItems = testeInitial
    .split('-');

  splitItems.pop();

  const answers = [];
  let corrects = 0;
  let faults = 0;

  const frameInterval = Math.round((maxQ2 - minQ1) / (testAmount)) + 1;
  const framesAmount = typeof (testAmount) === 'string' ? +frameInterval : testAmount.length;

  let intervalFrame = minQ1;
  for (let index = 0; index < framesAmount; index++) {
    const frameDoTesteAtual = intervalFrame;
    intervalFrame += +testAmount;

    const frame = [];

    let classesRef = {
      index: -1,
      classe: 5,
    };

    let count = (maxRefReset - 1);

    /* NUR */
    for (let index = 0; index < splitItems.length; index++) {

      const initialPosition = splitItems[index];
      const typePosition = initialPosition[initialPosition.length - 1];
      const position = +initialPosition.replace(/.$/, '');

      //Função de buscar na memoria
      const currentPosition = frame.findIndex((e) => {
        return e.index === position;
      })

      //Se já existir na memoria
      if (currentPosition !== -1) {
        frame[currentPosition].alterarRef(typePosition);
        corrects += 1;
      } else {
        //Se não existir na memoria
        faults += 1;
        if (frame.length < frameDoTesteAtual) {
          //Se houver espaço na memoria
          const referencia = new Frame(position, typePosition);
          frame.push(referencia);
        } else {
          //Se memoria cheia
          classesRef = {
            index: -1,
            classe: 5,
          };

          frame.some((position, index) => {
            if (position.classe < classesRef.classe) {
              classesRef = {
                index: index,
                classe: position.classe,
              }
            }
            if (position.classe === 0) {
              return true;
            }
          });
          const replaceValue = classesRef.index;
          const structurePosition = new Frame(position, typePosition);
          frame.splice(replaceValue, 1);
          frame.push(structurePosition);
        }
      }
      if (index === count) {
        count += maxRefReset;
        frame.forEach((position) => {
          position.zerarRef();
        })
      }
    }
    /* NUR */
    answers.push(corrects);

    corrects = 0;
    faults = 0;
  }
  return answers
};
