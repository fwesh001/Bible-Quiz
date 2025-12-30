(function(){
  const API_BASE = 'http://127.0.0.1:5000';
  const body = document.getElementById('questions-body');
  const btnRefresh = document.getElementById('btn-refresh');
  const btnApproveAll = document.getElementById('btn-approve-all');
  const btnBack = document.getElementById('btn-back');
  const loginSection = document.getElementById('login');
  const pwdInput = document.getElementById('adminPassword');
  const btnDoLogin = document.getElementById('btn-do-login');
  const loginMsg = document.getElementById('login-msg');

  function getAdminKey(){
    return sessionStorage.getItem('adminKey') || null;
  }

  function setAdminKey(k){
    if(k) sessionStorage.setItem('adminKey', k);
    else sessionStorage.removeItem('adminKey');
  }

  function requireAuthUI(){
    const key = getAdminKey();
    if(!key){
      loginSection.style.display = 'block';
    } else {
      loginSection.style.display = 'none';
    }
  }

  async function doLogin(){
    loginMsg.textContent = '';
    const pwd = pwdInput.value || '';
    if(!pwd) { loginMsg.textContent = 'Enter password'; return; }
    try{
      const res = await fetch(API_BASE + '/admin/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({password: pwd}) });
      if(!res.ok) throw new Error('Login failed');
      const j = await res.json();
      if(j.admin_key){ setAdminKey(j.admin_key); loginSection.style.display = 'none'; loadQuestions(); }
      else throw new Error(j.message || 'Invalid response');
    }catch(err){ loginMsg.textContent = err.message; }
  }

  async function loadQuestions(){
    body.innerHTML = '<tr><td colspan="9">Loading…</td></tr>';
    try{
      const res = await fetch(API_BASE + '/admin/questions');
      if(!res.ok) throw new Error('Failed to load');
      const list = await res.json();
      renderList(list || []);
    }catch(err){ body.innerHTML = `<tr><td colspan="9">Error: ${err.message}</td></tr>`; }
  }

  function renderList(list){
    if(!list || list.length === 0){ body.innerHTML = '<tr><td colspan="9">No questions.</td></tr>'; return; }
    body.innerHTML = '';
    list.forEach(q => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${q.id}</td>
        <td><textarea data-field="question" data-id="${q.id}" style="width:300px;min-height:48px">${escapeHtml(q.question||'')}</textarea></td>
        <td style="min-width:220px">
          <div><input data-field="option_a" data-id="${q.id}" value="${escapeHtml(q.option_a||'')}" /></div>
          <div><input data-field="option_b" data-id="${q.id}" value="${escapeHtml(q.option_b||'')}" /></div>
          <div><input data-field="option_c" data-id="${q.id}" value="${escapeHtml(q.option_c||'')}" /></div>
          <div><input data-field="option_d" data-id="${q.id}" value="${escapeHtml(q.option_d||'')}" /></div>
        </td>
        <td>
          <select data-field="correct_index" data-id="${q.id}">
            <option value="0" ${q.correct_index==0? 'selected':''}>A</option>
            <option value="1" ${q.correct_index==1? 'selected':''}>B</option>
            <option value="2" ${q.correct_index==2? 'selected':''}>C</option>
            <option value="3" ${q.correct_index==3? 'selected':''}>D</option>
          </select>
        </td>
        <td><input data-field="category" data-id="${q.id}" value="${escapeHtml(q.category||'')}" /></td>
        <td><input data-field="reference" data-id="${q.id}" value="${escapeHtml(q.reference||'')}" /></td>
        <td><input data-field="fact" data-id="${q.id}" value="${escapeHtml(q.fact||'')}" /></td>
        <td>
          <select data-field="status" data-id="${q.id}">
            <option value="PENDING" ${q.status==='PENDING'?'selected':''}>PENDING</option>
            <option value="APPROVED" ${q.status==='APPROVED'?'selected':''}>APPROVED</option>
            <option value="DELETED" ${q.status==='DELETED'?'selected':''}>DELETED</option>
          </select>
        </td>
        <td class="controls">
          <button data-action="save" data-id="${q.id}">Save</button>
          <button data-action="approve" data-id="${q.id}">Approve</button>
          <button data-action="del" data-id="${q.id}">Delete</button>
        </td>
      `;

      body.appendChild(tr);
    });

    // Attach handlers
    body.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e)=>{
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if(action === 'save') saveQuestion(id);
        if(action === 'approve') approveQuestion(id);
        if(action === 'del') deleteQuestion(id);
      });
    });
  }

  function collectFieldsFor(id){
    const rowFields = {};
    const selectors = ['question','option_a','option_b','option_c','option_d','correct_index','category','reference','fact','status'];
    selectors.forEach(f => {
      const el = document.querySelector(`[data-field="${f}"][data-id="${id}"]`);
      if(!el) return;
      if(el.tagName === 'SELECT' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') rowFields[f] = el.value;
    });
    // convert correct_index, if present, to number
    if('correct_index' in rowFields) rowFields.correct_index = parseInt(rowFields.correct_index,10);
    return rowFields;
  }

  async function saveQuestion(id){
    const payload = collectFieldsFor(id);
    try{
      const res = await fetch(`${API_BASE}/admin/edit/${id}`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Admin-Key': getAdminKey() },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error('Save failed');
      const j = await res.json();
      alert(j.message || 'Saved');
      loadQuestions();
    }catch(err){ alert('Save error: '+err.message); }
  }

  async function approveQuestion(id){
    try{
      const res = await fetch(`${API_BASE}/admin/approve/${id}`, { method: 'POST', headers: {'Admin-Key': getAdminKey()} });
      if(!res.ok) throw new Error('Approve failed');
      const j = await res.json();
      alert(j.message || 'Approved');
      loadQuestions();
    }catch(err){ alert('Approve error: '+err.message); }
  }

  async function deleteQuestion(id){
    // mark as DELETED via edit endpoint
    try{
      const res = await fetch(`${API_BASE}/admin/edit/${id}`, { method: 'POST', headers: {'Content-Type':'application/json','Admin-Key': getAdminKey()}, body: JSON.stringify({status: 'DELETED'}) });
      if(!res.ok) throw new Error('Delete failed');
      const j = await res.json();
      alert(j.message || 'Deleted');
      loadQuestions();
    }catch(err){ alert('Delete error: '+err.message); }
  }

  async function approveAll(){
    const rows = Array.from(document.querySelectorAll('[data-field="status"]'));
    const pending = rows.filter(s => s.value !== 'APPROVED');
    for(const s of pending){
      const id = s.dataset.id;
      await approveQuestion(id);
    }
    loadQuestions();
  }

  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Wire UI
  btnRefresh.addEventListener('click', ()=> loadQuestions());
  btnApproveAll.addEventListener('click', ()=> {
    if(!confirm('Approve all visible questions?')) return;
    approveAll();
  });
  btnBack.addEventListener('click', ()=> { window.location.href = 'index.html'; });
  btnDoLogin.addEventListener('click', doLogin);

  // initial
  requireAuthUI();
  if(getAdminKey()) loadQuestions();
})();
