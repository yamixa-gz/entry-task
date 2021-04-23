import React, { Component } from 'react';
import uuid from 'react-uuid';
import s from './scss/Description.module.scss';
import vcs from '../../assets/images/Description/cvs.png';
import git from '../../assets/images/Description/git.png';
import nodejs from '../../assets/images/Description/nodejs.png';
import npm from '../../assets/images/Description/npm.png';
import html from '../../assets/images/Description/html.png';
import css from '../../assets/images/Description/css.png';
import Card from './components/Card';
import Layout from '../../layout/Layout';

class Description extends Component {
  cards = [
    {
      id: uuid(),
      title: 'Что такое система контроля версий и зачем она нужна',
      img: vcs,
      description: `
      Система контроля версий (VCS – Version Control System)
      – это система с помощью которой можно фиксировать
      изменения в файлах, и при необходимости возвращатся к
      ним.
      Git – одна из самых популярных распределенных систем.
      «Распределенность» заключается в том что у каждого
      разработчика находится полная копия проекта и все
      сразу могут работать, а на сервере лежит основной
      репозиторий.
`,
    },
    {
      id: uuid(),
      title: 'checkout, add, commit, pull, push. Основы ветвления и слияния',
      img: git,
      description: `
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
`,
    },
    {
      id: uuid(),
      title: 'Css: стили, классы, идентификаторы, селекторы, псевдоклассы, псевдоэлементы',
      img: css,
      description: `
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
`,
    },
    {
      id: uuid(),
      title: 'Html: теги, структура html страницы, блочные и строчные элементы.',
      img: html,
      description: `
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
`,
    },
    {
      id: uuid(),
      title: 'что такое nodejs, зачем он нужен и как устанавливать',
      img: nodejs,
      description: `
      Node.js — это JavaScript-окружение построенное на
      движке Chrome V8.

      Node выполняет действие на сервере. С помощью Node
      можно писать полноценные приложения. Node умеет
      работать с внешними библиотеками, вызывать команды из
      кода на JavaScript и выполнять роль веб-сервера.

      Для установки необходимо перейти на официальный сайт
      https://nodejs.org и на главной странице скачать
      последнюю стабильную версию для своей ОС.
`,
    },
    {
      id: uuid(),
      title: 'Что такое менеджер пакетов, установка npm',
      img: npm,
      description: `
      Менеджер пакетов — набор ПО позволяющего управлять
      процессом установки, удаления, настройки и обновления
      различных компонентов программного обеспечения.
      Npm идет в комплекте с node
`,
    },
  ]

  descriptionTitle = 'Данный проект раскрывает основные понятия git, node.js, а также затрагивает основы html и css.'

  constructor(props) {
    super(props);
    this.state = {
      openCardId: null
    };
  }

  clickHandler = (id) => {
    this.setState((state) => ({
      openCardId: state.openCardId === id ? null : id
    }));
  }

  makeShortTextForCardContent = (fullText, symbolsAmount = 140) => {
    return fullText.length < symbolsAmount
      ? fullText
      : `${fullText.slice(0, symbolsAmount)}...`;
  }

  render() {
    const { openCardId } = this.state;
    const { Header, Footer } = Layout();
    const cardsList = this.cards.map((item) => (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        img={item.img}
        isOpen={openCardId === item.id}
        clickHandler={this.clickHandler}
        makeShortTextForCardContent={this.makeShortTextForCardContent}
      />
    ));
    return (
      <>
        <Header toggleLanguage={() => {
        }}
        />
        <div className="content">
          <div className="app-container">
            <div className={s.description}>
              <div className={s.descriptionTitle}>
                {this.descriptionTitle}
              </div>
              <div className={s.descriptionContent}>
                <div className={s.descriptionCardWrapper}>
                  {cardsList}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Description;
