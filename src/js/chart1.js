const { Chart } = await import('chart.js');


const ctx = document.getElementById('barChart1');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const red = '#EE5454';
const green = '#65D8A4';
const blue = '#6F86FF';
const yellow = '#FFBD3C';
const mint = '#C0E1C8';
const pink = '#F79FFF';
const orange = '#FF8D3B';
const cyan = '#5FDEEF';
const purple = '#BB76F1';

const labels = Utils.months({count: 1});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Hogar',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: green,
      backgroundColor: green,
    },
    {
      label: 'Salud',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: mint,
      backgroundColor: mint,
    },
   {
      label: 'Arriendo',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: cyan,
      backgroundColor: cyan,
    },
    {
      label: 'Facturas y mensualidades',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: blue,
      backgroundColor: blue,
    },
    {
      label: 'Alimentación',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: purple,
      backgroundColor: purple,
    },
   {
      label: 'Transporte',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: pink,
      backgroundColor: pink,
    },
    {
      label: 'Entretenimiento',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: red,
      backgroundColor: red,
    },
    {
      label: 'Ropa',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: orange,
      backgroundColor: orange,
    },
   {
      label: 'Varios',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: yellow,
      backgroundColor: yellow,
    }
  ]
};
