const STORAGE_KEY = "tymove-ukoly-v1";
const STATUS_LABELS = {
  todo: "K udělání",
  progress: "Rozpracováno",
  done: "Hotovo",
};
const PRIORITY_LABELS = {
  normal: "Běžná",
  high: "Vysoká",
  urgent: "Naléhavá",
};
const RECURRENCE_LABELS = {
  none: "Bez opakování",
  weekly: "Každý týden",
  monthly: "Každý měsíc",
};
const WEEKDAYS = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

const elements = {
  allCount: document.querySelector("#count-all"),
  progressCount: document.querySelector("#count-progress"),
  doneCount: document.querySelector("#count-done"),
  taskList: document.querySelector("#task-list"),
  search: document.querySelector("#search"),
  filters: document.querySelector(".filters"),
  dialog: document.querySelector("#task-dialog"),
  form: document.querySelector("#task-form"),
  dialogTitle: document.querySelector("#dialog-title"),
  taskId: document.querySelector("#task-id"),
  title: document.querySelector("#task-title"),
  assignee: document.querySelector("#task-assignee"),
  dueDate: document.querySelector("#task-due-date"),
  status: document.querySelector("#task-status"),
  priority: document.querySelector("#task-priority"),
  recurrence: document.querySelector("#task-recurrence"),
  notes: document.querySelector("#task-notes"),
  formError: document.querySelector("#form-error"),
  storageAlert: document.querySelector("#storage-alert"),
  deleteButton: document.querySelector("#delete-task"),
  calendarMonth: document.querySelector("#calendar-month"),
  calendarGrid: document.querySelector("#calendar-grid"),
  previousMonth: document.querySelector("#previous-month"),
  nextMonth: document.querySelector("#next-month"),
  calendarToday: document.querySelector("#calendar-today"),
  calendarClear: document.querySelector("#calendar-clear"),
  detailDialog: document.querySelector("#detail-dialog"),
  detailTitle: document.querySelector("#detail-title"),
  detailSummary: document.querySelector("#detail-summary"),
  detailNotes: document.querySelector("#detail-notes"),
  doneDetailTask: document.querySelector("#done-detail-task"),
  taskDetails: document.querySelector("#task-details"),
  checklist: document.querySelector("#checklist"),
  checklistCount: document.querySelector("#checklist-count"),
  checklistInput: document.querySelector("#checklist-input"),
  commentInput: document.querySelector("#comment-input"),
  activityList: document.querySelector("#activity-list"),
  peopleDialog: document.querySelector("#people-dialog"),
  peopleForm: document.querySelector("#people-form"),
  employeeName: document.querySelector("#employee-name"),
  employeeList: document.querySelector("#employee-list"),
  employeeOptions: document.querySelector("#employee-options"),
  peopleError: document.querySelector("#people-error"),
};

let data = loadData();
let tasks = data.tasks;
let employees = data.employees;
let activeFilter = "all";
let selectedCalendarDate = "";
let selectedDetailTaskId = "";
let restoreDetailAfterEdit = false;
let calendarCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { tasks: [], employees: [] };

    const parsed = JSON.parse(stored);
    const legacyTasks = Array.isArray(parsed);
    if (!legacyTasks && (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.employees))) {
      throw new Error("Uložené údaje nemají očekávaný formát.");
    }
    const storedTasks = legacyTasks ? parsed : parsed.tasks;
    const storedEmployees = legacyTasks ? [] : parsed.employees;
    if (storedTasks.some((task) => !isValidTask(task))
      || storedEmployees.some((employee) => typeof employee !== "string" || !employee.trim())) {
      throw new Error("Uložené údaje obsahují neplatný úkol nebo zaměstnance.");
    }

    const normalizedTasks = storedTasks.map(normalizeTask);
    const employeeNames = new Map(storedEmployees.map((name) => [name.toLocaleLowerCase("cs-CZ"), name]));
    normalizedTasks.forEach((task) => {
      if (task.assignee) employeeNames.set(task.assignee.toLocaleLowerCase("cs-CZ"), task.assignee);
    });
    return { tasks: normalizedTasks, employees: [...employeeNames.values()] };
  } catch (error) {
    showStorageError(`Údaje se nepodařilo načíst: ${error.message} Zkontrolujte úložiště prohlížeče.`);
    return { tasks: [], employees: [] };
  }
}

