import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>タスク一覧</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}（完了: {t.done ? "はい" : "いいえ"}）
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;