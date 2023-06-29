import { classNames } from '@helpers/classNames'
import { FC, useState } from 'react'
import cls from './App.module.scss'
import { Navbar } from '@components/Navbar/Navbar'
import { VidoeBlock } from '@components/VidoeBlock/VidoeBlock'

interface App {
  className?: string
}

export const App: FC<App> = ({ className }) => {
  const [streem, setStreem] = useState<null | MediaStream>(null)
  const [camera, setCamera] = useState<null | MediaStream>(null)

  return (
    <div className={classNames(cls.App, {}, [className])}>
      <div className={cls.container}>
        <Navbar
          setStreem={setStreem}
          streem={streem}
          camera={camera}
          setCamera={setCamera}
        />
        <VidoeBlock streem={streem} camera={camera} setCamera={setCamera} />
      </div>
    </div>
  )
}
