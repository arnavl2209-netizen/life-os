var defaultHabits = [
  { id: 1, name: '💪 Gym',            streak: 0, lastDone: '' },
  { id: 2, name: '💻 Coding',         streak: 0, lastDone: '' },
  { id: 3, name: '📖 Reading',        streak: 0, lastDone: '' },
  { id: 4, name: '📓 Journal',        streak: 0, lastDone: '' },
  { id: 5, name: '🏃 Health',         streak: 0, lastDone: '' },
  { id: 6, name: '🎤 Founder\'s Brief', streak: 0, lastDone: '' }
];

var habits   = JSON.parse(localStorage.getItem('lifeos_habits')) || defaultHabits;
var todayLog = JSON.parse(localStorage.getItem('lifeos_today'))  || { date: '', done: [] };
var today    = new Date().toDateString();

// Reset daily log if new day
if (todayLog.date !== today) {
  todayLog = { date: today, done: [] };
  localStorage.setItem('lifeos_today', JSON.stringify(todayLog));
}

render();

function render() {
  var list  = document.getElementById('habitList');
  list.innerHTML = '';

  habits.forEach(function(h) {
    var isDone = todayLog.done.indexOf(h.id) !== -1;
    var div = document.createElement('div');
    div.className = 'habit-card' + (isDone ? ' done' : '');
    div.innerHTML =
      '<div class="habit-check" onclick="toggle(' + h.id + ')">' +
        (isDone ? '✓' : '') +
      '</div>' +
      '<div class="habit-info">' +
        '<div class="habit-name">' + h.name + '</div>' +
        '<div class="habit-streak">Streak: <span>' + h.streak + ' days</span></div>' +
      '</div>' +
      '<button class="habit-delete" onclick="deleteHabit(' + h.id + ')">✕</button>';
    list.appendChild(div);
  });

  updateProgress();
  updateStreaks();
}

function toggle(id) {
  var idx = todayLog.done.indexOf(id);
  var habit = habits.find(function(h){ return h.id === id; });

  if (idx === -1) {
    todayLog.done.push(id);
    habit.streak += 1;
    habit.lastDone = today;
  } else {
    todayLog.done.splice(idx, 1);
    if (habit.streak > 0) habit.streak -= 1;
  }

  localStorage.setItem('lifeos_today',  JSON.stringify(todayLog));
  localStorage.setItem('lifeos_habits', JSON.stringify(habits));
  render();
}

function updateProgress() {
  var total = habits.length;
  var done  = todayLog.done.length;
  var pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('progressText').textContent = done + ' / ' + total;
  document.getElementById('progressFill').style.width = pct + '%';
}

function updateStreaks() {
  var slist = document.getElementById('streakList');
  slist.innerHTML = '';

  var sorted = habits.slice().sort(function(a,b){ return b.streak - a.streak; });
  var top    = sorted.slice(0, 3);

  if (top.length === 0 || top[0].streak === 0) {
    slist.innerHTML = '<p class="empty">Complete habits to build streaks.</p>';
    return;
  }

  top.forEach(function(h) {
    if (h.streak === 0) return;
    var div = document.createElement('div');
    div.className = 'streak-item';
    div.innerHTML =
      '<span class="streak-name">' + h.name + '</span>' +
      '<span class="streak-count">🔥 ' + h.streak + ' days</span>';
    slist.appendChild(div);
  });
}

function addHabit() {
  var input = document.getElementById('newHabit');
  var name  = input.value.trim();
  if (!name) { alert('Enter a habit name.'); return; }

  var newH = {
    id:       Date.now(),
    name:     name,
    streak:   0,
    lastDone: ''
  };

  habits.push(newH);
  localStorage.setItem('lifeos_habits', JSON.stringify(habits));
  input.value = '';
  render();
}

function deleteHabit(id) {
  habits = habits.filter(function(h){ return h.id !== id; });
  todayLog.done = todayLog.done.filter(function(d){ return d !== id; });
  localStorage.setItem('lifeos_habits', JSON.stringify(habits));
  localStorage.setItem('lifeos_today',  JSON.stringify(todayLog));
  render();
}