function isValidTask(task) {
  if (!task || typeof task !== "object"
    || typeof task.id !== "string"
    || typeof task.title !== "string"
    || typeof task.assignee !== "string"
    || typeof task.notes !== "string"
    || !["todo", "progress", "done"].includes(task.status)
    || !["normal", "high", "urgent"].includes(task.priority)) return false;

  return (task.dueDate === undefined || typeof task.dueDate === "string")
    && (task.recurrence === undefined || Object.hasOwn(RECURRENCE_LABELS, task.recurrence))
    && (task.recurrenceCreated === undefined || typeof task.recurrenceCreated === "boolean")
    && (task.checklist === undefined || (Array.isArray(task.checklist)
      && task.checklist.every((item) => item && typeof item.id === "string"
        && typeof item.text === "string" && typeof item.done === "boolean")))
    && (task.comments === undefined || (Array.isArray(task.comments)
      && task.comments.every((item) => item && typeof item.text === "string"
        && typeof item.createdAt === "string")))
    && (task.history === undefined || (Array.isArray(task.history)
      && task.history.every((item) => item && typeof item.text === "string"
        && typeof item.createdAt === "string")));
}

function normalizeTask(task) {
  return {
    ...task,
    dueDate: task.dueDate ?? "",
    recurrence: task.recurrence ?? "none",
    recurrenceCreated: task.recurrenceCreated ?? false,
    checklist: task.checklist ?? [],
    comments: task.comments ?? [],
    history: task.history ?? [],
  };
}

function saveData(nextTasks, nextEmployees) {
  const nextData = { tasks: nextTasks, employees: nextEmployees };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    data = nextData;
    tasks = data.tasks;
    employees = data.employees;
    elements.storageAlert.hidden = true;
    render();
    return true;
  } catch (error) {
    showStorageError(`Změnu se nepodařilo uložit: ${error.message} Uvolněte místo v úložišti a zkuste to znovu.`);
    return false;
  }
}

function showStorageError(message) {
  elements.storageAlert.textContent = message;
  elements.storageAlert.hidden = false;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "short", year: "numeric" })
    .format(new Date(year, month - 1, day));
}

function todayString() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function dateString(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Neznámý čas";
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(date);
}

function activity(text) {
  return { text, createdAt: new Date().toISOString() };
}

function nextOccurrence(dateValue, recurrence) {
  const [year, month, day] = dateValue.split("-").map(Number);
  if (recurrence === "weekly") return dateString(new Date(year, month - 1, day + 7));
  const targetMonth = month;
  const lastDay = new Date(year, targetMonth + 1, 0).getDate();
  return dateString(new Date(year, targetMonth, Math.min(day, lastDay)));
}

function ensureEmployee(name, list = employees) {
  const cleanedName = name.trim();
  if (!cleanedName || list.some((employee) => employee.toLocaleLowerCase("cs-CZ") === cleanedName.toLocaleLowerCase("cs-CZ"))) {
    return list;
  }
  return [...list, cleanedName].sort((first, second) => first.localeCompare(second, "cs-CZ"));
}

function renderEmployeeOptions() {
  elements.employeeOptions.innerHTML = employees
    .map((employee) => `<option value="${escapeHtml(employee)}"></option>`)
    .join("");
}

