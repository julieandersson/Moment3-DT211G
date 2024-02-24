"use strict";

// Hämtar huvudmodulen för chartjsbiblioteket
import Chart from 'chart.js/auto';
//Hämtar färgfunktionaliteten från chartjsbiblioteket
import { Colors } from 'chart.js';

Chart.register(Colors);


// Stapeldiagram 

const ctx = document.getElementById('barChart');

const barChart = new Chart(ctx, {
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

// Cirkeldiagram

const ctx2 = document.getElementById('pieChart');

const pieChart = new Chart(ctx2, {
    type: 'pie',
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