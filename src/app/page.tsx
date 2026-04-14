import { TodoApp } from "./todo-app";

export default function Page() {
  return (
    <main className="flex-1 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          ToDo
        </h1>
        <TodoApp />
      </div>
    </main>
  );
}
