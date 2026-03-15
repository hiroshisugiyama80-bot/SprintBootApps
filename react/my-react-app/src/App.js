import { useEffect, useState } from "react";

function App() {
  const API_URL = "http://localhost:8080/tasks";

  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDone, setUpdateDone] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // GET
  const fetchTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // POST
  const addTask = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, done: false }),
    }).then(() => {
      setNewTitle("");
      fetchTasks();
    });
  };

  // PUT
  const updateTask = () => {
    fetch(`${API_URL}/${updateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updateTitle, done: updateDone }),
    }).then(() => {
      setUpdateId("");
      setUpdateTitle("");
      setUpdateDone(false);
      fetchTasks();
    });
  };

  // DELETE
  const deleteTask = () => {
    fetch(`${API_URL}/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      setDeleteId("");
      fetchTasks();
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>タスク管理（React × Spring Boot）</h1>

      {/* GET */}
      <h2>タスク一覧</h2>
      <button onClick={fetchTasks}>再読み込み</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.id}: {t.title}（完了: {t.done ? "はい" : "いいえ"}）
          </li>
        ))}
      </ul>

      {/* POST */}
      <h2>タスク追加（POST）</h2>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="タイトル"
      />
      <button onClick={addTask}>追加</button>

      {/* PUT */}
      <h2>タスク更新（PUT）</h2>
      <input
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
        placeholder="ID"
      />
      <input
        value={updateTitle}
        onChange={(e) => setUpdateTitle(e.target.value)}
        placeholder="新しいタイトル"
      />
      <label>
        <input
          type="checkbox"
          checked={updateDone}
          onChange={(e) => setUpdateDone(e.target.checked)}
        />
        完了
      </label>
      <button onClick={updateTask}>更新</button>

      {/* DELETE */}
      <h2>タスク削除（DELETE）</h2>
      <input
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
        placeholder="ID"
      />
      <button onClick={deleteTask}>削除</button>
    </div>
  );
}

export default App;