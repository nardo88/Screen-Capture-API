import { classNames } from '@helpers/classNames'
import { FC } from 'react'
import cls from './App.module.scss'

interface App {
  className?: string
}

export const App: FC<App> = ({ className }) => {
  return <div className={classNames(cls.App, {}, [className])}>Hello</div>
}
