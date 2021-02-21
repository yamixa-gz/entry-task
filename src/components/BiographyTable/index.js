import React, {Component, createRef} from 'react'
import {Table, Container, Button, FormControl} from 'react-bootstrap'
import BiographyTableRow from './BiographyTableRow'
import classNames from 'classnames/bind'
import uuid from 'react-uuid'
import s from './style.module.scss'

const cx = classNames.bind(s)

class BiographyTable extends Component {
  dateInput = createRef()
  descriptionInput = createRef()
  biographyData = [
    `${uuid()}-**-1971-**-Год рождения Илона Маска в Претории (ЮАР).
     Мать — Мей Маск, была моделью и известным диетологом.
     Отец — Эррол Маск, — пилот, моряк и инженер. Зарабатывал консультациями.`,
    `${uuid()}-**-2006-**-Состоялся первый для компании запуск ракеты-носителя Falcon 1, но он завершился аварией. 
    Однако в том же году компания SpaceX стала одним из победителей в конкурсе НАСА Commercial Orbital Transportation Services (COTS), 
    получив суммарное финансирование в размере 396 млн долларов, для разработки и демонстрации ракеты-носителя Falcon 9 и корабля Dragon.`,
    `${uuid()}-**-2012-**-Была запущена революционная сеть супер-заправок для путешествия на дальние дистанции.`,
    `${uuid()}-**-1981-**-Когда Илону Маску было 10 лет, он получил в подарок первый компьютер Commodore VIC-20, который
     использовал для программирования, уже в 12 лет он продал за 500 долларов свою первую программу, игру
      Blastar, в которой можно было стрелять по инопланетянам из лазерной пушки.`,
    `${uuid()}-**-2000-**-Произошло слияние компаний X.com и Confinity, тем самым объединились системы X.com и PayPal. 
    Маск требовал для нового образования бренд X.com вместо PayPal. Это вызвало разногласия внутри организации, 
    и Илон по решению Совета директоров ушел в отставку.`,
    `${uuid()}-**-2010-**-Дальнейшими достижениями SpaceX стали: запуск корабля Dragon, который был выведен на орбиту и возвращен на Землю, 
    первая в истории посадка первой ступени на землю, выполненная после вывода полезной нагрузки на околоземную орбиту`,
    `${uuid()}-**-1992-**-Маск переехал в США и поступил в Пенсильванский университет, где получил степень
     бакалавра наук по физике колледжа искусств и наук, а также степень бакалавра по экономике Уортон школы
      бизнеса. Со временем перешел в Стэнфорд, но обучение не закончил.`,
    `${uuid()}-**-1999-**-Илон Маск стал одним из основателей X.com (вложив 12 млн собственных сбережений),
     намереваясь сделать революцию в сфере банковских платежей.`,
    `${uuid()}-**-2000-**-Илон Маск женился на девушке Джастин, которая вместе с ним училась в университете`,
    `${uuid()}-**-2002-**-Илон Маск снова сделал верный ход. Компания PayPal была куплена eBay за 1,5 млрд долларов,
    а Илон за свои 11,7% акций получил 175 млн долларов.`,
    `${uuid()}-**-2002-**-Маск основал свою третью компанию — SpaceX. Эта компания Илона связана с космическими разработками, 
     целью ее создания было сокращение расходов на полеты в космос, способствование его освоению и в частности, будущая колонизация Марса.`,
    `${uuid()}-**-2019-**-Тяжелая ракета Falcon Heavy успешно вывела на орбиту спутник связи.`,
    `${uuid()}-**-2008-**-Состоялся первый успешный запуск ракеты-носителя Falcon 1 и вывод полезной нагрузки на орбиту. 
    Благодаря энергичным действиям Илона Маска, в компании разработаны два типа потенциально многократных ракет-носителей: 
    Falcon 1 и Falcon 9, а также многоразовый космический корабль Dragon.`,
    `${uuid()}-**-2017-**-Власти США выдали Илону Маску разрешение на начало работ по строительству тоннеля между Нью-Йорком и Вашингтоном для реализации проекта Hyperloop. 
    Бизнесмен обещает, что его проект поможет жителям этих двух городов преодолевать расстояние в 250 км между ними менее чем за полчаса.`,
    `${uuid()}-**-1996-**-Zip2 — первая компания, которую организовали совместно братья Маск. Они занимались производством программного обеспечения. 
    Их проектом был цифровой аналог «Жёлтых страниц», с помощью которого в любом районе 
    Сан-Франциско можно было найти ближайшую пиццерию.`,
    `${uuid()}-**-2010-**-Маск появился в фильме «Железный человек 2» в роли самого себя (по сюжету Илон — приятель Тони Старка).`,
    `${uuid()}-**-2003-**-Илон организовал компанию, которую назвал в честь Николы Теслы «Tesla Motors». 
    Сферой деятельности этой компании является создание экологически чистых электромобилей.`,
    `${uuid()}-**-2016-**-Вышла новость, что корабль Red Dragon («Красный дракон») компании SpaceX не позднее 2018 года полетит на Марс.`,
    `${uuid()}-**-2018-**-SpaceX осуществила успешный старт сверхтяжёлой ракеты-носителя Falcon Heavy, выведшей на гелиостационарную 
    орбиту ярко-красный автомобиль Tesla Roadster из личной коллекции Маска с макетом человека в скафандре на водительском кресле.`,
  ]
  state = {
    sortDirection: '', //one of these -> '', ascending, descending
    biographyDataArrChanged: false
  }
  ascendingSort = (prevEl, nextEl) => +prevEl.split('-**-')[1] - +nextEl.split('-**-')[1]
  descendingSort = (prevEl, nextEl) => +nextEl.split('-**-')[1] - +prevEl.split('-**-')[1]
  selectionSort = (sortingArr, sortDirection) => {
    if (!sortDirection) return sortingArr
    let arr = sortingArr.slice()
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        sortDirection === 'ascending'
        && (+arr[j].split('-**-')[1] < +arr[i].split('-**-')[1])
        && ([arr[i], arr[j]] = [arr[j], arr[i]])

        sortDirection === 'descending'
        && (+arr[j].split('-**-')[1] > +arr[i].split('-**-')[1])
        && ([arr[i], arr[j]] = [arr[j], arr[i]])
      }
    }
    return arr
  }
  sortClickHandler = () => {
    let setSortDirection
    switch (this.state.sortDirection) {
      case 'ascending':
        setSortDirection = 'descending'
        break
      case 'descending':
        setSortDirection = ''
        break
      case '':
        setSortDirection = 'ascending'
        break
      default:
        setSortDirection = ''
    }
    this.setState({
      ...this.state, sortDirection: setSortDirection,
    })
  }
  addDataToBiographyArrHandler = () => {
    const year = this.dateInput.current.value
    const text = this.descriptionInput.current.value
    if (isNaN(parseInt(year)) || year.length > 10 || text.length < 5) {
      console.error('Please input valid data!')
    } else {
      this.biographyData.push(`${uuid()}-**-${parseInt(year) + ''}-**-${text}`)
      this.dateInput.current.value = ''
      this.descriptionInput.current.value = ''
      this.setState({
        ...this.state, biographyDataArrChanged: true
      })
    }
  }
  removeDataFromBiographyArrHandler = () => {
    this.biographyData.length && this.biographyData.length--;
    this.setState({
      ...this.state, biographyDataArrChanged: true
    })
  }

  render() {
    const sortDirection = this.state.sortDirection

    // use inherit sort method
    // const biographyDataList = (sortDirection
    //     ? this.biographyData.slice()
    //         .sort(sortDirection === 'ascending' ? this.ascendingSort : this.descendingSort)
    //     : this.biographyData)
    //     .map((item, number) =>
    //         <BiographyTableRow key={item.split('-**-')[0]}
    //                            num={number + 1}
    //                            year={+item.split('-**-')[1]}
    //                            text={item.split('-**-')[2]}
    //         />
    //     )

    // use own sort method
    const biographyDataList = this.selectionSort(this.biographyData, sortDirection)
        .map((item, number) =>
            <BiographyTableRow key={item.split('-**-')[0]}
                               num={number + 1}
                               year={+item.split('-**-')[1]}
                               text={item.split('-**-')[2]}
            />
        )

    const arrowDirectionStyle = cx('arrowDirection', {
      arrowDirectionDown: sortDirection === 'ascending',
      arrowDirectionUp: sortDirection === 'descending'
    })

    return (
        <Container fluid className='bg-light mb-3'>
          <div className='middle-container'>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th className={arrowDirectionStyle} onClick={this.sortClickHandler}>Дата&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Биография</th>
              </tr>
              </thead>
              <tbody>
              {biographyDataList}
              <tr>
                <td>*</td>
                <td>
                  <FormControl ref={this.dateInput} size="sm" aria-label="Small"/>
                </td>
                <td>
                  <FormControl ref={this.descriptionInput} size="sm" aria-label="Small"/>
                </td>
              </tr>
              </tbody>
            </Table>
            <div className="d-grid gap-2 d-md-block">
              <Button onClick={this.addDataToBiographyArrHandler} variant="secondary" className=''>Добавить</Button>
              <Button onClick={this.removeDataFromBiographyArrHandler} variant="secondary"
                      className='ms-md-2'>Удалить</Button>
            </div>
          </div>
        </Container>
    )
  }
}

export default BiographyTable