function taskCard(task) {
  const overdue = task.dueDate && task.dueDate < todayString() && task.status !== "done";
  const dueDate = task.dueDate
    ? `<span class="meta-item${overdue ? " overdue" : ""}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>
        ${overdue ? "Po termínu · " : ""}${escapeHtml(formatDate(task.dueDate))}
      </span>`
    : "";
  const assignee = task.assignee
    ? `<span class="meta-item">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.5-3.4 3.2-5.5 7-5.5s6.5 2.1 7 5.5"/></svg>
        ${escapeHtml(task.assignee)}
      </span>`
    : "";
  const notes = task.notes ? `<p class="task-notes">${escapeHtml(task.notes)}</p>` : "";
  const checklistSummary = task.checklist.length
    ? `<span class="meta-item checklist-summary">☑ ${task.checklist.filter((item) => item.done).length}/${task.checklist.length}</span>`
    : "";
  const commentSummary = task.comments.length
    ? `<span class="meta-item">Komentáře ${task.comments.length}</span>`
    : "";
  const repeatSummary = task.recurrence !== "none"
    ? `<span class="meta-item">↻ ${escapeHtml(RECURRENCE_LABELS[task.recurrence])}</span>`
    : "";

  return `<article class="task-card${task.status === "done" ? " is-done" : ""}" data-id="${escapeHtml(task.id)}" tabindex="0" role="group" aria-label="Úkol: ${escapeHtml(task.title)}. Klepnutím otevřete detail.">
    <div class="task-main">
      <div class="task-title-row">
        <span class="priority-dot ${task.priority === "normal" ? "" : escapeHtml(task.priority)}" title="Priorita: ${escapeHtml(PRIORITY_LABELS[task.priority])}"></span>
        <h3 class="task-title">${escapeHtml(task.title)}</h3>
      </div>
      ${notes}
      <div class="task-meta">${assignee}${dueDate}<span class="meta-item">${escapeHtml(PRIORITY_LABELS[task.priority])}</span>${checklistSummary}${commentSummary}${repeatSummary}</div>
    </div>
    <div class="task-controls">
      <select class="status-select" data-action="status" data-status="${escapeHtml(task.status)}" aria-label="Stav úkolu: ${escapeHtml(task.title)}">
        ${Object.entries(STATUS_LABELS).map(([value, label]) => `<option value="${value}"${task.status === value ? " selected" : ""}>${label}</option>`).join("")}
      </select>
      <button class="icon-button edit-task" type="button" data-action="edit" aria-label="Upravit: ${escapeHtml(task.title)}">✎</button>
    </div>
  </article>`;
}

function renderCalendar() {
  elements.calendarMonth.textContent = new Intl.DateTimeFormat("cs-CZ", { month: "long", year: "numeric" }).format(calendarCursor);
  elements.calendarClear.hidden = !selectedCalendarDate;

  const firstDay = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth(), 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - mondayOffset);
  const days = WEEKDAYS.map((day) => `<span class="calendar-weekday" role="columnheader">${day}</span>`);

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    const dateValue = dateString(date);
    const dueTasks = tasks.filter((task) => task.dueDate === dateValue);
    const classes = [
      "calendar-day",
      date.getMonth() !== calendarCursor.getMonth() ? "is-outside" : "",
      dateValue === todayString() ? "is-today" : "",
      dateValue === selectedCalendarDate ? "is-selected" : "",
      dueTasks.length ? "has-tasks" : "",
    ].filter(Boolean).join(" ");
    const taskLabel = dueTasks.length ? `, ${dueTasks.length} ${dueTasks.length === 1 ? "úkol" : "úkoly"}` : "";
    days.push(`<button class="${classes}" type="button" role="gridcell" data-date="${dateValue}" aria-label="${date.getDate()}. ${new Intl.DateTimeFormat("cs-CZ", { month: "long" }).format(date)}${taskLabel}" aria-pressed="${dateValue === selectedCalendarDate}">
      <span>${date.getDate()}</span>${dueTasks.length ? `<small>${dueTasks.length}</small>` : ""}
    </button>`);
  }

  elements.calendarGrid.innerHTML = days.join("");
}

function render() {
  elements.allCount.textContent = String(tasks.length);
  elements.progressCount.textContent = String(tasks.filter((task) => task.status === "progress").length);
  elements.doneCount.textContent = String(tasks.filter((task) => task.status === "done").length);
  renderEmployeeOptions();
  renderCalendar();

  const query = elements.search.value.trim().toLocaleLowerCase("cs-CZ");
  const visibleTasks = tasks
    .filter((task) => activeFilter === "all" || task.status === activeFilter)
    .filter((task) => !selectedCalendarDate || task.dueDate === selectedCalendarDate)
    .filter((task) => `${task.title} ${task.assignee} ${task.notes} ${task.comments.map((comment) => comment.text).join(" ")}`
      .toLocaleLowerCase("cs-CZ").includes(query))
    .sort((first, second) => {
      if (first.status === "done" && second.status !== "done") return 1;
      if (first.status !== "done" && second.status === "done") return -1;
      if (!first.dueDate) return second.dueDate ? 1 : 0;
      if (!second.dueDate) return -1;
      return first.dueDate.localeCompare(second.dueDate);
    });

  if (visibleTasks.length) {
    elements.taskList.innerHTML = visibleTasks.map(taskCard).join("");
  } else {
    const hasTasks = tasks.length > 0;
    const message = selectedCalendarDate
      ? `Na den ${formatDate(selectedCalendarDate)} tu nejsou žádné úkoly.`
      : hasTasks ? "Zkuste změnit hledání nebo filtr." : "Přidejte první úkol a mějte týmovou práci na jednom místě.";
    elements.taskList.innerHTML = `<div class="empty-state">
      <strong>${selectedCalendarDate ? "Žádné úkoly v tento den" : hasTasks ? "Nic jsme nenašli" : "Zatím tu nic není"}</strong>
      <p>${message}</p>
    </div>`;
  }

  if (elements.detailDialog.open && selectedDetailTaskId) {
    renderTaskDetails(tasks.find((task) => task.id === selectedDetailTaskId) ?? null);
  }
}

