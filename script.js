const form = document.getElementById('topic-form');
const topicInput = document.getElementById('topic-input');
const statusSelect = document.getElementById('status-select');
const topicList = document.getElementById('topic-list');

let topics = JSON.parse(localStorage.getItem('topics')) || [];

function saveToLocalStorage() {
  localStorage.setItem('topics', JSON.stringify(topics));
}

function renderTopics() {
  topicList.innerHTML = '';
  topics.forEach((topic, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${topic.name}</span>
      <span class="status">${topic.status}</span>
      <div class="actions">
        <button onclick="updateStatus(${index})">Update</button>
        <button onclick="deleteTopic(${index})">Delete</button>
      </div>
    `;

    topicList.appendChild(li);
  });
}

function addTopic(e) {
  e.preventDefault();

  const newTopic = {
    name: topicInput.value,
    status: statusSelect.value
  };

  topics.push(newTopic);
  saveToLocalStorage();
  renderTopics();
  form.reset();
}

function updateStatus(index) {
  const current = topics[index].status;
  const statuses = ['Not Started', 'In Progress', 'Completed'];
  const nextStatus = statuses[(statuses.indexOf(current) + 1) % statuses.length];
  topics[index].status = nextStatus;
  saveToLocalStorage();
  renderTopics();
}

function deleteTopic(index) {
  topics.splice(index, 1);
  saveToLocalStorage();
  renderTopics();
}

form.addEventListener('submit', addTopic);

renderTopics();
