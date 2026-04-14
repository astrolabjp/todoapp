"use client";

import { useState, useRef } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: nextId.current++, text, completed: false },
    ]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      {/* 入力フォーム */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800
                     placeholder-gray-400 shadow-sm outline-none
                     focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                     transition-all"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-blue-500 text-white font-medium rounded-xl shadow-sm
                     hover:bg-blue-600 active:scale-95
                     transition-all cursor-pointer"
        >
          追加
        </button>
      </form>

      {/* タスクリスト */}
      {todos.length === 0 ? (
        <p className="text-center text-gray-400 py-12">
          タスクがありません
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm
                         group hover:shadow-md transition-all"
            >
              {/* チェックボックス */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                           shrink-0 transition-all cursor-pointer
                           ${
                             todo.completed
                               ? "bg-green-500 border-green-500"
                               : "border-gray-300 hover:border-green-400"
                           }`}
                aria-label={todo.completed ? "未完了にする" : "完了にする"}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* タスクテキスト */}
              <span
                className={`flex-1 transition-all ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>

              {/* 削除ボタン */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500
                           transition-all cursor-pointer p-1"
                aria-label="削除"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* フッター情報 */}
      {todos.length > 0 && (
        <p className="text-sm text-gray-400 text-center mt-6">
          {todos.filter((t) => !t.completed).length} 件の未完了タスク
        </p>
      )}
    </div>
  );
}
