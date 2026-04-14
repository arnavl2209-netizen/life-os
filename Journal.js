var entries = JSON.parse(localStorage.getItem('lifeos_journal')) || [];
render();

function save() {
  var decision  = document.getElementById('decision').value.trim();
  var reasoning = document.getElementById('reasoning').value.trim();
  var different = document.getElementById('different').value.trim();

  if (!decision || !reasoning || !different) {
    alert('Please fill in all three fields.');
    return;
  }

  var e = {
    id:        Date.now(),
    decision:  decision,
    reasoning: reasoning,
    different: different,
    date:      new Date().toLocaleDateString('en-IN', {
                 weekday: 'long', year: 'numeric',
                 month: 'long', day: 'numeric'
               }),
    time:      new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
  };

  entries.push(e);
  localStorage.setItem('lifeos_journal', JSON.stringify(entries));
  render();
  reset();
}

function del(id) {
  entries = entries.filter(function(e){ return e.id !== id; });
  localStorage.setItem('lifeos_journal', JSON.stringify(entries));
  render();
}

function render() {
  var log   = document.getElementById('log');
  var empty = document.getElementById('empty');

  log.querySelectorAll('.entry').forEach(function(e){ e.remove(); });

  if (entries.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  entries.slice().reverse().forEach(function(e) {
    var div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML =
      '<div class="entry-date">' + e.date + ' · ' + e.time + '</div>' +
      '<div class="entry-block">' +
        '<label>Decision</label>' +
        '<p>' + e.decision + '</p>' +
      '</div>' +
      '<div class="entry-block">' +
        '<label>Reasoning</label>' +
        '<p>' + e.reasoning + '</p>' +
      '</div>' +
      '<div class="entry-block">' +
        '<label>What I\'d do differently</label>' +
        '<p>' + e.different + '</p>' +
      '</div>' +
      '<div class="entry-footer">' +
        '<button class="delete-btn" onclick="del(' + e.id + ')">✕ Remove</button>' +
      '</div>';
    log.appendChild(div);
  });
}

function reset() {
  document.getElementById('decision').value  = '';
  document.getElementById('reasoning').value = '';
  document.getElementById('different').value = '';
}
