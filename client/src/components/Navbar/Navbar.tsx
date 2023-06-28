import { classNames } from '@helpers/classNames'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import cls from './Navbar.module.scss'
import { Error } from '@components/Error/Error'

interface Navbar {
  className?: string
  setStreem: Dispatch<SetStateAction<MediaStream | null>>
  streem: MediaStream | null
}

interface IMediaOptions {
  echoCancellation: boolean // эхоподавление
  noiseSuppression: boolean // функция подавления шума
  sampleRate: number // частота дискретизации звука (в идеале 44,1 кГц - 44100)
}

interface IOptions {
  audio?: boolean | IMediaOptions // default - false
  video?: boolean | IMediaOptions // default - true
  cursor?: 'always' | 'motion' | 'never' // Указывает, следует ли захватывать курсор мыши
}

export const Navbar: FC<Navbar> = ({ className, setStreem, streem }) => {
  const [error, setError] = useState<null | string>(null)

  async function startCapture(displayMediaOptions: IOptions) {
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      )
      setStreem(captureStream)
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
      <button
        onClick={() =>
          startCapture({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              sampleRate: 44100,
            },
            cursor: 'always',
            video: true,
          })
        }
        className={cls.button}>
        start capture
      </button>
      <button onClick={stopCapture} className={cls.button}>
        stop capture
      </button>
      {error && <Error error={error} />}
    </div>
  )
}
