import { createSlice } from '@reduxjs/toolkit'
import { Todo } from '@/features/todo/types'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [
      {
        id: '1',
        title: 'テスト１',
        content: 'TODO内容の1番目',
        status: 'Done',
      },
      {
        id: '2',
        title: 'テスト２',
        content: 'TODO内容の2番目',
        status: 'Progress',
      },
      {
        id: '3',
        title: 'テスト３',
        content: 'TODO内容の3番目',
        status: 'Incomplete',
      },
      {
        id: '4',
        title: 'テスト４',
        content: 'TODO内容の4番目',
        status: 'Progress',
      },
      {
        id: '5',
        title: 'テスト５',
        content: 'DONE',
        status: 'Done',
      },
    ],
  },
  reducers: {
    setTodos: (state, action) => {
      const newTodos: Todo[] = action.payload
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
      state.todos = newTodos.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
    },
    updateTodo: (state, action) => {
      const updateTodo = action.payload
      const updatedTodos = state.todos.map((todo) => (todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo))
      state.todos = updatedTodos
    },
    addTodo: (state, action) => {
      const newTodo = action.payload
      newTodo.id = (state.todos.length + 1).toString()
      state.todos.push(newTodo)
    },
    removeTodoById: (state, action) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload)
      // 番号を振りなおす(AddTodoでは配列数+1のidが割り振られるため欠番があると重複する)
      state.todos = newTodos.map((todo, index) => {
        return {
          ...todo,
          id: (index + 1).toString(),
        }
      })
    },
  },
})

export const { setTodos, updateTodo, addTodo, removeTodoById } = todoSlice.actions

export default todoSlice.reducer
