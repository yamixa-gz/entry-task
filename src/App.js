import React from "react"
import "./scss/App.scss"
import logo from "./assets/img/header/logo.png"
import cvs from "./assets/img/descr/cvs.png"
import git from "./assets/img/descr/git.png"
import css from "./assets/img/descr/css.png"
import html from "./assets/img/descr/html.png"
import nodejs from "./assets/img/descr/nodejs.png"
import npm from "./assets/img/descr/npm.png"
import facebook from "./assets/img/footer/facebook.svg"
import dribbble from "./assets/img/footer/dribbble.svg"
import github from "./assets/img/footer/github.svg"

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <header className="header">
          <div className="container">
            <div className="header-wrapper">
              <div className="header-contacts">adress, location and stuff</div>
              <div className="header-menu-row">
                <div className="header-logo">
                  <img src={logo} alt="logo" />
                </div>
                <nav className="header-menu">
                  <ul className="header-nav">
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">AboutUs</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Contacts</a>
                    </li>
                  </ul>
                  <button className="header-search"></button>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="description">
              <div className="description-text">
                Данный проект раскрывает основные понятия git, node.js, а также
                затрагивает основы html и css.
              </div>
              <div className="description-content">
                <div className="card-wrapper">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img src={cvs} alt="cvs" />
                      </div>
                      <div className="card-title">
                        Что такое система контроля версий и зачем она нужна
                      </div>
                      <div className="card-descr">
                        <p>
                          Система контроля версий (VCS – Version Control System)
                          – это система с помощью которой можно фиксировать
                          изменения в файлах, и при необходимости возвращатся к
                          ним.
                        </p>
                        <p>
                          Git – одна из самых популярных распределенных систем.
                          «Распределенность» заключается в том что у каждого
                          разработчика находится полная копия проекта и все
                          сразу могут работать, а на сервере лежит основной
                          репозиторий.
                        </p>
                      </div>
                      <button className="card-btn">Read More</button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img src={git} alt="git" />
                      </div>
                      <div className="card-title">
                        checkout, add, commit, pull, push <br />
                        Основы ветвления и слияния
                      </div>
                      <div className="card-descr">
                        <p>
                          Команда checkout используется с параметрами коммита,
                          ветки и файла. А также с параметрами и без них.
                        </p>
                        <p>
                          - git checkout “branch” – перемещает указатель HEAD на
                          конец заданной ветки.
                        </p>
                        <p>
                          - git add . – добавляет в индекс все файлы текущей
                          директории.
                        </p>
                        <p>
                          - git pull – загружает удаленное содержимое и сразу
                          пытается изменить состояние локального репозитория,
                          чтобы оно соответствовало этому содержимому(выполняет
                          слияние).
                        </p>
                        <p>
                          – git branch “new branch”(без перехода на new branch)
                          или git checkout –b “new branch” (с переходом).
                        </p>
                      </div>
                      <button className="card-btn">Read More</button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img src={nodejs} alt="nodejs" />
                      </div>
                      <div className="card-title">
                        что такое nodejs, зачем он нужен и как устанавливать
                      </div>
                      <div className="card-descr">
                        <p>
                          Node.js — это JavaScript-окружение построенное на
                          движке Chrome V8.
                        </p>
                        <p>
                          Node выполняет действие на сервере. С помощью Node
                          можно писать полноценные приложения. Node умеет
                          работать с внешними библиотеками, вызывать команды из
                          кода на JavaScript и выполнять роль веб-сервера.
                        </p>
                        <p>
                          Для установки необходимо перейти на официальный сайт
                          https://nodejs.org и на главной странице скачать
                          последнюю стабильную версию для своей ОС.
                        </p>
                      </div>
                      <button className="card-btn">Read More</button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img src={npm} alt="npm" />
                      </div>
                      <div className="card-title">
                        Что такое менеджер пакетов, установка npm
                      </div>
                      <div className="card-descr">
                        <p>
                          Менеджер пакетов — набор ПО позволяющего управлять
                          процессом установки, удаления, настройки и обновления
                          различных компонентов программного обеспечения.
                        </p>
                        <p>Npm идет в комплекте с node</p>
                      </div>
                      <button className="card-btn">Read More</button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img src={html} alt="html" />
                      </div>
                      <div className="card-title">
                        Html: теги, структура html страницы, блочные и строчные
                        элементы.
                      </div>
                      <div className="card-descr">
                        <p>
                          HTML — стандартизированный язык разметки веб-страниц.
                        </p>
                        <p>HTML страница должна содержать DOCTYPE и html.</p>
                        <p>
                          Списки бывают нумерованые (ol) и маркированые(ul),
                          элементы списков – “li”.
                        </p>
                        <p>
                          Табличное отображение информации осуществляется с
                          помощью тэга "table".
                        </p>
                        <p>
                          Атрибут — используется для определения характеристик
                          html-элемента.
                        </p>
                        <p>В html имеются теги для форматирования текста.</p>
                        <p>
                          W3c – организация, разрабатывающая и внедряющая
                          технологические стандарты для Всемирной паутины.
                        </p>
                      </div>
                      <button className="card-btn">Read More</button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img src={css} alt="css" />
                      </div>
                      <div className="card-title">
                        Css: стили, классы, идентификаторы, селекторы,
                        псевдоклассы, псевдоэлементы
                      </div>
                      <div className="card-descr">
                        Стили определяют внешний вид html элементов.
                        <p>
                          Связанные – через подключение внешнего файла со
                          стилями.
                          <br />
                          Глобальные – обьявленые в теге "style" <br />
                          Внутренние – обьявленые через атрибут "style" в теге
                        </p>
                        <p>
                          Идентификатор элемента задается через атрибут “id”, и
                          должен быть уникален.
                        </p>
                        <p>
                          Псевдоклассы определяют динамическое состояние
                          элементов, которое изменяется с помощью действий
                          пользователя.
                        </p>
                        <p>
                          Псевдоэлементы позволяют задать стиль элементов не
                          определённых в дереве элементов документа.
                        </p>
                      </div>
                      <button className="card-btn">Read More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-wrapper">
              <div className="footer-content">
                <div className="footer-author">Заниздра Михаил</div>
                <div className="footer-links">
                  <a
                    target="_blank"
                    className="git"
                    href="https://github.com/yamixa-gz"
                  >
                    <img src={github} alt="github" />
                  </a>
                  <a
                    target="_blank"
                    className="dribble"
                    href="https://dribbble.com/shots/14853858-Medisch-Dentist/attachments/6563646?mode=media"
                  >
                    <img src={dribbble} alt="dribbble" />
                  </a>
                  <a
                    target="_blank"
                    className="facebook"
                    href="https://www.facebook.com/profile.php?id=100057592029603"
                  >
                    <img src={facebook} alt="facebook" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
