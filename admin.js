(function () {
  // Determine API base URL: default to localhost:5000 for local dev, or empty string (relative) for production
  const API_BASE = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')
    ? 'http://localhost:5000'
    : '';
  const body = document.getElementById('questions-body');
  const reportsBody = document.getElementById('reports-body');
  const btnRefresh = document.getElementById('btn-refresh');
  const btnRefreshReports = document.getElementById('btn-refresh-reports');
  const btnApproveSelected = document.getElementById('btn-approve-selected');
  const btnDeleteSelected = document.getElementById('btn-delete-selected');
  const selectAllBox = document.getElementById('select-all');
  const btnBack = document.getElementById('btn-back');
  const loginSection = document.getElementById('login');
  const pwdInput = document.getElementById('adminPassword');
  const btnDoLogin = document.getElementById('btn-do-login');
  const loginMsg = document.getElementById('login-msg');

  // Search Tab Elements
  const searchBody = document.getElementById('search-body');
  const searchInput = document.getElementById('search-input');
  const searchStatus = document.getElementById('search-status');
  const searchCategory = document.getElementById('search-category');
  const searchStats = document.getElementById('search-stats');
  const btnSearchRefresh = document.getElementById('btn-search-refresh');

  let allQuestions = []; // Combined pool for search

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
  function showConfirm(msg) { // Add Enter key handling for modal
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('custom-modal');
      if (e.key === 'Enter' && modal && modal.style.display !== 'none') {
        e.preventDefault();
        document.getElementById('modal-confirm').click();
      }
    });
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
    // Trigger login on Enter key press
    pwdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnDoLogin.click();
      }
    });
    if (!pwd) { loginMsg.textContent = 'Enter password'; return; }
    try {
      const res = await fetch(API_BASE + '/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pwd }) });
      if (!res.ok) throw new Error('Login failed');
      const j = await res.json();
      if (j.admin_key) {
        setAdminKey(j.admin_key);
        loginSection.style.display = 'none';
        loadQuestions();
        loadReports();
      }
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

  function renderList(list, targetBody = body) {
    if (!list || list.length === 0) {
      targetBody.innerHTML = `<tr><td colspan="10">No questions found.</td></tr>`;
      return;
    }
    targetBody.innerHTML = '';
    list.forEach(q => {
      const isApproved = (q.status || 'PENDING').toUpperCase() === 'APPROVED';
      const isFile = (q.source === 'File');

      // Summary row: shows checkbox, id, full question, status and an expand toggle
      const summary = document.createElement('tr');
      summary.className = 'q-summary';
      summary.innerHTML = `
        ${targetBody === body ? `<td data-label="Select"><input type="checkbox" class="q-select" data-id="${q.id}" /></td>` : ''}
        <td data-label="ID">${q.id}</td>
        <td data-label="Question Content" style="width:100%"><div class="q-text">${escapeHtml(q.question || '')}</div></td>
        <td data-label="Status" class="status-col">
          <span class="status-badge status-${(q.status || 'PENDING').toLowerCase().replace(' ', '-')}">${q.status || 'PENDING'}</span>
        </td>
        <td data-label="Expand" class="controls">
          <button data-action="toggle" data-id="${q.id}" class="expand-btn">▾</button>
        </td>
      `;

      // Details row: hidden by default, contains the full editable fields + actions
      const details = document.createElement('tr');
      details.className = 'expanded-row';
      details.style.display = 'none';
      details.innerHTML = `
        <td colspan="5">
          <div class="expanded-grid">
            <div class="col left">
              <label class="subtitle">Question</label>
              <textarea data-field="question" data-id="${q.id}" style="width:100%;min-height:80px" ${isFile ? 'readonly' : ''}>${escapeHtml(q.question || '')}</textarea>
            </div>
            <div class="col right">
              <label class="subtitle">Options</label>
              <div><input data-field="option_a" data-id="${q.id}" value="${escapeHtml(q.option_a || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div><input data-field="option_b" data-id="${q.id}" value="${escapeHtml(q.option_b || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div><input data-field="option_c" data-id="${q.id}" value="${escapeHtml(q.option_c || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div><input data-field="option_d" data-id="${q.id}" value="${escapeHtml(q.option_d || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div style="margin-top:8px">
                <label class="subtitle">Correct</label>
                <select data-field="correct_index" data-id="${q.id}" ${isFile ? 'disabled' : ''}>
                  <option value="0" ${q.correct_index == 0 ? 'selected' : ''}>A</option>
                  <option value="1" ${q.correct_index == 1 ? 'selected' : ''}>B</option>
                  <option value="2" ${q.correct_index == 2 ? 'selected' : ''}>C</option>
                  <option value="3" ${q.correct_index == 3 ? 'selected' : ''}>D</option>
                </select>
              </div>
              <div style="margin-top:8px"><label class="subtitle">Category</label><input data-field="category" data-id="${q.id}" value="${escapeHtml(q.category || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div style="margin-top:8px"><label class="subtitle">Reference</label><input data-field="reference" data-id="${q.id}" value="${escapeHtml(q.reference || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div style="margin-top:8px"><label class="subtitle">Fact</label><input data-field="fact" data-id="${q.id}" value="${escapeHtml(q.fact || '')}" style="width:100%" ${isFile ? 'readonly' : ''} /></div>
              <div style="margin-top:12px; display:flex; gap:8px;">
                ${!isFile ? `
                  <button data-action="save" data-id="${q.id}" class="primary">Save</button>
                  ${!isApproved ? `<button data-action="approve" data-id="${q.id}" class="secondary">Approve</button>` : ''}
                  <button data-action="del" data-id="${q.id}" class="danger">Delete</button>
                ` : `<span style="font-size:12px; color:var(--text-2);">Source: questions.js</span>`}
              </div>
            </div>
          </div>
        </td>
      `;

      // Toggle handler
      summary.querySelectorAll('button[data-action="toggle"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const open = details.style.display !== 'none';
          details.style.display = open ? 'none' : 'table-row';
          btn.textContent = open ? '▾' : '▴';
        });
      });

      targetBody.appendChild(summary);
      targetBody.appendChild(details);
    });

    // Attach handlers for action buttons in the whole table body
    targetBody.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if (action === 'save') saveQuestion(id);
        if (action === 'approve') approveQuestion(id);
        if (action === 'del') deleteQuestion(id);
      });
    });
  }

  async function saveQuestion(id) {
    const fields = collectFieldsFor(id);
    try {
      const res = await fetch(`${API_BASE}/admin/edit/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Admin-Key': getAdminKey() },
        body: JSON.stringify(fields)
      });
      if (!res.ok) throw new Error('Save failed');
      showToast('Changes saved locally (DB)', 'success');
      // If we are in search mode, we don't necessarily want to reload everything, 
      // but we should update the in-memory allQuestions if we want search to stay current.
      const q = allQuestions.find(x => String(x.id) === String(id));
      if (q) Object.assign(q, fields);
    } catch (err) { showToast(err.message, 'error'); }
  }

  async function loadAllData() {
    if (!searchBody) return;
    searchBody.innerHTML = '<tr><td colspan="10">Loading all data...</td></tr>';
    try {
      // 1. Fetch from DB
      const res = await fetch(API_BASE + '/admin/questions', { headers: { 'Admin-Key': getAdminKey() } });
      const dbData = await res.json();
      const dbQs = dbData.map(q => ({
        ...q,
        status: (q.status || 'PENDING').toUpperCase(),
        source: 'Database'
      }));

      // 2. Load from Global bibleQuestions (from questions.js)
      let fileQs = [];
      if (typeof bibleQuestions !== 'undefined') {
        fileQs = bibleQuestions.map((q, idx) => ({
          ...q,
          id: `F-${idx + 1}`,
          status: 'IN FILE',
          source: 'File',
          // Map array options to fields
          option_a: q.options ? q.options[0] : '',
          option_b: q.options ? q.options[1] : '',
          option_c: q.options ? q.options[2] : '',
          option_d: q.options ? q.options[3] : '',
          correct_index: q.correct !== undefined ? q.correct : 0
        }));
      }

      allQuestions = [...dbQs, ...fileQs];
      runSearch();
    } catch (err) {
      searchBody.innerHTML = `<tr><td colspan="10">Error loading data: ${err.message}. Showing file data if available.</td></tr>`;
      if (typeof bibleQuestions !== 'undefined') {
        allQuestions = bibleQuestions.map((q, idx) => ({
          ...q, id: `F-${idx + 1}`, status: 'IN FILE', source: 'File',
          option_a: q.options ? q.options[0] : '',
          option_b: q.options ? q.options[1] : '',
          option_c: q.options ? q.options[2] : '',
          option_d: q.options ? q.options[3] : '',
          correct_index: q.correct
        }));
        runSearch();
      }
    }
  }

  function runSearch() {
    if (!searchBody) return;
    const query = (searchInput.value || '').toLowerCase().trim();
    const statusFilter = (searchStatus.value || 'ALL').toUpperCase();
    const catFilter = (searchCategory.value || 'ALL').toUpperCase();

    const filtered = allQuestions.filter(q => {
      // Status Filter
      if (statusFilter !== 'ALL' && (q.status || 'PENDING').toUpperCase() !== statusFilter) return false;

      // Category Filter
      if (catFilter !== 'ALL' && (q.category || '').toUpperCase() !== catFilter) return false;

      // Text Search
      if (!query) return true;
      const content = [
        q.question,
        q.option_a, q.option_b, q.option_c, q.option_d,
        q.reference,
        q.fact,
        q.category
      ].join(' ').toLowerCase();

      return content.includes(query);
    });

    searchStats.textContent = `Showing ${filtered.length} of ${allQuestions.length} total questions.`;
    renderList(filtered, searchBody);
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

  async function loadReports() {
    if (!reportsBody) return;
    reportsBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
    try {
      const res = await fetch(API_BASE + '/admin/reports', { headers: { 'Admin-Key': getAdminKey() } });
      if (!res.ok) throw new Error('Failed to load reports');
      const list = await res.json();
      renderReports(list || []);
    } catch (err) { reportsBody.innerHTML = `<tr><td colspan="6">Error: ${err.message}</td></tr>`; }
  }

  function renderReports(list) {
    if (!reportsBody) return;
    if (!list || list.length === 0) { reportsBody.innerHTML = '<tr><td colspan="4">No reports.</td></tr>'; return; }
    reportsBody.innerHTML = '';
    list.forEach(r => {
      const summary = document.createElement('tr');
      summary.className = 'r-summary';
      const shortQ = (r.question_text || '').length > 180 ? (r.question_text || '').slice(0, 177) + '...' : (r.question_text || 'Unknown');
      summary.innerHTML = `
        <td data-label="ID">${r.id}</td>
        <td data-label="Reported Question"><div class="q-text">${escapeHtml(shortQ)}</div></td>
        <td data-label="Status"><span class="status-badge status-${(r.status || 'OPEN').toLowerCase()}">${r.status}</span></td>
        <td data-label="Expand" class="controls"><button data-action="toggle-report" data-id="${r.id}" class="expand-btn">▾</button></td>
      `;

      const details = document.createElement('tr');
      details.className = 'expanded-row';
      details.style.display = 'none';
      details.innerHTML = `
        <td colspan="4">
          <div class="expanded-grid">
            <div class="col left">
              <label class="subtitle">Full Question</label>
              <div style="white-space:pre-wrap; background:transparent; color:var(--text);">${escapeHtml(r.question_text || 'Unknown')}</div>
              <div style="margin-top:12px;"><label class="subtitle">Reason</label><div style="white-space:pre-wrap; color:var(--muted);">${escapeHtml(r.reason || 'No reason')}</div></div>
            </div>
            <div class="col right">
              <label class="subtitle">Reported At</label>
              <div class="subtitle">${new Date(r.created_at).toLocaleString()}</div>
              <div style="margin-top:12px; display:flex; gap:8px;">
                ${r.status !== 'RESOLVED' ? `<button data-action="resolve" data-id="${r.id}" class="primary">Resolve</button>` : ''}
                <button data-action="del-report" data-id="${r.id}" class="danger">Delete</button>
              </div>
            </div>
          </div>
        </td>
      `;

      // Toggle handler
      summary.querySelectorAll('button[data-action="toggle-report"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const open = details.style.display !== 'none';
          details.style.display = open ? 'none' : 'table-row';
          btn.textContent = open ? '▾' : '▴';
        });
      });

      reportsBody.appendChild(summary);
      reportsBody.appendChild(details);

      // Attach action handlers for this item's buttons
      details.querySelectorAll('button[data-action]').forEach(b => {
        const act = b.dataset.action;
        const id = b.dataset.id;
        if (act === 'resolve') b.addEventListener('click', () => { window.resolveReport(id); });
        if (act === 'del-report') b.addEventListener('click', () => { window.deleteReport(id); });
      });
    });
  }

  // Expose these to global scope so onclick handlers work
  window.resolveReport = async function (id) {
    const confirmed = await showConfirm('Are you sure you want to resolve this report?');
    if (!confirmed) return;
    try {
      const res = await fetch(`${API_BASE}/admin/resolve-report/${id}`, { method: 'POST', headers: { 'Admin-Key': getAdminKey() } });
      if (!res.ok) throw new Error('Failed');
      showToast('Resolved', 'success');
      loadReports();
    } catch (e) { showToast(e.message, 'error'); }
  };

  window.deleteReport = async function (id) {
    const confirmed = await showConfirm('Delete this report? This action cannot be undone.');
    if (!confirmed) return;
    try {
      const res = await fetch(`${API_BASE}/admin/delete-report/${id}`, { method: 'DELETE', headers: { 'Admin-Key': getAdminKey() } });
      if (!res.ok) throw new Error('Failed');
      showToast('Deleted', 'success');
      loadReports();
    } catch (e) { showToast(e.message, 'error'); }
  };

  function escapeHtml(str) {

    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Wire UI
  // Wire UI
  btnRefresh.addEventListener('click', () => loadQuestions());
  if (btnRefreshReports) btnRefreshReports.addEventListener('click', () => loadReports());
  if (btnSearchRefresh) btnSearchRefresh.addEventListener('click', () => loadAllData());

  if (searchInput) searchInput.addEventListener('input', runSearch);
  if (searchStatus) searchStatus.addEventListener('change', runSearch);
  if (searchCategory) searchCategory.addEventListener('change', runSearch);


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

  // Tabs
  const tabQ = document.getElementById('tab-questions');
  const tabR = document.getElementById('tab-reports');
  const tabS = document.getElementById('tab-search');
  const secQ = document.getElementById('questions-section');
  const secR = document.getElementById('reports-section');
  const secS = document.getElementById('search-section');

  if (tabQ && tabR && tabS) {
    tabQ.addEventListener('click', () => {
      tabQ.classList.add('active'); tabR.classList.remove('active'); tabS.classList.remove('active');
      secQ.style.display = 'block'; secR.style.display = 'none'; secS.style.display = 'none';
    });
    tabR.addEventListener('click', () => {
      tabR.classList.add('active'); tabQ.classList.remove('active'); tabS.classList.remove('active');
      secQ.style.display = 'none'; secR.style.display = 'block'; secS.style.display = 'none';
      loadReports();
    });
    tabS.addEventListener('click', () => {
      tabS.classList.add('active'); tabQ.classList.remove('active'); tabR.classList.remove('active');
      secQ.style.display = 'none'; secR.style.display = 'none'; secS.style.display = 'block';
      loadAllData();
    });
  }

  // initial
  requireAuthUI();
  if (getAdminKey()) {
    loadQuestions();
    loadReports();
  }

})();
