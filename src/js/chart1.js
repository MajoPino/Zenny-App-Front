import Chart from 'chart.js/auto';
import { GenerateArray } from './Diagrams/byCategoryDiagrmas';

const DateToday = new Date();
const dayToday = DateToday.getDate();
const monthToday = DateToday.getMonth();

var exactMonth;

switch (monthToday) {
  case 0:
    exactMonth = 'Enero';
    break;

  case 1:
    exactMonth = 'Febrero';
    break;

  case 2:
    exactMonth = 'Marzo';
    break;

  case 3:
    exactMonth = 'Abril';
    break;

  case 4:
    exactMonth = 'Mayo';
    break;

  case 5:
    exactMonth = 'Junio';
    break;

  case 6:
    exactMonth = 'Julio';
    break;

  case 7:
    exactMonth = 'Agosto';
    break;

  case 8:
    exactMonth = 'Septiembre';
    break;

  case 9:
    exactMonth = 'Octubre';
    break;

  case 10:
    exactMonth = 'Noviembre';
    break;

  case 11:
    exactMonth = 'Diciembre';
    break;

}

console.log(exactMonth + ' ' + dayToday)

const dateMonth = document.getElementById('dateMonth');

dateMonth.innerHTML = `<h2 class="mb-1 dateMonth">${exactMonth} ${dayToday}</h2>`;

const ctx = document.getElementById('chart1');

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
const dataNumber = await GenerateArray(1)
const options = {
  responsive: false,
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
    type: 'bar',
    data: {
      labels: categories,
      datasets: [{
        label: 'Total',
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