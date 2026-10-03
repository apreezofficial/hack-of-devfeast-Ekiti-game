module.exports = async (req, res) => {
  const r = await fetch('https://raw.githubusercontent.com/geektutor/experiments/main/colourgame.html');
  let html = await r.text();

  const bot = `
<script>
(function () {
  var b = document.createElement('button');
  b.textContent = 'RUN BOT';
  b.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:99999;padding:14px 22px;background:#58a6ff;color:#fff;border:0;border-radius:8px;font-weight:bold;font-family:monospace';
  b.onclick = function () {
    var N = 35;
    var typed = document.getElementById('username').value.trim();
    document.getElementById('username').value = typed || 'apcodesphere';
    function rgb(h) { var d = document.createElement('div'); d.style.color = h; return d.style.color; }
    var R = { RED: rgb('#f85149'), BLUE: rgb('#58a6ff'), GREEN: rgb('#3fb950'), YELLOW: rgb('#d29922') };
    startGame();
    for (var n = 0; n < N; n++) {
      var ins = document.getElementById('instruction').innerText;
      var m = ins.match(/(BACKGROUND|TEXT COLOR|WORD):\\s*(\\w+)/i);
      var rule = m[1].toUpperCase(), col = m[2].toUpperCase(), tg = R[col], hit = -1;
      for (var i = 0; i < 4; i++) {
        var s = document.getElementById('card-' + i);
        var ok = rule === 'BACKGROUND' ? s.style.backgroundColor === tg
               : rule === 'TEXT COLOR' ? s.style.color === tg
               : s.innerText.trim().toUpperCase() === col;
        if (ok) { hit = i; break; }
      }
      if (hit < 0) { alert('No card found at round ' + n + ': ' + ins); return; }
      handleCardClick(hit);
    }
    gameOver(); // ends the run now and saves the score immediately
    b.remove();
  };
  document.body.appendChild(b);
})();
</script>`;

  html = html.replace('</body>', bot + '</body>');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
