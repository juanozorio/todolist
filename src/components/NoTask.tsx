import styles from './NoTask.module.css'
import clipboard from '../assets/clipboard.svg'

export function NoTask() {
    return(
        <div className={styles.containerNoTask}>
            <img className={styles.clipboard} src={clipboard} alt='Área de transferência'/>
            <p className={styles.title}>Você ainda não tem tarefas cadastradas</p>
            <p className={styles.subtitle}>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}