import styles from './Info.module.css'

interface InfoProps {
    createdTasks: number,
    completedTasksCounter: number,
}

export function Info({ createdTasks, completedTasksCounter }: InfoProps) {
    return (
        <div className={styles.containerInfo}>
            <div className={styles.createdTasks}>
                <p>Tarefas criadas</p>
                <span>{createdTasks}</span>
            </div>
            <div className={styles.completedTasks}>
                <p>Concluídas</p>
                <span>
                    {createdTasks > 0
                        ? `${completedTasksCounter} de ${createdTasks}`
                        : 0
                    }
                </span>
            </div>
        </div>
    )
}