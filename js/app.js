document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('taskflow_user'));
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  const username = document.getElementById('username');
  const signoutBtn = document.getElementById('signout');
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTask');
  const taskList = document.getElementById('task-list');
  const tabs = document.querySelectorAll('.tab');
  const searchInput = document.getElementById('searchInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const exportBtn = document.getElementById('exportData');
  const importBtn = document.getElementById('importData');
  const importFile = document.getElementById('importFile');

  let activeStage = 'todo';
  let searchQuery = '';
  let priorityFilter = 'all';

  if (username) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    username.textContent = `${greeting}, ${user.name}! 👋`;
  }

  signoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });

  let tasks = JSON.parse(localStorage.getItem('taskflow_tasks')) || [];

  async function fetchInitialTasksIfNeeded() {
    if (!tasks || tasks.length === 0) {
      try {
        const res = await fetch("https://dummyjson.com/todos");
        const data = await res.json();

        tasks = data.todos.slice(0, 5).map((item, i) => ({
          id: `api-${i}-${Date.now()}`,
          title: item.todo,
          stage: 'todo',
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        }));

        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
      } catch (err) {
        console.error("Failed to load dummy data", err);
      }
    }
    renderTasks();
  }

  function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  function saveTasks() {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function animateCounter(element, newValue) {
    element.classList.add('updating');
    setTimeout(() => {
      element.textContent = newValue;
      element.classList.remove('updating');
    }, 150);
  }

  function renderTasks() {
    taskList.innerHTML = '';

    animateCounter(document.getElementById('todoCount'), tasks.filter(t => t.stage === 'todo').length);
    animateCounter(document.getElementById('completedCount'), tasks.filter(t => t.stage === 'completed').length);
    animateCounter(document.getElementById('archivedCount'), tasks.filter(t => t.stage === 'archived').length);

    let filtered = tasks.filter(t => t.stage === activeStage);
    
    if (searchQuery) {
      filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(t => t.priority === priorityFilter);
    }
    
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    if (filtered.length === 0) {
      const message = searchQuery ? 'No tasks match your search' : 'No tasks in this stage';
      taskList.innerHTML = `<p style="text-align:center; color:#94a3b8;">${message}</p>`;
      return;
    }

    filtered.forEach(task => {
      const el = createTaskElement(task);
      taskList.appendChild(el);
    });
  }

  function createTaskElement(task) {
    const taskEl = document.createElement('div');
    taskEl.className = `task priority-${task.priority} task-fade-in`;

    const desc = document.createElement('span');
    desc.textContent = task.title;
    
    const priorityIcon = { high: '🔴', medium: '🟡', low: '🟢' };
    desc.textContent = `${priorityIcon[task.priority]} ${task.title}`;

    const timestamp = document.createElement('small');
    timestamp.textContent = `Last modified at: ${new Date(task.lastModified).toLocaleString()}`;

    const actions = document.createElement('div');

    if (task.stage === 'todo') {
      actions.appendChild(createActionButton('Mark as completed', () => moveTask(task.id, 'completed')));
      actions.appendChild(createActionButton('Archive', () => moveTask(task.id, 'archived')));
    } else if (task.stage === 'completed') {
      actions.appendChild(createActionButton('Move to Todo', () => moveTask(task.id, 'todo')));
      actions.appendChild(createActionButton('Archive', () => moveTask(task.id, 'archived')));
    } else if (task.stage === 'archived') {
      actions.appendChild(createActionButton('Move to Todo', () => moveTask(task.id, 'todo')));
      actions.appendChild(createActionButton('Mark as completed', () => moveTask(task.id, 'completed')));
    }
    
    actions.appendChild(createDeleteButton(() => deleteTask(task.id)));

    taskEl.appendChild(desc);
    taskEl.appendChild(timestamp);
    taskEl.appendChild(actions);

    return taskEl;
  }

  function createActionButton(label, handler) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = handler;
    return btn;
  }

  function createDeleteButton(handler) {
    const btn = document.createElement('button');
    btn.textContent = '🗑️';
    btn.onclick = handler;
    btn.style.background = '#ef4444';
    btn.style.fontSize = '0.8rem';
    return btn;
  }

  function deleteTask(id) {
    if (confirm('Delete this task?')) {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
    }
  }

  function addTask(title) {
    const newTask = {
      id: generateId(),
      title: title.trim(),
      stage: 'todo',
      priority: prioritySelect.value,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    tasks.push(newTask);
    saveTasks();
  }

  function moveTask(id, newStage) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.stage = newStage;
      task.lastModified = new Date().toISOString();
      saveTasks();

      if (newStage === 'completed' && typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }
  }



  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeStage = tab.dataset.stage;
      renderTasks();
    });
  });

  // Priority filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      priorityFilter = btn.dataset.priority;
      renderTasks();
    });
  });

  addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title) {
      addTask(title);
      taskInput.value = '';
    }
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTaskBtn.click();
    }
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTasks();
  });

  // Export/Import functionality
  exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify({ tasks, user }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  importBtn.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.tasks && confirm('Import data? This will replace current tasks.')) {
            tasks = data.tasks;
            saveTasks();
          }
        } catch (err) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (taskInput.value.trim()) addTaskBtn.click();
          break;
        case '1':
          e.preventDefault();
          tabs[0].click();
          break;
        case '2':
          e.preventDefault();
          tabs[1].click();
          break;
        case '3':
          e.preventDefault();
          tabs[2].click();
          break;
        case 'f':
          e.preventDefault();
          searchInput.focus();
          break;
        case 'n':
          e.preventDefault();
          taskInput.focus();
          break;
        case 'e':
          e.preventDefault();
          exportBtn.click();
          break;
        case 'i':
          e.preventDefault();
          importBtn.click();
          break;
        case '?':
          e.preventDefault();
          toggleShortcutsHelp();
          break;
      }
    }
  });

  function toggleShortcutsHelp() {
    let help = document.querySelector('.shortcuts-help');
    if (!help) {
      help = document.createElement('div');
      help.className = 'shortcuts-help';
      help.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Ctrl+Enter: Add task<br>
        Ctrl+1/2/3: Switch tabs<br>
        Ctrl+F: Focus search<br>
        Ctrl+N: Focus new task<br>
        Ctrl+E: Export data<br>
        Ctrl+I: Import data<br>
        Ctrl+?: Toggle this help
      `;
      document.body.appendChild(help);
    }
    help.classList.toggle('show');
    if (help.classList.contains('show')) {
      setTimeout(() => help.classList.remove('show'), 5000);
    }
  }

  fetchInitialTasksIfNeeded();
});
