import Avatar from '../Avatar'
import Comment from '../Comment'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState<string[]>([])

  const [newCommentText, setNewCommentText ]= useState('')

  const publishedAtDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR.ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR.ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value)

    event.target.setCustomValidity('')
  }

  function handleNewCommentChangeRequired(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório")
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsWithoutDeleteOne)
  }

  const isNewCommentEmpty = newCommentText.length == 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} alt="Imagem de perfil"/>
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedAtDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>
        <div className={styles.content}>
          {post.content.map(item => {
            if (item.type === 'paragraph') {
              return <p key={item.content}>{item.content}</p>
            } else if (item.type === 'link') {
              return <p key={item.content}><a href="">{item.content}</a></p>
            }
          })}
        </div>

        <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>

          <textarea 
            name='comment'
            placeholder='Deixe um comentário'
            value={newCommentText}
            onChange={handleNewCommentChange}
            required
            onInvalid={handleNewCommentChangeRequired}
          />

          <footer>
            <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
          </footer>
        
        </form>

        {comments.length > 0 && ( 
          <div className={styles.commentList}>
            {comments.map(comment => {
              return <Comment content={comment} key={comment} onDeleteComment={deleteComment} />
            })}
          </div>
        )}

    </article>
  )
}

