import { classNames } from '@helpers/classNames'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import cls from './Navbar.module.scss'
import { Error } from '@components/Error/Error'

interface Navbar {
  className?: string
  setStreem: Dispatch<SetStateAction<MediaStream | null>>
  streem: MediaStream | null
  camera: MediaStream | null
  setCamera: Dispatch<SetStateAction<MediaStream | null>>
}

interface IMediaOptions {
  echoCancellation: boolean // эхоподавление
  noiseSuppression: boolean // функция подавления шума
  sampleRate: number // частота дискретизации звука (в идеале 44,1 кГц - 44100)
}

interface IOptions extends DisplayMediaStreamOptions {
  audio?: boolean | IMediaOptions // default - false
  video?: boolean | IMediaOptions // default - true
  cursor?: 'always' | 'motion' | 'never' // Указывает, следует ли захватывать курсор мыши
}

const constraints = {
  video: true,
  // audio: true,
}

const otions: IOptions = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
  video: true,
  cursor: 'always', // без него работает
}

export const Navbar: FC<Navbar> = ({
  className,
  setStreem,
  streem,
  setCamera,
}) => {
  const [error, setError] = useState<null | string>(null)

  async function startCapture() {
    try {
      setStreem(null)
      const captureStream = await navigator.mediaDevices.getDisplayMedia(otions)
      setStreem(captureStream)
    } catch (error: any) {
      setError(error.message as string)
    }
  }

  async function startWebCamera() {
    try {
      setCamera(null)
      const streamCamera = await navigator.mediaDevices.getUserMedia(
        constraints
      )
      setCamera(streamCamera)
    } catch (error) {
      setError(error as string)
    }
  }

  function stopCapture() {
    const tracks = streem?.getTracks()
    tracks?.forEach((item) => item.stop())
    setStreem(null)
  }
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <button onClick={startCapture} className={cls.button}>
        start desctop
      </button>
      <button onClick={startWebCamera} className={cls.button}>
        start web camera
      </button>
      <button onClick={stopCapture} className={cls.button}>
        stop capture
      </button>

      {error && (
        <div className={cls.ErrorBlock}>
          <h2>Возникла ошибка</h2>
          <Error error={error} />
        </div>
      )}
    </div>
  )
}
