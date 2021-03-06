const ru = {

  Header: {
    Home: 'Домашняя',
    'Poke Info': 'Поке Инфо',
    'Firm Structure': 'Структура фирмы',
    HeaderContactsText: 'адрес, локация и прочее',
  },

  Description: {
    'Read Less': 'Свернуть',
    'Read More': 'Развернуть',
    descriptionTitle: `Данный проект раскрывает основные понятия git, 
                       node.js, а также затрагивает основы html и css.`,

    titleVcs: 'Что такое система контроля версий и зачем она нужна',
    descriptionVcs: `
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

    titleGit: 'checkout, add, commit, pull, push. Основы ветвления и слияния',
    descriptionGit: `
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

    titleCss: 'Css: стили, классы, идентификаторы, селекторы, псевдоклассы, псевдоэлементы',
    descriptionCss: `
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

    titleHtml: 'Html: теги, структура html страницы, блочные и строчные элементы.',
    descriptionHtml: `
      HTML — стандартизированный язык разметки веб-страниц.
      Списки бывают нумерованные (ol) и маркированные(ul),
      элементы списков – “li”.
      Табличное отображение информации осуществляется с
      помощью тега 'table'.
      Атрибут — используется для определения характеристик
      html-элемента.
      В html имеются теги для форматирования текста.
      W3c – организация, разрабатывающая и внедряющая
      технологические стандарты для Всемирной паутины.
`,

    titleNodejs: 'что такое nodejs, зачем он нужен и как устанавливать',
    descriptionNodejs: `
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

    titleNpm: 'Что такое менеджер пакетов, установка npm',
    descriptionNpm: `
      Менеджер пакетов — набор ПО позволяющего управлять
      процессом установки, удаления, настройки и обновления
      различных компонентов программного обеспечения.
      Npm идет в комплекте с nodejs.
`,
  },

  PokeInfo: {
    'See details': 'Детальнее',
    Description: 'Описание',
    Loading: 'Загрузка',
    Abilities: 'Возможности',
    'Pokemon Details': 'Подробнее о Покемоне',
    Close: 'Закрыть',
  },

  FirmStructure: {
    branches: 'Отделы',
    subBranches: 'Подотделы',
    directors: 'Директоры',
    Add: 'Добавить',
    Remove: 'Удалить',
    Job: 'Должность',
    Surname: 'Фамилия',
    Salary: 'Зарплата',
    Title: 'Название',
    Reset: 'Сбросить',
    'Input item to FirmStruct': 'Добавить запись у "FirmStruct"',
    'Enter job': 'Введите должность',
    'Enter Name': 'Введите Имя',
    'Enter Surname': 'Введите Фамилию',
    'Enter salary': 'Введите зарплату',
    'Branch name': 'Название отдела',
    'Enter branch name': 'Введите название отдела',
  },

  common: {
    Name: 'Имя',
  },

};

export default ru;
