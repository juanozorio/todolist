import { FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './Input.module.css'

import { Info } from './Info'
import { NoTask } from './NoTask'
import { Task } from './Task'

export function Input() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [newTask, setNewTask] = useState<string>('')

    function handleNewTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }

    function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const task: ITask = {
            id: uuidv4(),
            description: newTask,
            isCompleted: false
        }
        
        setNewTask('')
        setTasks([...tasks, task])
    }

    function deleteTask(taskId: string) {
        const newTasksList = tasks.filter(task => task.id !== taskId)
        setTasks(newTasksList)
    }

    function completedTask(taskId: string) {
        const newTasksList = tasks.map(task =>
            task.id === taskId
                ? { ...task, isCompleted: !task.isCompleted }
                : task
        )
        setTasks(newTasksList)
    }

    const taskFieldIsEmpty = newTask.length === 0
    const createdTasksCounter = tasks.length
    const completedTasksCounter = tasks.filter(task => task.isCompleted == true).length

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

            <Info createdTasks={createdTasksCounter} completedTasksCounter={completedTasksCounter} />

            {tasks.length === 0 && <NoTask />}

            {tasks.map(task => (
                <Task key={task.id} task={task} onDeleteTask={deleteTask} onCompletedTask={completedTask} />
            ))}
        </>
    )
}
