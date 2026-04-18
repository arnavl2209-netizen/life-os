var entries = JSON.parse(localStorage.getItem('lifeos_jee')) || [];
render();

function save() {
  var topic     = document.getElementById('topic').value.trim();
  var subject   = document.getElementById('subject').value;
  var attempted = parseInt(document.getElementById('attempted').value);
  var correct   = parseInt(document.getElementById('correct').value);
  var weak      = document.getElementById('weak').value.trim();

  if (!topic || !attempted || isNaN(correct)) {
    alert('Please fill in all fields.');
    return;
  }

  if (correct > attempted) {
    alert('Correct cannot be more than attempted.');
    return;
  }

  var accuracy = Math.round((correct / attempted) * 100);

  var e = {
    id:        Date.now(),
    topic:     topic,
    subject:   subject,
    attempted: attempted,
    correct:   correct,
    accuracy:  accuracy,
    weak:      weak,
    date:      new Date().toLocaleDateString('en-IN', {
                 day: 'numeric', month: 'short', year: 'numeric'
               }),
    time:      new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
  };

  entries.push(e);
  localStorage.setItem('lifeos_jee', JSON.stringify(entries));
  render();
  reset();
}

function del(id) {
  entries = entries.filter(function(e){ return e.id !== id; });
  localStorage.setItem('lifeos_jee', JSON.stringify(entries));
  render();
}

function render() {
  var log   = document.getElementById('log');
  var empty = document.getElementById('empty');

  log.querySelectorAll('.entry').forEach(function(e){ e.remove(); });

  if (entries.length === 0) {
    empty.style.display = 'block';
    document.getElementById('statsBox').style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  document.getElementById('statsBox').style.display = 'flex';

  var totalAttempted = entries.reduce(function(a,e){ return a + e.attempted; }, 0);
  var totalCorrect   = entries.reduce(function(a,e){ return a + e.correct; }, 0);
  var overallAcc     = Math.round((totalCorrect / totalAttempted) * 100);
  var best           = entries.reduce(function(a,e){ return e.accuracy > a.accuracy ? e : a; }, entries[0]);

  document.getElementById('statSessions').textContent  = entries.length;
  document.getElementById('statQuestions').textContent = totalAttempted;
  document.getElementById('statAccuracy').textContent  = overallAcc + '%';
  document.getElementById('statBest').textContent      = best.topic;

  entries.slice().reverse().forEach(function(e) {
    var accCls, accLabel;
    if      (e.accuracy >= 70) { accCls = 'acc-high'; accLabel = '🟢 ' + e.accuracy + '%'; }
    else if (e.accuracy >= 50) { accCls = 'acc-mid';  accLabel = '🟡 ' + e.accuracy + '%'; }
    else                       { accCls = 'acc-low';  accLabel = '🔴 ' + e.accuracy + '%'; }

    var div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML =
      '<div class="entry-top">' +
        '<div class="entry-topic">' + e.topic + '</div>' +
        '<div class="entry-date">' + e.date + ' · ' + e.time + '</div>' +
      '</div>' +
      '<div class="entry-scores">' +
        'Attempted <b>' + e.attempted + '</b> &nbsp; ' +
        'Correct <b>'   + e.correct   + '</b> &nbsp; ' +
        'Wrong <b>'     + (e.attempted - e.correct) + '</b>' +
      '</div>' +
      '<div class="entry-footer">' +
        '<div>' +
          '<span class="subject-badge ' + e.subject + '">' + e.subject + '</span>' +
          '<span class="acc-badge ' + accCls + '">' + accLabel + '</span>' +
        '</div>' +
        '<button class="delete-btn" onclick="del(' + e.id + ')">✕</button>' +
      '</div>' +
      (e.weak ? '<div style="margin-top:8px;font-size:0.8rem;color:#555;">⚠️ Weak: ' + e.weak + '</div>' : '');
    log.appendChild(div);
  });
}

function reset() {
  document.getElementById('topic').value     = '';
  document.getElementById('attempted').value = '';
  document.getElementById('correct').value   = '';
  document.getElementById('weak').value      = '';
  document.getElementById('subject').value   = 'Physics';
}
