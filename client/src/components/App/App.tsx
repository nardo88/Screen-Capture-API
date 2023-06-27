import { classNames } from '@helpers/classNames'
import { FC } from 'react'
import cls from './App.module.scss'
import { Navbar } from '@components/Navbar/Navbar'

interface App {
  className?: string
}

export const App: FC<App> = ({ className }) => {
  return (
    <div className={classNames(cls.App, {}, [className])}>
      <div className={cls.container}>
        <Navbar />
      </div>
    </div>
  )
}
