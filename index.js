import { FIFO } from './src/components/FIFO.js';
import { SegundaChance } from './src/components/SegundaChance.js';
import { MRU } from './src/components/MRU.js';
import { NUR } from './src/components/NUR.js';

function start(graphic) {
  const fileText = document.getElementById('file');
  const bitR = document.getElementById('bitr').value;

  const IntervalAmount = document.getElementById('interval-test').value;
  const Q1 = document.getElementById('min').value;
  const Q2 = document.getElementById('max').value;

  let data = {};

  let fileExtension = /text.*/;
  let fileTobeRead = fileText.files[0];

  if (fileTobeRead.type.match(fileExtension)) {
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      data = {
        testeInitial: fileReader.result,
        maxRefReset: +bitR,
        testAmount: IntervalAmount,
        minQ1: +Q1,
        maxQ2: +Q2,
      }
      
      // Limpar grafico
      graphic.data.labels.pop();
      graphic.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      graphic.update();

      //Inicia o algoritmo
      const [dataFIFO, legendaBaixo] = FIFO(data);
      const dataMRU = MRU(data);
      const dataSG = SegundaChance(data);
      const dataNUR = NUR(data);

      // Gráfico
      const dataEstrutura = [
        {
          label: 'FIFO',
          data: dataFIFO,
          borderColor: "green",
          fill: false
        },
        {
          label: 'MRU',
          data: dataMRU,
          borderColor: "purple",
          fill: false
        },
        {
          label: 'NUR',
          data: dataNUR,
          borderColor: "orange",
          fill: false
        },
        {
          label: 'Segunda Chance',
          data: dataSG,
          borderColor: "cyan",
          fill: false
        },
      ]

      //Montar grafico
      graphic.data.labels = legendaBaixo;
      graphic.data.datasets = dataEstrutura;
      graphic.update();

      document.getElementById("tbody").innerHTML = '';

      //Montar tabela
      for (var i = 0; i < dataFIFO.length; i++) {
        document.getElementById("tbody").innerHTML += `
          <tr class="table__row">
            <td class="row__cell">${legendaBaixo[i]}</td>
            <td class="row__cell">${dataFIFO[i]}</td>
            <td class="row__cell">${dataNUR[i]}</td>
            <td class="row__cell">${dataMRU[i]}</td>
            <td class="row__cell">${dataSG[i]}</td>
            </tr>
        `;
      }
    }
    fileReader.readAsText(fileTobeRead);
  }
}

(() => {

  const graphic = new Chart("myChart", {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
      }
    }
  });

  document.getElementById('calcular').addEventListener('click', () => start(graphic));
  
})();