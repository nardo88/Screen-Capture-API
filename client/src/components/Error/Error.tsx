import { classNames } from '@helpers/classNames'
import { FC } from 'react'
import cls from './Error.module.scss'

interface Error {
  className?: string
  error: string
}

export const Error: FC<Error> = ({ className, error }) => {
  return <div className={classNames(cls.Error, {}, [className])}>{error}</div>
}
