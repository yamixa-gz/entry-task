import React from 'react'
import s from '../scss/Preloader.module.scss'
import preloaderImg from '../../../assets/images/FetchedDataTable/preloader_linear.svg'

const Preloader = () => <div className={s.preloaderImg}>
  <img src={preloaderImg} alt='Loading...'/>
</div>

export default Preloader