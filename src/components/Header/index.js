import React, {Component} from 'react'
import logo from '../../assets/img/header/logo.png'
import s from './style.module.scss'


class Header extends Component {
  render() {
    return (
        <header className={s.header}>
          <div className='app-container'>
            <div className={s.headerWrapper}>
              <div className={s.headerContacts}>adress, location and stuff</div>
              <div className={s.headerMenuRow}>
                <div className={s.headerLogo}>
                  <img src={logo} alt='logo'/>
                </div>
                <nav className={s.headerMenu}>
                  <ul className={s.headerNav}>
                    <li>
                      <a href='/'>Home</a>
                    </li>
                    <li>
                      <a href='/'>AboutUs</a>
                    </li>
                    <li>
                      <a href='/'>Blog</a>
                    </li>
                    <li>
                      <a href='/'>Contacts</a>
                    </li>
                  </ul>
                  <button className={s.headerSearch}/>
                </nav>
              </div>
            </div>
          </div>
        </header>
    )
  }
}

export default Header