function renderTaskDetails(task) {
  if (!task) {
    selectedDetailTaskId = "";
    elements.detailDialog.close();
    return;
  }

  selectedDetailTaskId = task.id;
  elements.detailTitle.textContent = task.title;
  elements.detailSummary.innerHTML = [
    `<span class="detail-chip status-${escapeHtml(task.status)}">${escapeHtml(STATUS_LABELS[task.status])}</span>`,
    `<span class="detail-chip priority-${escapeHtml(task.priority)}">${escapeHtml(PRIORITY_LABELS[task.priority])} priorita</span>`,
    task.assignee ? `<span class="detail-chip">${escapeHtml(task.assignee)}</span>` : "",
    task.dueDate ? `<span class="detail-chip">Termín: ${escapeHtml(formatDate(task.dueDate))}</span>` : "",
    task.recurrence !== "none" ? `<span class="detail-chip">↻ ${escapeHtml(RECURRENCE_LABELS[task.recurrence])}</span>` : "",
  ].filter(Boolean).join("");
  elements.detailNotes.textContent = task.notes;
  elements.detailNotes.hidden = !task.notes;
  elements.doneDetailTask.disabled = task.status === "done";
  elements.doneDetailTask.textContent = task.status === "done" ? "Úkol je hotový" : "Označit jako hotovo";

  const checkedCount = task.checklist.filter((item) => item.done).length;
  elements.checklistCount.textContent = `${checkedCount}/${task.checklist.length} hotovo`;
  elements.checklist.innerHTML = task.checklist.length
    ? task.checklist.map((item) => `<li class="checklist-item${item.done ? " is-checked" : ""}" data-item-id="${escapeHtml(item.id)}">
        <label><input type="checkbox" data-action="checklist-toggle"${item.done ? " checked" : ""}><span>${escapeHtml(item.text)}</span></label>
        <button class="icon-button remove-checklist-item" type="button" data-action="checklist-remove" aria-label="Odebrat položku: ${escapeHtml(item.text)}">×</button>
      </li>`).join("")
    : '<li class="checklist-empty">Zatím bez podúkolů.</li>';

  const activityItems = [
    ...task.comments.map((item) => ({ ...item, kind: "comment", label: "Komentář" })),
    ...task.history.map((item) => ({ ...item, kind: "history", label: "Historie" })),
  ].sort((first, second) => second.createdAt.localeCompare(first.createdAt));
  elements.activityList.innerHTML = activityItems.length
    ? activityItems.map((item) => `<li class="activity-item ${item.kind}">
        <span class="activity-kind">${item.label}</span>
        <p>${escapeHtml(item.text)}</p>
        <time datetime="${escapeHtml(item.createdAt)}">${escapeHtml(formatTimestamp(item.createdAt))}</time>
      </li>`).join("")
    : '<li class="checklist-empty">Zatím bez komentářů a změn.</li>';
}

function openTaskDetails(task) {
  elements.checklistInput.value = "";
  elements.commentInput.value = "";
  renderTaskDetails(task);
  elements.detailDialog.showModal();
  document.querySelector("#close-detail-dialog").focus();
}

