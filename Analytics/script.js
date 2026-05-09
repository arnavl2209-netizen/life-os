// Pull data from localStorage
var studyEntries   = JSON.parse(localStorage.getItem('lifeOS_entries'))  || [];
var jeeEntries     = JSON.parse(localStorage.getItem('lifeos_jee'))      || [];
var habitData      = JSON.parse(localStorage.getItem('lifeos_habits'))   || [];
var journalEntries = JSON.parse(localStorage.getItem('lifeos_journal'))  || [];

// Stats
document.getElementById('totalStudy').textContent     = studyEntries.length;
document.getElementById('totalJEE').textContent       = jeeEntries.length;
document.getElementById('totalHabits').textContent    = habitData.length;
document.getElementById('totalDecisions').textContent = journalEntries.length;

// ── Study Depth Chart ─────────────────────────────
if (studyEntries.length > 0) {
  document.getElementById('studyEmpty').style.display = 'none';

  var studyLabels = studyEntries.map(function(e){ return e.topic; });
  var studyData   = studyEntries.map(function(e){
    return ((e.explain + e.logic + e.apply) / 3).toFixed(1);
  });

  new Chart(document.getElementById('studyChart'), {
    type: 'line',
    data: {
      labels: studyLabels,
      datasets: [{
        label: 'Depth Score',
        data: studyData,
        borderColor: '#c9a84c',
        backgroundColor: '#c9a84c22',
        borderWidth: 2,
        pointBackgroundColor: '#c9a84c',
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          min: 0, max: 5,
          ticks: { color: '#555', stepSize: 1 },
          grid: { color: '#1a1a1a' }
        },
        x: {
          ticks: { color: '#555', maxRotation: 45 },
          grid: { color: '#1a1a1a' }
        }
      }
    }
  });
} else {
  document.getElementById('studyChart').style.display = 'none';
  document.getElementById('studyEmpty').style.display = 'block';
}

// ── JEE Accuracy Chart ────────────────────────────
if (jeeEntries.length > 0) {
  document.getElementById('jeeEmpty').style.display = 'none';

  var jeeLabels   = jeeEntries.map(function(e){ return e.topic; });
  var jeeAccuracy = jeeEntries.map(function(e){ return e.accuracy; });
  var jeeColors   = jeeEntries.map(function(e){
    return e.subject === 'Physics'   ? '#4a9eff' :
           e.subject === 'Chemistry' ? '#4caf50' : '#c97aff';
  });

  new Chart(document.getElementById('jeeChart'), {
    type: 'bar',
    data: {
      labels: jeeLabels,
      datasets: [{
        label: 'Accuracy %',
        data: jeeAccuracy,
        backgroundColor: jeeColors,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          min: 0, max: 100,
          ticks: { color: '#555', callback: function(v){ return v + '%'; } },
          grid: { color: '#1a1a1a' }
        },
        x: {
          ticks: { color: '#555', maxRotation: 45 },
          grid: { color: '#1a1a1a' }
        }
      }
    }
  });
} else {
  document.getElementById('jeeChart').style.display = 'none';
  document.getElementById('jeeEmpty').style.display = 'block';
}

// ── Habit Streak Chart ────────────────────────────
if (habitData.length > 0) {
  document.getElementById('habitEmpty').style.display = 'none';

  var habitLabels  = habitData.map(function(h){ return h.name; });
  var habitStreaks  = habitData.map(function(h){ return h.streak; });

  new Chart(document.getElementById('habitChart'), {
    type: 'bar',
    data: {
      labels: habitLabels,
      datasets: [{
        label: 'Streak (days)',
        data: habitStreaks,
        backgroundColor: '#c9a84c44',
        borderColor: '#c9a84c',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          min: 0,
          ticks: { color: '#555', stepSize: 1 },
          grid: { color: '#1a1a1a' }
        },
        x: {
          ticks: { color: '#555' },
          grid: { color: '#1a1a1a' }
        }
      }
    }
  });
} else {
  document.getElementById('habitChart').style.display = 'none';
  document.getElementById('habitEmpty').style.display = 'block';
}
