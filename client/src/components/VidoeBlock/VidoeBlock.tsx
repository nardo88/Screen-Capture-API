import { classNames } from '@helpers/classNames'
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import cls from './VidoeBlock.module.scss'

interface VidoeBlock {
  className?: string
  streem: null | MediaStream
  camera: null | MediaStream
  setCamera: Dispatch<SetStateAction<MediaStream | null>>
}

export const VidoeBlock: FC<VidoeBlock> = ({
  className,
  streem,
  camera,
  setCamera,
}) => {
  const refDesctop = useRef<HTMLVideoElement>(null)
  const refCamera = useRef<HTMLVideoElement>(null)

  const stopCamera = () => {
    if (camera) {
      const tracks = camera?.getTracks()
      tracks?.forEach((item) => item.stop())
      setCamera(null)
    }
  }

  useEffect(() => {
    if (streem && refDesctop.current) {
      refDesctop.current.srcObject = streem
    }
  }, [streem])

  useEffect(() => {
    if (camera && refCamera.current) {
      refCamera.current.srcObject = camera
    }
  }, [camera])

  return (
    <div className={classNames('', {}, [className])}>
      <h4>Translation</h4>
      <div className={cls.videoWrapper}>
        <video controls ref={refDesctop} className={cls.video} autoPlay />
        {camera && (
          <div className={cls.CameraWrapper}>
            <div className={cls.controlPanel}>
              <button onClick={stopCamera}>X</button>
            </div>
            <video ref={refCamera} className={cls.video} autoPlay />
          </div>
        )}
      </div>
    </div>
  )
}
