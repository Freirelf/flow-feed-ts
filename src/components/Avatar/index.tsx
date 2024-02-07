import { ImgHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean,
}

export default function Avatar({ hasBorder = true, ...props}:AvatarProps) {

  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      {...props}
    />
  )
}