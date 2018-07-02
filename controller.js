class Controller {

  constructor() {
    this._loadTasks();
    this._onSubmit = this._onSubmit.bind(this);
    this._removeTask = this._removeTask.bind(this);
    this._registerEventListeners();
  }

  _registerEventListeners() {
    document.querySelector("form").addEventListener("submit", this._onSubmit);
  }

  _loadTasks() {
    this.tasks = [];
    if (window.localStorage.getItem("tasks")) {
      let loaded = JSON.parse(window.localStorage.getItem("tasks"));
      const controller = this;
      loaded.forEach(task => {
        controller._addTask(task);
      });
    }
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._addTask({name: document.querySelector("#add").value, createdAt: new Date().getTime()});
    document.querySelector("#add").value = "";
  }

  _addTask(task) {
    let where = null;
    let weather = JSON.parse('[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}]');
    if (task.name.indexOf(weather[0].main) != -1) {
      where = document.querySelector(".weather");
    } else {
      where = document.querySelector(".noweather");
    }

    where.appendChild(new TaskElement(task.name, task.createdAt));

    this.tasks.push(task);
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  _removeTask(createdAt) {
    let index = -1;
    this.tasks.forEach((task, i) => {
      if (task.createdAt == createdAt) {
        index = i;
      }
    });
    this.tasks.splice(index, 1);
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

}

window.addEventListener('load', _ => {
  window.controller = new Controller();
});
