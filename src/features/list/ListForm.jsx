import { useState } from "react";
import ListItem from "./ListItem";

export default function ListForm() {
    const [allTasks, setAllTasks] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("All");

    function removeTask(id) {
        setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    function markCompletedTask(taskId) {
        setAllTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: true } : task
            )
        );
    }
    const completedTasks = allTasks.filter((task) => task.status);

    const filteredTasks =
        filter === "Completed"
            ? completedTasks
            : filter === "Active"
            ? allTasks.filter((task) => !task.status)
            : allTasks;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Math.random(),
            taskName: task,
            status: completed,
        };
        setAllTasks([...allTasks, newTask]);
        setTask("");
        setCompleted(false);
    };

    return (
        <div className="max-w-lg m-auto translate-y-[-9rem]">
            <form
                className="flex gap-5 items-center p-4 bg-[#4d5066] rounded-sm mb-3"
                onSubmit={handleSubmit}
            >
                <input
                    type="checkbox"
                    className="mb-0"
                    checked={completed}
                    value={completed}
                    onChange={() => setCompleted(!completed)}
                />
                <input
                    type="text"
                    name=""
                    id=""
                    className="flex-1 rounded-sm py-1 bg-transparent text-white outline-none"
                    placeholder="Create a new to do...."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
            </form>
            {filteredTasks.map((task) => (
                <ListItem
                    key={task.id}
                    task={task}
                    onRemoveTask={removeTask}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    onMarkCompleted={markCompletedTask}
                />
            ))}
            {allTasks.length > 0 && (
                <div className="flex justify-between text-white max-w-lg m-auto p-4 bg-[#4d5066] shadow-2xl">
                    <span>{allTasks.length} items left</span>
                    <div>
                        <button
                            className={
                                filter === "All"
                                    ? "me-2 cursor-pointer font-bold"
                                    : "me-2 cursor-pointer"
                            }
                            onClick={() => setFilter("All")}
                        >
                            All
                        </button>
                        <button
                            className={
                                filter === "Active"
                                    ? "me-2 cursor-pointer font-bold"
                                    : "me-2 cursor-pointer"
                            }
                            onClick={() => setFilter("Active")}
                        >
                            Active
                        </button>
                        <button
                            className={
                                filter === "Completed"
                                    ? "me-2 cursor-pointer font-bold"
                                    : "me-2 cursor-pointer"
                            }
                            onClick={() => setFilter("Completed")}
                        >
                            Completed
                        </button>
                    </div>
                    <button
                        className="cursor-pointer"
                        onClick={() => setAllTasks([])}
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
}
