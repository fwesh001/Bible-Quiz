(function () {
  const API_BASE = 'http://127.0.0.1:5000';
  const body = document.getElementById('questions-body');
  const btnRefresh = document.getElementById('btn-refresh');
  const btnApproveSelected = document.getElementById('btn-approve-selected');
  const btnDeleteSelected = document.getElementById('btn-delete-selected');
  const selectAllBox = document.getElementById('select-all');
  const btnBack = document.getElementById('btn-back');
  const loginSection = document.getElementById('login');
  const pwdInput = document.getElementById('adminPassword');
  const btnDoLogin = document.getElementById('btn-do-login');
  const loginMsg = document.getElementById('login-msg');

  function getAdminKey() {
    return sessionStorage.getItem('adminKey') || null;
  }

  // Local toast helper (mirrors main app)
  function showToast(message, type = 'info', timeout = 3500) {
    try {
      // Try to find toast container on page, otherwise create minimal toast using alert fallback
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      const t = document.createElement('div');
      t.className = 'toast ' + (type || 'info');
      t.textContent = message;
      container.appendChild(t);
      const removeAfter = Math.max(800, timeout);
      setTimeout(() => {
        t.style.animation = 'toast-out 240ms ease-in forwards';
        setTimeout(() => { try { container.removeChild(t); } catch (e) { } }, 260);
      }, removeAfter);
    } catch (e) { try { alert(message); } catch (e) { } }
  }

  function setAdminKey(k) {
    if (k) sessionStorage.setItem('adminKey', k);
    else sessionStorage.removeItem('adminKey');
  }

  // Custom Confirm Modal Helper
  function showConfirm(msg) {
    return new Promise((resolve) => {
      const modal = document.getElementById('custom-modal');
      const titleEl = document.getElementById('modal-title');
      const msgEl = document.getElementById('modal-msg');
      const btnCancel = document.getElementById('modal-cancel');
      const btnConfirm = document.getElementById('modal-confirm');

      titleEl.textContent = 'Please Confirm'; // Default title
      msgEl.textContent = msg;

      modal.style.display = 'flex'; // Show modal using flex for centering

      const cleanup = () => {
        modal.style.display = 'none';
        btnCancel.removeEventListener('click', onCancel);
        btnConfirm.removeEventListener('click', onConfirm);
      };

      const onConfirm = () => { cleanup(); resolve(true); };
      const onCancel = () => { cleanup(); resolve(false); };

      btnCancel.addEventListener('click', onCancel);
      btnConfirm.addEventListener('click', onConfirm);
    });
  }

  function requireAuthUI() {
    const key = getAdminKey();
    if (!key) {
      loginSection.style.display = 'block';
    } else {
      loginSection.style.display = 'none';
    }
  }

  async function doLogin() {
    loginMsg.textContent = '';
    const pwd = pwdInput.value || '';
    if (!pwd) { loginMsg.textContent = 'Enter password'; return; }
    try {
      const res = await fetch(API_BASE + '/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pwd }) });
      if (!res.ok) throw new Error('Login failed');
      const j = await res.json();
      if (j.admin_key) { setAdminKey(j.admin_key); loginSection.style.display = 'none'; loadQuestions(); }
      else throw new Error(j.message || 'Invalid response');
    } catch (err) { loginMsg.textContent = err.message; }
  }

  async function loadQuestions() {
    body.innerHTML = '<tr><td colspan="9">Loading…</td></tr>';
    try {
      const res = await fetch(API_BASE + '/admin/questions');
      if (!res.ok) throw new Error('Failed to load');
      const list = await res.json();
      renderList(list || []);
    } catch (err) { body.innerHTML = `<tr><td colspan="9">Error: ${err.message}</td></tr>`; }
  }

  function renderList(list) {
    if (!list || list.length === 0) { body.innerHTML = '<tr><td colspan="9">No questions.</td></tr>'; return; }
    body.innerHTML = '';
    list.forEach(q => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="checkbox" class="q-select" data-id="${q.id}" /></td>
        <td>${q.id}</td>
        <td><textarea data-field="question" data-id="${q.id}" style="width:300px;min-height:48px">${escapeHtml(q.question || '')}</textarea></td>
        <td style="min-width:220px">
          <div><input data-field="option_a" data-id="${q.id}" value="${escapeHtml(q.option_a || '')}" /></div>
          <div><input data-field="option_b" data-id="${q.id}" value="${escapeHtml(q.option_b || '')}" /></div>
          <div><input data-field="option_c" data-id="${q.id}" value="${escapeHtml(q.option_c || '')}" /></div>
          <div><input data-field="option_d" data-id="${q.id}" value="${escapeHtml(q.option_d || '')}" /></div>
        </td>
        <td>
          <select data-field="correct_index" data-id="${q.id}">
            <option value="0" ${q.correct_index == 0 ? 'selected' : ''}>A</option>
            <option value="1" ${q.correct_index == 1 ? 'selected' : ''}>B</option>
            <option value="2" ${q.correct_index == 2 ? 'selected' : ''}>C</option>
            <option value="3" ${q.correct_index == 3 ? 'selected' : ''}>D</option>
          </select>
        </td>
        <td><input data-field="category" data-id="${q.id}" value="${escapeHtml(q.category || '')}" /></td>
        <td><input data-field="reference" data-id="${q.id}" value="${escapeHtml(q.reference || '')}" /></td>
        <td><input data-field="fact" data-id="${q.id}" value="${escapeHtml(q.fact || '')}" /></td>
        <td>
        <td>
          <span class="status-badge status-${(q.status || 'PENDING').toLowerCase()}">${q.status || 'PENDING'}</span>
        </td>
        <td class="controls">
          <button data-action="approve" data-id="${q.id}">Approve</button>
          <button data-action="del" data-id="${q.id}">Delete</button>
        </td>
      `;

      body.appendChild(tr);
    });

    // Attach handlers
    body.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if (action === 'approve') approveQuestion(id);
        if (action === 'del') deleteQuestion(id);
      });
    });
  }

  function collectFieldsFor(id) {
    const rowFields = {};
    const selectors = ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_index', 'category', 'reference', 'fact'];
    selectors.forEach(f => {
      const el = document.querySelector(`[data-field="${f}"][data-id="${id}"]`);
      if (!el) return;
      if (el.tagName === 'SELECT' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') rowFields[f] = el.value;
    });
    // convert correct_index, if present, to number
    if ('correct_index' in rowFields) rowFields.correct_index = parseInt(rowFields.correct_index, 10);
    return rowFields;
  }



  async function approveQuestion(id, reload = true) {
    try {
      const res = await fetch(`${API_BASE}/admin/approve/${id}`, { method: 'POST', headers: { 'Admin-Key': getAdminKey() } });
      if (!res.ok) throw new Error('Approve failed');
      const j = await res.json();
      showToast(j.message || 'Approved', 'success');
      if (reload) loadQuestions();
    } catch (err) { alert('Approve error: ' + err.message); }
  }

  async function deleteQuestion(id, reload = true) {
    // hard delete via new DELETE endpoint
    if (reload) {
      const confirmed = await showConfirm('Are you sure you want to permanently delete this question?');
      if (!confirmed) return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/delete/${id}`, { method: 'DELETE', headers: { 'Admin-Key': getAdminKey() } });
      if (!res.ok) throw new Error('Delete failed');
      const j = await res.json();
      showToast(j.message || 'Deleted', 'success');
      if (reload) loadQuestions();
    } catch (err) { alert('Delete error: ' + err.message); }
  }

  async function approveSelected() {
    const checkboxes = Array.from(document.querySelectorAll('.q-select:checked'));
    if (checkboxes.length === 0) { showToast('No items selected', 'warning'); return; }

    const confirmed = await showConfirm(`Approve ${checkboxes.length} items?`);
    if (!confirmed) return;

    for (const cb of checkboxes) {
      const id = cb.dataset.id;
      await approveQuestion(id, false);
    }
    loadQuestions();
  }

  async function deleteSelected() {
    const checkboxes = Array.from(document.querySelectorAll('.q-select:checked'));
    if (checkboxes.length === 0) { showToast('No items selected', 'warning'); return; }

    const confirmed = await showConfirm(`Permanently delete ${checkboxes.length} items? This cannot be undone.`);
    if (!confirmed) return;

    for (const cb of checkboxes) {
      const id = cb.dataset.id;
      await deleteQuestion(id, false);
    }
    loadQuestions();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Wire UI
  btnRefresh.addEventListener('click', () => loadQuestions());

  if (selectAllBox) {
    selectAllBox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      document.querySelectorAll('.q-select').forEach(cb => cb.checked = checked);
    });
  }

  if (btnApproveSelected) btnApproveSelected.addEventListener('click', approveSelected);
  if (btnDeleteSelected) btnDeleteSelected.addEventListener('click', deleteSelected);

  btnBack.addEventListener('click', () => { window.location.href = 'index.html'; });
  btnDoLogin.addEventListener('click', doLogin);

  // initial
  requireAuthUI();
  if (getAdminKey()) loadQuestions();
})();
