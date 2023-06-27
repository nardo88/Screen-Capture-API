import { classNames } from '@helpers/classNames'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import cls from './Navbar.module.scss'
import { Error } from '@components/Error/Error'

interface Navbar {
  className?: string
  setStreem: Dispatch<SetStateAction<MediaStreamTrack | null>>
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

export const Navbar: FC<Navbar> = ({ className, setStreem }) => {
  const [error, setError] = useState<null | string>(null)

  async function startCapture(displayMediaOptions: IOptions) {
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      )
      setStreem(captureStream.getVideoTracks()[0])
    } catch (error) {
      setError(error as string)
    }
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
            .then((data) => {
              console.log('data: ', data)
            })
            .catch((error) => {
              console.error('error: ', error)
            })
        }
        className={cls.button}>
        start capture
      </button>
      <button className={cls.button}>stop capture</button>
      {error && <Error error={error} />}
    </div>
  )
}
