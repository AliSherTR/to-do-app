export default function ListItem({ task, onRemoveTask, onMarkCompleted }) {
    const { id, taskName, status } = task;

    return (
        <>
            <div className=" max-w-lg m-auto  flex gap-5 items-center p-4 bg-[#4d5066] rounded-sm shadow-2xl mb-2 custom-item">
                <input
                    type="checkbox"
                    checked={status}
                    onChange={() => onMarkCompleted(id)}
                    className=" mb-0 "
                />
                <p
                    className={`${
                        status ? "line-through" : ""
                    } flex-1 rounded-sm py-1 bg-transparent text-white  outline-none  `}
                >
                    {taskName}
                </p>
                <button
                    className="text-white font-sm cursor-pointer"
                    onClick={() => onRemoveTask(id)}
                >
                    &times;
                </button>
            </div>
        </>
    );
}
