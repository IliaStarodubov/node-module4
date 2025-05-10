document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const currentLi = event.target.closest("li");
    const currentTitle = currentLi.querySelector("span").textContent;
    const newTitle = prompt("Введите новое название", currentTitle);
    const test = event.target.closest("li");

    if (newTitle && newTitle !== currentTitle) {
      edit(id, newTitle).then(() => {
        test.querySelector("span").textContent = newTitle;
      });
    }
  }
});

const remove = async (id) => {
  await fetch(`/${id}`, { method: "DELETE" });
};

const edit = async (id, newTitle) => {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Добавляем заголовок
    },
    body: JSON.stringify({ title: newTitle }), // Это правильно
  });
};
