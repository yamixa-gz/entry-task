import React from 'react'
import s from './preloader.module.css'
import preloaderImg from '../Preloader/preloader_linear.svg'

const Preloader = () => <div className={s.preloaderImg}>
  <img src={preloaderImg} alt='Loading...'/>
</div>

export default Preloader