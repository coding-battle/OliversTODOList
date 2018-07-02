class TaskElement extends HTMLElement {

  constructor(name, createdAt) {
    super();
    this.name = name;
    this.createdAt = createdAt;
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    this.innerHTML = `
      <i class="far fa-check-circle"></i>
      <span>${this.name}</span>
    `;
    this.addEventListener('click', this._onClick);
  }

  _onClick() {
    this.remove();
    window.controller._removeTask(this.createdAt);
  }

}

window.customElements.define("todo-task", TaskElement);