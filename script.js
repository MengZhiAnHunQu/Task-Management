const taskList = [];
const badList = [];
const weekHrs = 7 * 24;
const taskListElm = document.getElementById("task-list");
const badListElm = document.getElementById("bad-list");

const handleOnSubmit = (e) => {
  const frmDt = new FormData(e);
  //   console.log(frmDt);
  const Tasks = frmDt.get("Task");
  const Hours = +frmDt.get("Hours");
  //   console.log(Tasks, Hours);
  if (Hours < 1) {
    return alert("Please enter valid hours");
  }

  //   const ttlHr = taskTotalHrs;
  const ttlHr = taskTotalHrs();

  if (ttlHr + Hours > weekHrs) {
    return alert("You only have 168 hours per week😜");
  }
  const obj = {
    task: Tasks,
    hr: Hours,
  };

  taskList.push(obj);

  //   taskList.push(obj);
  display();
  taskTotalHrs();
};

const display = () => {
  let str = "";
  taskList.map((item, i) => {
    str += `
     <tr>
        <td>
        <input type="checkbox" />
        </td>
        <td class="fs-4">${item.task}</td>
        <td class="fs-4">${item.hr} hr</td>
        <td>
        <button class="btn btn-warning" onClick ="deleteTaskList(${i})">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-primary" onClick="MarkAsNotToDo(${i})" >
        <i class="fa-solid fa-arrow-right"></i>
        </button>
        </td>
        </tr>
    `;
    // console.log(str);
  });
  taskListElm.innerHTML = str;
  taskTotalHrs();
};

const displayBadList = () => {
  let str = "";
  badList.map((item, i) => {
    str += `
     <tr>
        <td>
        <input type="checkbox" />
        </td>
        <td class="fs-4">${item.task}</td>
        <td class="fs-4">${item.hr}</td>
        <td>
        <button class="btn btn-warning" onclick="MarkAsToDo(${i})">
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="btn btn-danger" onClick="deleteBadList(${i})">
        <i class="fa-solid fa-trash-can"></i>
        </button>
       
        </td>
        </tr>
    `;
    // console.log(str);
  });
  badListElm.innerHTML = str;

  taskTotalHrs();
};

//delete button to delete task list

const deleteTaskList = (i) => {
  const itm = taskList.splice(i, 1);

  display();

  return itm[0]; //?????? [{}] {}
};

const deleteBadList = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();
  return itm[0]; //??
};

//PUSH AND DISPLAY ON THE BAD LIST
const MarkAsNotToDo = (i) => {
  const badItm = deleteTaskList(i);
  badList.push(badItm);
  displayBadList();
};

const MarkAsToDo = (i) => {
  const toDoItm = deleteBadList(i);
  taskList.push(toDoItm);
  display();
};

//total hours
const taskTotalHrs = () => {
  const total = taskList.reduce((acc, item) => acc + item.hr, 0);
  const ttlBadHr = badTotalHrs();
  const grandTotal = total + ttlBadHr;
  document.getElementById("total-hr").innerHTML = grandTotal;

  return grandTotal;
};

//total badHour
const badTotalHrs = () => {
  const total = badList.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("bad-hr").innerHTML = total;
  return total;
};
