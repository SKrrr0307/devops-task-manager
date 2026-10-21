const API_URL = "/api/tasks";

async function loadTasks() {

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const tasklist = document.getElementById("taskList");

    try {

	const response = await fetch(API_URL);

	if (!response.ok) {
	    throw new Error("Failed to fetch tasks");
	}

	const tasks = await response.json();

	loading.style.display = "none";

	taskList.innerHTML = "";

	tasks.forEach(task => {
	
	    const row = document.createElement("tr");

	    row.innerHTML = `
		<td>${task.id}</td>
		<td>${task.title}</td>
		<td>${task.status}</td>
	    `;	

	    taskList.appendChild(row);
	});

    } catch (err) {

	loading.style.display = "none";

	error.textContent =
	    "Unable to connect to the backend API";

	console.error(err);
    }
}

loadTasks();
