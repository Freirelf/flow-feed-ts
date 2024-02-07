import Avatar from '../Avatar'
import styles from './styles.module.css'
import { PencilLine } from 'phosphor-react'

export default function Sidebar() {
  return (
    <>
      <aside className={styles.sidebar}>
        <img 
          className={styles.cover} 
          src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=40&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>

        <div className={styles.profile}>
          <Avatar src="https://github.com/Freirelf.png" alt="Imagem de perfil"/>
          <strong>Lucas Freire</strong>
          <span>Web developer</span>
        </div>

        <footer>
          <a href="#">
            <PencilLine size={20}/>
            Editar seu perfil
          </a>
        </footer>

      </aside>
    </>
  )
}