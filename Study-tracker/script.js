var entries = JSON.parse(localStorage.getItem('lifeos')) || [];
render();

function save() {
  var topic = document.getElementById('topic').value.trim();
  if (!topic) { alert('Enter a topic name first.'); return; }

  var e = {
    id:      Date.now(),
    topic:   topic,
    explain: +document.getElementById('s1').value,
    logic:   +document.getElementById('s2').value,
    apply:   +document.getElementById('s3').value,
    time:    new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  };

  entries.push(e);
  localStorage.setItem('lifeos', JSON.stringify(entries));
  render();
  reset();
}

function del(id) {
  entries = entries.filter(function(e){ return e.id !== id; });
  localStorage.setItem('lifeos', JSON.stringify(entries));
  render();
}

function render() {
  var log   = document.getElementById('log');
  var empty = document.getElementById('empty');

  log.querySelectorAll('.entry').forEach(function(e){ e.remove(); });

  if (entries.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';

  entries.slice().reverse().forEach(function(e) {
    var avg = ((e.explain + e.logic + e.apply) / 3).toFixed(1);
    var cls, label;
    if      (avg >= 3.5) { cls = 'green';  label = '🟢 Strong — '     + avg + '/5'; }
    else if (avg >= 2.5) { cls = 'yellow'; label = '🟡 Developing — ' + avg + '/5'; }
    else                 { cls = 'red';    label = '🔴 Needs Work — '  + avg + '/5'; }

    var div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML =
      '<div class="entry-name">' + e.topic +
        ' <span style="color:#555;font-size:0.75rem;font-weight:normal">· ' + e.time + '</span></div>' +
      '<div class="scores">' +
        'Explain <b>' + e.explain + '/5</b> &nbsp; ' +
        'Logic <b>'   + e.logic   + '/5</b> &nbsp; ' +
        'Apply <b>'   + e.apply   + '/5</b>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<span class="badge ' + cls + '">' + label + '</span>' +
        '<button onclick="del(' + e.id + ')" ' +
          'style="background:none;border:none;color:#555;cursor:pointer;font-size:0.8rem;width:auto;padding:0">' +
          '✕ Remove</button>' +
      '</div>';
    log.appendChild(div);
  });
}

function reset() {
  document.getElementById('topic').value = '';
  document.getElementById('s1').value = 3; document.getElementById('v1').textContent = '3';
  document.getElementById('s2').value = 3; document.getElementById('v2').textContent = '3';
  document.getElementById('s3').value = 3; document.getElementById('v3').textContent = '3';
}
