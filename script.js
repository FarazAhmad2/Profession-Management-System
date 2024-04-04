const addUserBtn = document.getElementById("add-user");
const success = document.getElementById("success");
const error = document.getElementById("error");
const empCount = document.querySelector(".emp-count");
const empContainer = document.querySelector(".emp-container");

let employees = [];
let empId = 0;

addUserBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const userName = document.getElementById("name").value;
  const profession = document.getElementById("profession").value;
  const age = document.getElementById("age").value;

  if (!userName || !profession || !age) {
    error.style.display = "block";
    success.style.display = "none";
    return;
  }

  error.style.display = "none";
  success.style.display = "block";

  const empObj = {
    id: ++empId,
    Name: userName,
    Profession: profession,
    Age: age,
  };
  employees.push(empObj);
  renderEmployees();
});

function renderEmployees() {
  empContainer.innerHTML = ""; // Clear previous content
  updateEmpCount();
  employees.forEach((employee) => {
    const empData = document.createElement("ul");
    empData.classList.add("emp-data");

    for (const key in employee) {
      if ((key == "id")) {
        const li = document.createElement("li");
        li.innerText = `${
          employee[key]
        }.`;
        empData.appendChild(li);
      } else {
        const li = document.createElement("li");
        li.innerText = `${key}: ${
          employee[key]
        }`;
        empData.appendChild(li);
      }
    }

    const delUser = document.createElement("button");
    delUser.classList.add("delete-user");
    delUser.innerText = "Delete User";
    delUser.dataset.id = employee.id; // Using dataset to store ID

    const empItem = document.createElement("div");
    empItem.classList.add("emp-item");
    empItem.appendChild(empData);
    empItem.appendChild(delUser);

    empContainer.appendChild(empItem);

    delUser.addEventListener("click", () => {
      deleteEmployee(employee.id);
    });
  });
}

function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  success.style.display = "none";
  renderEmployees();
}

function updateEmpCount() {
  if (employees.length>0) {
    empCount.style.display = "none";
  }
  else {
    empCount.style.display = "block";
    success.style.display = "none";
  }
}