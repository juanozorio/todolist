import styles from './Task.module.css'

interface TaskProps {
    task: ITask
    onDeleteTask: (taskId: string) => void
    onCompletedTask: (taskId: string) => void
}

export function Task({ task, onDeleteTask, onCompletedTask }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(task.id)
    }

    function handleCompletedTask() {
        onCompletedTask(task.id)
    }

    return (
        <div className={`${styles.container} ${task.isCompleted ? styles.opacity : ''}`}>
            <input onClick={handleCompletedTask} type="checkbox" className={styles.checkbox} />
            <p className={styles.content}>{task.description}</p>
            <span onClick={handleDeleteTask} className={`${'material-symbols-outlined'} ${styles.delete}`}>
                delete
            </span>
        </div>
    )
}