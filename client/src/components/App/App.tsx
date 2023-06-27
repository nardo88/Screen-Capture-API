import { classNames } from '@helpers/classNames'
import { FC, useState } from 'react'
import cls from './App.module.scss'
import { Navbar } from '@components/Navbar/Navbar'
import { VidoeBlock } from '@components/VidoeBlock/VidoeBlock'

interface App {
  className?: string
}

export const App: FC<App> = ({ className }) => {
  const [streem, setStreem] = useState<null | MediaStreamTrack>(null)

  return (
    <div className={classNames(cls.App, {}, [className])}>
      <div className={cls.container}>
        <Navbar setStreem={setStreem} />
        <VidoeBlock streem={streem} />
      </div>
    </div>
  )
}