function openDialog(task, returnToDetail = false) {
  restoreDetailAfterEdit = returnToDetail;
  if (elements.detailDialog.open) elements.detailDialog.close();
  elements.form.reset();
  elements.formError.hidden = true;
  elements.formError.textContent = "";
  elements.taskId.value = task?.id ?? "";
  elements.dialogTitle.textContent = task ? "Upravit úkol" : "Nový úkol";
  elements.deleteButton.hidden = !task;
  elements.title.value = task?.title ?? "";
  elements.assignee.value = task?.assignee ?? "";
  elements.dueDate.value = task?.dueDate ?? "";
  elements.status.value = task?.status ?? "todo";
  elements.priority.value = task?.priority ?? "normal";
  elements.recurrence.value = task?.recurrence ?? "none";
  elements.notes.value = task?.notes ?? "";
  elements.dialog.showModal();
  elements.title.focus();
}

function closeDialog() {
  elements.dialog.close();
  if (restoreDetailAfterEdit) {
    restoreDetailAfterEdit = false;
    const task = tasks.find((item) => item.id === elements.taskId.value);
    if (task) openTaskDetails(task);
    else selectedDetailTaskId = "";
  }
}

function updateTask(taskId, update) {
  const current = tasks.find((task) => task.id === taskId);
  if (!current) return false;
  const updated = update(current);
  const nextTasks = tasks.map((task) => task.id === taskId ? updated : task);
  return saveData(nextTasks, employees);
}

function updateOpenTask(taskId, update) {
  if (!updateTask(taskId, update)) {
    renderTaskDetails(tasks.find((task) => task.id === taskId) ?? null);
    return false;
  }
  const updated = tasks.find((task) => task.id === taskId);
  renderTaskDetails(updated);
  return true;
}

function createNextOccurrence(task, currentTasks) {
  if (task.status !== "done" || task.recurrence === "none" || task.recurrenceCreated) return currentTasks;
  if (!task.dueDate) return currentTasks;

  const now = new Date().toISOString();
  const nextTask = {
    ...task,
    id: crypto.randomUUID(),
    dueDate: nextOccurrence(task.dueDate, task.recurrence),
    status: "todo",
    recurrenceCreated: false,
    checklist: task.checklist.map((item) => ({ ...item, id: crypto.randomUUID(), done: false })),
    comments: [],
    history: [activity(`Vytvořeno opakování úkolu „${task.title}“.`)],
    createdAt: now,
    updatedAt: now,
  };
  return [
    { ...task, recurrenceCreated: true, history: [...task.history, activity(`Vytvořeno další opakování na ${formatDate(nextTask.dueDate)}.`)] },
    nextTask,
    ...currentTasks.filter((item) => item.id !== task.id),
  ];
}

function saveTaskForm(event) {
  event.preventDefault();
  if (!elements.form.reportValidity()) return;

  const id = elements.taskId.value || crypto.randomUUID();
  const existingTask = tasks.find((task) => task.id === id);
  const task = {
    id,
    title: elements.title.value.trim(),
    assignee: elements.assignee.value.trim(),
    dueDate: elements.dueDate.value,
    status: elements.status.value,
    priority: elements.priority.value,
    recurrence: elements.recurrence.value,
    recurrenceCreated: existingTask?.recurrenceCreated ?? false,
    notes: elements.notes.value.trim(),
    checklist: existingTask?.checklist ?? [],
    comments: existingTask?.comments ?? [],
    history: existingTask?.history ?? [],
    createdAt: existingTask?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!task.title) {
    elements.formError.textContent = "Vyplňte název úkolu.";
    elements.formError.hidden = false;
    elements.title.focus();
    return;
  }
  if (task.recurrence !== "none" && !task.dueDate) {
    elements.formError.textContent = "Pro opakovaný úkol nejprve nastavte termín.";
    elements.formError.hidden = false;
    elements.dueDate.focus();
    return;
  }

  if (existingTask) {
    const changes = [];
    if (existingTask.title !== task.title) changes.push("název");
    if (existingTask.assignee !== task.assignee) changes.push("přiřazení");
    if (existingTask.dueDate !== task.dueDate) changes.push("termín");
    if (existingTask.status !== task.status) changes.push(`stav: ${STATUS_LABELS[existingTask.status]} → ${STATUS_LABELS[task.status]}`);
    if (existingTask.priority !== task.priority) changes.push("priorita");
    if (existingTask.recurrence !== task.recurrence) changes.push("opakování");
    if (existingTask.notes !== task.notes) changes.push("poznámka");
    if (changes.length) task.history = [...task.history, activity(`Upraveno: ${changes.join(", ")}.`)];
  } else {
    task.history = [activity("Úkol vytvořen.")];
  }

  let nextTasks = existingTask
    ? tasks.map((item) => item.id === id ? task : item)
    : [task, ...tasks];
  if (task.status === "done" && existingTask?.status !== "done") {
    nextTasks = createNextOccurrence(task, nextTasks);
  }
  const nextEmployees = existingTask?.assignee === task.assignee
    ? employees
    : ensureEmployee(task.assignee);

  if (saveData(nextTasks, nextEmployees)) closeDialog();
}

