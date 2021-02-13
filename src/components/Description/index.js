import React, {Component} from 'react'
import s from './style.module.scss'
import git from '../../assets/img/description/git.png'
import cvs from '../../assets/img/description/cvs.png'
import nodejs from '../../assets/img/description/nodejs.png'
import npm from '../../assets/img/description/npm.png'
import html from '../../assets/img/description/html.png'
import css from '../../assets/img/description/css.png'
import Card from "./Card";

class Description extends Component {
  cvsTitle = 'Что такое система контроля версий и зачем она нужна'
  gitTitle = 'checkout, add, commit, pull, push. Основы ветвления и слияния'
  cssTitle = 'Css: стили, классы, идентификаторы, селекторы, псевдоклассы, псевдоэлементы'
  htmlTitle = 'Html: теги, структура html страницы, блочные и строчные элементы.'
  nodejsTitle = 'что такое nodejs, зачем он нужен и как устанавливать'
  npmTitle = 'Что такое менеджер пакетов, установка npm'

  cvsTextContent = `
      Система контроля версий (VCS – Version Control System)
      – это система с помощью которой можно фиксировать
      изменения в файлах, и при необходимости возвращатся к
      ним.

      Git – одна из самых популярных распределенных систем.
      «Распределенность» заключается в том что у каждого
      разработчика находится полная копия проекта и все
      сразу могут работать, а на сервере лежит основной
      репозиторий.
`
  gitTextContent = `
      Команда checkout используется с параметрами коммита,
      ветки и файла. А также с параметрами и без них.
      
      - git checkout “branch” – перемещает указатель HEAD на
      конец заданной ветки.

      - git add . – добавляет в индекс все файлы текущей
      директории.

      - git pull – загружает удаленное содержимое и сразу
      пытается изменить состояние локального репозитория,
      чтобы оно соответствовало этому содержимому(выполняет
      слияние).

      – git branch “new branch”(без перехода на new branch)
      или git checkout –b “new branch” (с переходом).
`
  cssTextContent = `
    Стили определяют внешний вид html элементов.

      Связанные – через подключение внешнего файла со
      стилями.
      
      Глобальные – обьявленые в теге 'style' 
      Внутренние – обьявленые через атрибут 'style' в теге

      Идентификатор элемента задается через атрибут “id”, и
      должен быть уникален.

      Псевдоклассы определяют динамическое состояние
      элементов, которое изменяется с помощью действий
      пользователя.

      Псевдоэлементы позволяют задать стиль элементов не
      определённых в дереве элементов документа.
`
  htmlTextContent = `
      HTML — стандартизированный язык разметки веб-страниц.

     страница должна содержать DOCTYPE и html.
   
      Списки бывают нумерованые (ol) и маркированые(ul),
      элементы списков – “li”.


      Табличное отображение информации осуществляется с
      помощью тэга 'table'.

      Атрибут — используется для определения характеристик
      html-элемента.

      В html имеются теги для форматирования текста.

      W3c – организация, разрабатывающая и внедряющая
      технологические стандарты для Всемирной паутины.
`
  nodejsTextContent = `
      Node.js — это JavaScript-окружение построенное на
      движке Chrome V8.

      Node выполняет действие на сервере. С помощью Node
      можно писать полноценные приложения. Node умеет
      работать с внешними библиотеками, вызывать команды из
      кода на JavaScript и выполнять роль веб-сервера.

      Для установки необходимо перейти на официальный сайт
      https://nodejs.org и на главной странице скачать
      последнюю стабильную версию для своей ОС.
`
  npmTextContent = `
      Менеджер пакетов — набор ПО позволяющего управлять
      процессом установки, удаления, настройки и обновления
      различных компонентов программного обеспечения.

      Npm идет в комплекте с node
`

  descriptionTitle = 'Данный проект раскрывает основные понятия git, node.js, а также затрагивает основы html и css.'

  state = {
    openCardId: null
  }
  clickHandler = (id) => {
    this.setState({
      openCardId: this.state.openCardId === id ? null : id
    })
  }
  makeShortTextForCardContent = (fullText, symbolsAmount = 140) => {
    let shortText = ''
    if (fullText.length < symbolsAmount) {
      return fullText
    } else {
      shortText = fullText.slice(0, symbolsAmount) + '...'
    }
    return shortText
  }

  render() {
    return (
        <div className={s.description}>
          <div className={s.descriptionTitle}>
            {this.descriptionTitle}
          </div>
          <div className={s.descriptionContent}>
            <div className={s.descriptionCardWrapper}>
              <Card id={1} title={this.cvsTitle} fullTextContent={this.cvsTextContent} img={cvs}
                    openCardId={this.state.openCardId} clickHandler={this.clickHandler}
                    makeShortTextForCardContent={this.makeShortTextForCardContent}/>
              <Card id={2} title={this.gitTitle} fullTextContent={this.gitTextContent} img={git}
                    openCardId={this.state.openCardId} clickHandler={this.clickHandler}
                    makeShortTextForCardContent={this.makeShortTextForCardContent}/>
              <Card id={3} title={this.cssTitle} fullTextContent={this.cssTextContent} img={css}
                    openCardId={this.state.openCardId} clickHandler={this.clickHandler}
                    makeShortTextForCardContent={this.makeShortTextForCardContent}/>
              <Card id={4} title={this.htmlTitle} fullTextContent={this.htmlTextContent} img={html}
                    openCardId={this.state.openCardId} clickHandler={this.clickHandler}
                    makeShortTextForCardContent={this.makeShortTextForCardContent}/>
              <Card id={5} title={this.nodejsTitle} fullTextContent={this.nodejsTextContent} img={nodejs}
                    openCardId={this.state.openCardId} clickHandler={this.clickHandler}
                    makeShortTextForCardContent={this.makeShortTextForCardContent}/>
              <Card id={6} title={this.npmTitle} fullTextContent={this.npmTextContent} img={npm}
                    openCardId={this.state.openCardId} clickHandler={this.clickHandler}
                    makeShortTextForCardContent={this.makeShortTextForCardContent}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Description