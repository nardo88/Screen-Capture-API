import { classNames } from '@helpers/classNames'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
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
  const refCamera = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const refDesctop = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (streem && refDesctop.current) {
      refDesctop.current.srcObject = streem
    }
  }, [streem])

  const stopCamera = () => {
    if (camera) {
      const tracks = camera?.getTracks()
      tracks?.forEach((item) => item.stop())
      setCamera(null)
    }
  }

  const mute = () => {
    if (camera) {
      const audioTrack = camera.getAudioTracks()[0]
      audioTrack.enabled = false
      setIsMuted(true)
    }
  }

  const unMute = () => {
    if (camera) {
      const audioTrack = camera.getAudioTracks()[0]
      audioTrack.enabled = true
      setIsMuted(false)
    }
  }

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
              <button onClick={isMuted ? unMute : mute}>
                {isMuted ? '&#9785;' : '&#9786;'}
              </button>
            </div>
            <video ref={refCamera} className={cls.video} autoPlay />
          </div>
        )}
      </div>
    </div>
  )
}
