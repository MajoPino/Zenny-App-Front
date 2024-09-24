import Chart from 'chart.js/auto';

const ctx = document.getElementById('chart2');

const red = '#EE5454';
const green = '#65D8A4';
const blue = '#6F86FF';
const yellow = '#FFBD3C';
const mint = '#C0E1C8';
const pink = '#F79FFF';
const orange = '#FF8D3B';
const cyan = '#5FDEEF';
const purple = '#BB76F1';

const categories = ['Hogar', 'Salud', 'Arriendo', 'Facturas y mensualidades', 'Alimentación', 'Transporte', 'Entretenimiento', 'Ropa', 'Varios'];
const dataNumber = [10000, 30000, 70000, 90000, 50000, 90000, 40000, 50000, 10000]
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'teko', // Cambia la fuente de las etiquetas del eje x
          size: 15, // Cambia el tamaño de la fuente de las etiquetas del eje x
          weight: 100,
        },
        color: '#c0e1c8',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'teko', // Cambia la fuente de las etiquetas del eje x
          size: 19, // Cambia el tamaño de la fuente de las etiquetas del eje x
        },
      },
    },
  },
};

 new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        label: 'Spent per category',
        data: dataNumber,
        borderWidth: 1,
        backgroundColor: [
            green, mint, cyan, blue, purple, pink, red, orange, yellow
        ],
        borderColor: [
            green, mint, cyan, blue, purple, pink, red, orange, yellow
        ]
      }]
    },
    options: options
  });