function renderEmployees() {
  elements.employeeList.innerHTML = employees.length
    ? employees.map((employee) => `<li class="employee-item">
        <span>${escapeHtml(employee)}</span>
        <button class="icon-button" type="button" data-action="employee-remove" data-name="${escapeHtml(employee)}" aria-label="Odebrat zaměstnance: ${escapeHtml(employee)}">×</button>
      </li>`).join("")
    : '<li class="checklist-empty">Číselník je zatím prázdný.</li>';
}

document.querySelector("#add-task").addEventListener("click", () => openDialog(null));
document.querySelector("#close-dialog").addEventListener("click", closeDialog);
document.querySelector("#cancel-dialog").addEventListener("click", closeDialog);
elements.deleteButton.addEventListener("click", () => {
  const id = elements.taskId.value;
  const task = tasks.find((item) => item.id === id);
  if (!task || !window.confirm(`Opravdu chcete smazat úkol „${task.title}“?`)) return;
  if (saveData(tasks.filter((item) => item.id !== id), employees)) closeDialog();
});
elements.form.addEventListener("submit", saveTaskForm);
elements.dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDialog();
});
elements.search.addEventListener("input", render);

elements.filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  elements.filters.querySelectorAll("[data-filter]").forEach((filterButton) => {
    const selected = filterButton === button;
    filterButton.classList.toggle("is-active", selected);
    filterButton.setAttribute("aria-pressed", String(selected));
  });
  render();
});

elements.calendarGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-date]");
  if (!button) return;
  selectedCalendarDate = button.dataset.date;
  calendarCursor = new Date(`${selectedCalendarDate}T12:00:00`);
  calendarCursor.setDate(1);
  render();
});
elements.previousMonth.addEventListener("click", () => {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
  selectedCalendarDate = "";
  render();
});
elements.nextMonth.addEventListener("click", () => {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
  selectedCalendarDate = "";
  render();
});
elements.calendarToday.addEventListener("click", () => {
  selectedCalendarDate = todayString();
  calendarCursor = new Date();
  calendarCursor.setDate(1);
  render();
});
elements.calendarClear.addEventListener("click", () => {
  selectedCalendarDate = "";
  render();
});

elements.taskList.addEventListener("click", (event) => {
  const card = event.target.closest(".task-card");
  if (!card) return;

  const button = event.target.closest('[data-action="edit"]');
  const task = tasks.find((item) => item.id === card.dataset.id);
  if (!task) return;
  if (button) {
    openDialog(task);
    return;
  }
  if (event.target.closest("button, select, input, textarea, a")) return;
  openTaskDetails(task);
});

elements.taskList.addEventListener("keydown", (event) => {
  const card = event.target.closest(".task-card");
  if (!card || event.target !== card || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  const task = tasks.find((item) => item.id === card.dataset.id);
  if (task) openTaskDetails(task);
});

function setTaskStatus(id, status) {
  const current = tasks.find((task) => task.id === id);
  if (!current) return;

  let nextTasks = tasks.map((task) => task.id === id
    ? { ...task, status, updatedAt: new Date().toISOString(), history: [...task.history, activity(`Stav změněn: ${STATUS_LABELS[current.status]} → ${STATUS_LABELS[status]}.`)] }
    : task);
  if (status === "done" && current.status !== "done") {
    nextTasks = createNextOccurrence(nextTasks.find((task) => task.id === id), nextTasks);
  }
  saveData(nextTasks, employees);
}

elements.taskList.addEventListener("change", (event) => {
  const select = event.target.closest('[data-action="status"]');
  if (select) setTaskStatus(select.closest("[data-id]").dataset.id, select.value);
});

document.querySelector("#close-detail-dialog").addEventListener("click", () => elements.detailDialog.close());
document.querySelector("#edit-detail-task").addEventListener("click", () => {
  const task = tasks.find((item) => item.id === selectedDetailTaskId);
  if (task) openDialog(task, true);
});
elements.doneDetailTask.addEventListener("click", () => setTaskStatus(selectedDetailTaskId, "done"));

document.querySelector("#add-checklist-item").addEventListener("click", () => {
  const id = selectedDetailTaskId;
  const text = elements.checklistInput.value.trim();
  if (!id || !text) {
    elements.checklistInput.focus();
    return;
  }
  if (!updateOpenTask(id, (task) => ({
    ...task,
    checklist: [...task.checklist, { id: crypto.randomUUID(), text, done: false }],
    updatedAt: new Date().toISOString(),
    history: [...task.history, activity(`Přidán podúkol: „${text}“.`)],
  }))) return;
  elements.checklistInput.value = "";
  elements.checklistInput.focus();
});

elements.checklistInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#add-checklist-item").click();
  }
});

