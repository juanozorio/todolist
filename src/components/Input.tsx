import { FormEvent, useCallback, useEffect, useState } from 'react'
import styles from './Input.module.css'

import { Info } from './Info'
import { NoTask } from './NoTask'
import { Task } from './Task'
import { ITask } from '../interfaces/Task'
import { createTask, listTasks, updateTask } from '../services/api'

export function Input() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [newTask, setNewTask] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTasks = useCallback(async () => {
        try {
            setError(null)
            const data = await listTasks()
            setTasks(data ?? [])
        } catch (err) {
            console.error('Failed to fetch tasks:', err)
            setError('Não foi possível carregar as tarefas.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    function handleNewTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }

    async function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            setError(null)
            const created = await createTask({ description: newTask })
            setNewTask('')
            setTasks(prev => [...prev, created])
        } catch (err) {
            console.error('Failed to create task:', err)
            setError('Não foi possível criar a tarefa.')
        }
    }

    async function deleteTask(taskId: string) {
        // Backend doesn't have DELETE endpoint yet — toggle as completed
        // For now we remove from local state. When backend adds DELETE,
        // this can be updated to call the API.
        const newTasksList = tasks.filter(task => task.id !== taskId)
        setTasks(newTasksList)
    }

    async function completedTask(taskId: string) {
        const task = tasks.find(t => t.id === taskId)
        if (!task) return

        try {
            setError(null)
            const updated = await updateTask(taskId, {
                isCompleted: !task.isCompleted,
            })
            setTasks(prev =>
                prev.map(t => (t.id === taskId ? updated : t)),
            )
        } catch (err) {
            console.error('Failed to update task:', err)
            setError('Não foi possível atualizar a tarefa.')
        }
    }

    const taskFieldIsEmpty = newTask.length === 0
    const createdTasksCounter = tasks.length
    const completedTasksCounter = tasks.filter(task => task.isCompleted === true).length

    return (
        <>
            <form onSubmit={handleCreateNewTask} className={styles.containerInput}>
                <input
                    name='task'
                    className={styles.task}
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleNewTaskChange}
                    value={newTask}
                    required
                />

                <button type='submit' className={styles.button} disabled={taskFieldIsEmpty}>
                    Criar
                    <span className='material-symbols-outlined'>
                        add_circle
                    </span>
                </button>
            </form>

            {error && (
                <div className={styles.error}>
                    <span className='material-symbols-outlined'>error</span>
                    {error}
                </div>
            )}

            <Info createdTasks={createdTasksCounter} completedTasksCounter={completedTasksCounter} />

            {loading && <p className={styles.loading}>Carregando tarefas...</p>}

            {!loading && tasks.length === 0 && <NoTask />}

            {tasks.map(task => (
                <Task key={task.id} task={task} onDeleteTask={deleteTask} onCompletedTask={completedTask} />
            ))}
        </>
    )
}
