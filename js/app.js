const taskInput = document.querySelector('#add__input');
const addButton = document.querySelector('#add__button');
const incompleteTaskHolder = document.querySelector('#incompleteTasks');
const completedTasksHolder = document.querySelector('#completed-tasks');

const createNewTaskElement = (taskString) => {
  const taskItem = createDomNode('taskItem', 'li', 'task__item');

  const checkBox = createDomNode('checkBox', 'input', 'task__checkbox');
  checkBox.type = 'checkbox';

  const label = createDomNode('label', 'label', 'task__label');
  label.innerText = taskString;

  const editInput = createDomNode('editInput', 'input', 'task__input');
  editInput.type = 'text';

  const editButton = createDomNode(
    'editButton',
    'button',
    'button',
    'edit--button'
  );
  editButton.innerText = 'Edit';

  const deleteButton = createDomNode(
    'deleteButton',
    'button',
    'button',
    'delete--button'
  );
  const deleteButtonImg = createDomNode('deleteButtonImg', 'img');
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  appendChildFromArray(
    taskItem,
    checkBox,
    label,
    editInput,
    editButton,
    deleteButton
  );

  return taskItem;
};

const addTask = (input) => {
  if (!input.value) return;
  const taskItem = createNewTaskElement(input.value);

  incompleteTaskHolder.append(taskItem);
  bindTaskEvents(taskItem, toogleStatus);

  input.value = '';
};

//Edit an existing task.
const editTask = async (taskListItem) => {
  if (typeof taskListItem === 'object') {
    const label = taskListItem.querySelector('label');
    const editBtn = taskListItem.querySelector('.edit--button');
    const containsClas = taskListItem.classList.contains('editMode');
    const editInput = taskListItem.querySelector('.task__input');

    await ajaxRequest(`${taskListItem} was edeted`);

    containsClas
      ? ((label.innerText = editInput.value), (editBtn.innerText = 'Edit'))
      : ((editInput.value = label.innerText), (editBtn.innerText = 'Save'));

    taskListItem.classList.toggle('editMode');
  }
};

//Delete task.
const deleteTask = async (taskListItem) =>
  taskListItem
    ? (await ajaxRequest(`${taskListItem} was deleted`),
      taskListItem.parentNode.removeChild(taskListItem))
    : console.log('deleted error');

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  taskListItem
    .querySelector('.task__checkbox')
    .addEventListener('change', () => checkBoxEventHandler(taskListItem));
  taskListItem
    .querySelector('.edit--button')
    .addEventListener('click', () => editTask(taskListItem));

  taskListItem
    .querySelector('.delete--button')
    .addEventListener('click', () => deleteTask(taskListItem));
};

const TASK__ITEMS = document.querySelectorAll('.task__item');

const toogleStatus = (taskItem) =>
  taskItem.querySelector('.task__checkbox').checked
    ? (completedTasksHolder.appendChild(taskItem),
      taskItem.querySelector('.task__label').classList.add('completed'))
    : incompleteTaskHolder.appendChild(taskItem);

TASK__ITEMS.forEach((el) => bindTaskEvents(el, () => toogleStatus(el)));
addButton.addEventListener('click', () => addTask(taskInput));
addButton.addEventListener('click', ajaxRequest);
