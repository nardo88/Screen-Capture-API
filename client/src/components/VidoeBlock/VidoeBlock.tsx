import { classNames } from '@helpers/classNames'
import { FC, useEffect, useRef } from 'react'
import cls from './VidoeBlock.module.scss'

interface VidoeBlock {
  className?: string
  streem: null | MediaStream
}

export const VidoeBlock: FC<VidoeBlock> = ({ className, streem }) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (streem && ref.current) {
      ref.current.srcObject = streem
    }
  }, [streem])

  return (
    <div className={classNames('', {}, [className])}>
      <h4>Translation</h4>
      {streem && <video ref={ref} className={cls.video} autoPlay></video>}
    </div>
  )
}
