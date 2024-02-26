"use strict";

// Hämtar huvudmodulen för chartjsbiblioteket
import Chart from 'chart.js/auto';
//Hämtar färgfunktionaliteten från chartjsbiblioteket
import { Colors } from 'chart.js';

Chart.register(Colors);

// Hämtar data för tabellerna från webbtjänst

const url = "https://studenter.miun.se/~mallar/dt211g/";

window.onload = init();

async function init() {
    try {
        // Fetch-anrop
        const response = await fetch(url);
        const data = await response.json();

        const { courseData, programData } = processData(data);

        displayCourses(courseData);
        displayPrograms(programData);

    } catch (e) {
        console.log(e);
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen!</p>";
    }
}

function processData(data) {

// Ta ut datan för kurser
const courseData = data.filter(course => course.type === "Kurs" && course.admissionRound === "HT2023")
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                .slice(0, 6)
                .map(course => ({
                    name: course.name,
                    applicantsTotal: course.applicantsTotal
}));

// Ta ut datan för program
const programData = data.filter(course => course.type === "Program" && course.admissionRound === "HT2023")
                .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
                .slice(0, 5)
                .map(program => ({
                    name: program.name,
                    applicantsTotal: program.applicantsTotal
}));

    return { courseData, programData };
}

// Stapeldiagram 

function displayCourses(courseData) {
    const courseNames = courseData.map(course => course.name);
    const applicantsTotals = courseData.map(course => course.applicantsTotal);

    const courseNameAdjusted = courseNames.map(name => name.split(' '));

const ctx = document.getElementById('barChart');

const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: courseNameAdjusted,
      datasets: [{
        label: 'Mest sökta kurser',
        data: applicantsTotals,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 2
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
  }

// Cirkeldiagram

function displayPrograms(programData) {
    const programNames = programData.map(program => program.name);
    const applicantsTotals = programData.map(program => program.applicantsTotal);

const ctx = document.getElementById('pieChart');

const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: programNames,
      datasets: [{
        label: 'Mest sökta program',
        data: applicantsTotals,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
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
}