elements.checklist.addEventListener("change", (event) => {
  const checkbox = event.target.closest('[data-action="checklist-toggle"]');
  if (!checkbox) return;
  const taskId = selectedDetailTaskId;
  const itemId = checkbox.closest("[data-item-id]").dataset.itemId;
  updateOpenTask(taskId, (task) => ({
    ...task,
    checklist: task.checklist.map((item) => item.id === itemId ? { ...item, done: checkbox.checked } : item),
    updatedAt: new Date().toISOString(),
    history: [...task.history, activity(`${task.checklist.find((item) => item.id === itemId).text} — ${checkbox.checked ? "hotovo" : "znovu otevřeno"}.`)],
  }));
});

elements.checklist.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="checklist-remove"]');
  if (!button) return;
  const taskId = selectedDetailTaskId;
  const itemId = button.closest("[data-item-id]").dataset.itemId;
  updateOpenTask(taskId, (task) => {
    const removed = task.checklist.find((item) => item.id === itemId);
    return {
      ...task,
      checklist: task.checklist.filter((item) => item.id !== itemId),
      updatedAt: new Date().toISOString(),
      history: [...task.history, activity(`Odebrán podúkol: „${removed.text}“.`)],
    };
  });
});

document.querySelector("#add-comment").addEventListener("click", () => {
  const id = selectedDetailTaskId;
  const text = elements.commentInput.value.trim();
  if (!id || !text) {
    elements.commentInput.focus();
    return;
  }
  if (!updateOpenTask(id, (task) => ({
    ...task,
    comments: [...task.comments, { ...activity(text), id: crypto.randomUUID(), author: "Já" }],
    updatedAt: new Date().toISOString(),
  }))) return;
  elements.commentInput.value = "";
});

document.querySelector("#manage-people").addEventListener("click", () => {
  renderEmployees();
  elements.peopleError.hidden = true;
  elements.employeeName.value = "";
  elements.peopleDialog.showModal();
  elements.employeeName.focus();
});
document.querySelector("#close-people-dialog").addEventListener("click", () => elements.peopleDialog.close());
document.querySelector("#cancel-people-dialog").addEventListener("click", () => elements.peopleDialog.close());
elements.peopleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = elements.employeeName.value.trim();
  if (!name) {
    elements.peopleError.textContent = "Zadejte jméno zaměstnance.";
    elements.peopleError.hidden = false;
    return;
  }
  if (employees.some((employee) => employee.toLocaleLowerCase("cs-CZ") === name.toLocaleLowerCase("cs-CZ"))) {
    elements.peopleError.textContent = "Tento zaměstnanec už v číselníku je.";
    elements.peopleError.hidden = false;
    return;
  }
  if (saveData(tasks, ensureEmployee(name))) {
    renderEmployees();
    elements.employeeName.value = "";
    elements.peopleError.hidden = true;
    elements.employeeName.focus();
  }
});
elements.employeeList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="employee-remove"]');
  if (!button) return;
  const name = button.dataset.name;
  if (!window.confirm(`Odebrat „${name}“ z číselníku? Již přiřazené úkoly zůstanou zachovány.`)) return;
  const nextEmployees = employees.filter((employee) => employee !== name);
  if (saveData(tasks, nextEmployees)) renderEmployees();
});

render();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      showStorageError(`Offline režim se nepodařilo zapnout: ${error.message}`);
    });
  });
}
