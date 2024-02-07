import { HandsClapping, Trash } from 'phosphor-react'
import styles from './styles.module.css'
import Avatar from '../Avatar'
import { useState } from 'react'

interface CommentProps {
  content: string,
  onDeleteComment: (comment: string) => void
}

export default function Comment({content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleLikeComment(){
    setLikeCount((state) => {
      return state + 1;
    })
  }

  function handleDeleteComment(){

    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/devon.png" alt='imagem de perfil'/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Devon Marlon</strong>
              <time title='11 de janeiro as 17:34' dateTime='2024-01-23 17:34:29'>Comentado há 1h</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={22}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <HandsClapping />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}