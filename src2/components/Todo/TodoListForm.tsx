import React, { useState } from "react";

import TodoItem, { Todo } from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoListForm = (): JSX.Element => {

    const [statuses, setStatuses] = useState([
        "All",
        "Incomplete",
        "Progress",
        "Done",
    ]);

	const [todoItemList, setTodoList] = useState<Todo[]>([
		{
			title: "タイトル",
			content: "TODO内容はここに記載します。",
			status: "Done",
		},
		{
			title: "タイトル2",
			content: "TODO内容の二番目",
			status: "Progress",
		},
		{
			title: "タイトル3",
			content: "TODO内容の3番目",
			status: "Incomplete",
		},
	]);

	const addTodoOnClick = (todo: Todo) => {
		// const newTodoList = todoItemList.slice();
		const newTodoList = [...todoItemList];

		newTodoList.push(todo);
		setTodoList(newTodoList);
		console.log("追加");
	};

	return (
        <>
            {/* flexとspace-x-*を使用してアイテムを横一列に並べ、間にスペースを追加 */}
            <div className="flex space-x-4 justify-center">
                {statuses.map((status, i) => {
                    // filterを使用してTodoListの状態に応じてフィルタリングする
                    const filteredTodoList = todoItemList.filter(
                        // statusが"All"の場合はフィルタリングしない
                        (item) => status === "All" || item.status === status
                    );
    
                    return (
                        <div key={i} className="flex flex-col mx-2 px-4 py-2 rounded-lg bg-gray-200">
                            {/* statusに対応したタグを設置 */}
                            <span className="inline-flex items-center py-1.5 px-3 mb-1 rounded-full text-xs font-medium bg-gray-500 text-white">
                                {status}
                            </span>
                            {/* filterしたTodoListをmapで回してTodoを描画 */}
                            {filteredTodoList.map((todo, j) => (
                                <div key={j} className="mb-2">
                                    <TodoItem {...todo} />
                                </div>
                            ))}
                            {/* statusがAllの時だけTodoFormを設置 */}
                            {status === "All" && <TodoForm addTodoOnclick={addTodoOnClick} />}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TodoListForm;

