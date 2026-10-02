import { useEffect, useMemo, useState } from "react";

const sampleTasks = [
  { id: 1, text: "Review class notes", completed: false },
  { id: 2, text: "Submit the project", completed: true },
  { id: 3, text: "Prepare for tomorrow's quiz", completed: false },
];

function Header() {
  return (
    <header className="mb-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-600">
        Productivity Hub
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
        To-Do List App
      </h1>
    </header>
  );
}

function TaskInput({ newTask, setNewTask, addTask }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
        placeholder="Add a new task..."
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      <button
        type="button"
        onClick={addTask}
        className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
      >
        Add Task
      </button>
    </div>
  );
}

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-5 w-5 accent-indigo-600"
          aria-label={`Mark ${task.text} as completed`}
        />
        <span
          className={`text-base font-medium ${
            task.completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {task.text}
        </span>
      </div>

      <button
        type="button"
        onClick={() => deleteTask(task.id)}
        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
      >
        Delete
      </button>
    </li>
  );
}

function TaskList({ tasks, toggleTask, deleteTask, clearCompleted }) {
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Task List</h2>
        <button
          type="button"
          onClick={clearCompleted}
          className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
        >
          Clear Completed
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
          No tasks yet. Add your first task.
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <span>Total: {tasks.length}</span>
            <span>Done: {completedCount}</span>
          </div>
        </>
      )}
    </div>
  );
}

function UserGuide() {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-slate-100 p-5 shadow-inner">
      <h3 className="mb-4 text-xl font-bold text-slate-800">How to Use</h3>

      <ol className="space-y-4 text-sm leading-7 text-slate-700">
        <li>
          <span className="font-semibold text-slate-900">1.</span> Type a task in the
          input field and click <span className="font-semibold">Add Task</span>.
        </li>
        <li>
          <span className="font-semibold text-slate-900">2.</span> Click the checkbox
          to mark a task as done or not done.
        </li>
        <li>
          <span className="font-semibold text-slate-900">3.</span> Use the
          <span className="font-semibold"> Delete</span> button to remove a task.
        </li>
        <li>
          <span className="font-semibold text-slate-900">4.</span> Use
          <span className="font-semibold"> Clear Completed</span> to remove all
          finished tasks at once.
        </li>
      </ol>

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-white shadow-lg">
        <h4 className="text-lg font-bold">Tips</h4>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Keep tasks short and clear.</li>
          <li>• Use checkboxes to track progress.</li>
          <li>• Remove finished tasks to stay organized.</li>
        </ul>
      </div>
    </aside>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-list-tasks");
    return saved ? JSON.parse(saved) : sampleTasks;
  });

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    const trimmed = newTask.trim();

    if (!trimmed) return;

    const task = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  useEffect(() => {
    localStorage.setItem("todo-list-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const totalCount = useMemo(() => tasks.length, [tasks]);

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Header />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur-sm sm:p-6">
            <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Today's Progress
              </h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {totalCount} tasks
              </span>
            </div>

            <TaskList
              tasks={tasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              clearCompleted={clearCompleted}
            />
          </div>

          <UserGuide />
        </div>
      </div>
    </div>
  );
}
