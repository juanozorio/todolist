import './global.css'
import styles from './App.module.css'

import logo from './assets/logo.svg'
import { Input } from './components/Input'

function App() {
  return (
    <>
      <header>
        <img src={logo} className={styles.logo} />
      </header>

      <Input />
    </>
  )
}

export default App
