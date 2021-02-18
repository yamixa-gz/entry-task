import React, {Component, createRef} from 'react'
import {Table, Container, Button, FormControl} from 'react-bootstrap'
import BiographyTableRow from './BiographyTableRow'
import classNames from 'classnames/bind'
import s from './style.module.scss'

const cx = classNames.bind(s)

class BiographyTable extends Component {
  dateInput = createRef()
  descriptionInput = createRef()
  biographyData = [
    '1971-**-Год рождения Илона Маска в Претории (ЮАР).' +
    ' Мать — Мей Маск, была моделью и известным диетологом. ' +
    'Отец — Эррол Маск, — пилот, моряк и инженер. Зарабатывал консультациями.',
    '2006-**-Состоялся первый для компании запуск ракеты-носителя Falcon 1, но он завершился аварией. ' +
    'Однако в том же году компания SpaceX стала одним из победителей в конкурсе НАСА Commercial Orbital Transportation Services (COTS), ' +
    'получив суммарное финансирование в размере 396 млн долларов, для разработки и демонстрации ракеты-носителя Falcon 9 и корабля Dragon.',
    '2012-**-Была запущена революционная сеть супер-заправок для путешествия на дальние дистанции.',
    '1981-**-Когда Илону Маску было 10 лет, он получил в подарок первый компьютер Commodore VIC-20, который' +
    ' использовал для программирования, уже в 12 лет он продал за 500 долларов свою первую программу, игру' +
    ' Blastar, в которой можно было стрелять по инопланетянам из лазерной пушки.',
    '2000-**-Произошло слияние компаний X.com и Confinity, тем самым объединились системы X.com и PayPal. ' +
    'Маск требовал для нового образования бренд X.com вместо PayPal. Это вызвало разногласия внутри организации, ' +
    'и Илон по решению Совета директоров ушел в отставку.',
    '2010-**-Дальнейшими достижениями SpaceX стали: запуск корабля Dragon, который был выведен на орбиту и возвращен на Землю, ' +
    'первая в истории посадка первой ступени на землю, выполненная после вывода полезной нагрузки на околоземную орбиту',
    '1992-**-Маск переехал в США и поступил в Пенсильванский университет, где получил степень' +
    ' бакалавра наук по физике колледжа искусств и наук, а также степень бакалавра по экономике Уортон школы' +
    ' бизнеса. Со временем перешел в Стэнфорд, но обучение не закончил.',
    '1999-**-Илон Маск стал одним из основателей X.com (вложив 12 млн собственных сбережений),' +
    ' намереваясь сделать революцию в сфере банковских платежей.',
    '2000-**-Илон Маск женился на девушке Джастин, которая вместе с ним училась в университете',
    '2002-**-Илон Маск снова сделал верный ход. Компания PayPal была куплена eBay за 1,5 млрд долларов, ' +
    'а Илон за свои 11,7% акций получил 175 млн долларов.',
    '2002-**-Маск основал свою третью компанию — SpaceX. Эта компания Илона связана с космическими разработками, ' +
    'целью ее создания было сокращение расходов на полеты в космос, способствование его освоению и в частности, будущая колонизация Марса.',
    '2019-**-Тяжелая ракета Falcon Heavy успешно вывела на орбиту спутник связи.',
    '2008-**-Состоялся первый успешный запуск ракеты-носителя Falcon 1 и вывод полезной нагрузки на орбиту. ' +
    'Благодаря энергичным действиям Илона Маска, в компании разработаны два типа потенциально многократных ракет-носителей: ' +
    'Falcon 1 и Falcon 9, а также многоразовый космический корабль Dragon.',
    '2017-**-Власти США выдали Илону Маску разрешение на начало работ по строительству тоннеля между Нью-Йорком и Вашингтоном для реализации проекта Hyperloop. ' +
    'Бизнесмен обещает, что его проект поможет жителям этих двух городов преодолевать расстояние в 250 км между ними менее чем за полчаса.',
    '1996-**-Zip2 — первая компания, которую организовали совместно братья Маск. Они занимались производством программного обеспечения. ' +
    'Их проектом был цифровой аналог «Жёлтых страниц», с помощью которого в любом районе ' +
    'Сан-Франциско можно было найти ближайшую пиццерию.',
    '2010-**-Маск появился в фильме «Железный человек 2» в роли самого себя (по сюжету Илон — приятель Тони Старка).',
    '2003-**-Илон организовал компанию, которую назвал в честь Николы Теслы «Tesla Motors». ' +
    'Сферой деятельности этой компании является создание экологически чистых электромобилей.',
    '2016-**-Вышла новость, что корабль Red Dragon («Красный дракон») компании SpaceX не позднее 2018 года полетит на Марс.',
    '2018-**-SpaceX осуществила успешный старт сверхтяжёлой ракеты-носителя Falcon Heavy, выведшей на гелиостационарную ' +
    'орбиту ярко-красный автомобиль Tesla Roadster из личной коллекции Маска с макетом человека в скафандре на водительском кресле.',
  ]
  state = {
    sortDirection: '', //one of these -> '', ascending, descending
  }
  ascendingSort = (prevEl, nextEl) => +prevEl.split('-**-')[0] - +nextEl.split('-**-')[0]
  descendingSort = (prevEl, nextEl) => +nextEl.split('-**-')[0] - +prevEl.split('-**-')[0]
  selectionSort = (sortingArr, sortDirection) => {
    let arr = sortingArr.slice()
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        sortDirection === 'ascending'
        && (+arr[j].split('-**-')[0] < +arr[i].split('-**-')[0])
        && ([arr[i], arr[j]] = [arr[j], arr[i]])

        sortDirection === 'descending'
        && (+arr[j].split('-**-')[0] > +arr[i].split('-**-')[0])
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
      sortDirection: setSortDirection
    })
  }
  addDataToBiographyArrHandler = () => {
    const year = this.dateInput.current.value
    const text = this.descriptionInput.current.value
    if (isNaN(parseInt(year)) || year.length > 10 || text.length < 5) {
      console.error('Please input valid data!')
    } else {
      this.biographyData.push(`${parseInt(year) + ''}-**-${text}`)
      this.dateInput.current.value = ''
      this.descriptionInput.current.value = ''
      console.warn('New element added!')
      console.log('Current array:', this.biographyData)
    }
  }
  removeDataFromBiographyArrHandler = () => {
    this.biographyData.length && this.biographyData.length--;
    console.warn('Last element deleted!')
    console.log('Current array:', this.biographyData)
  }

  render() {
    const sortDirection = this.state.sortDirection

    // use inherit sort method
    // const biographyDataToRender = sortDirection
    //     ? this.biographyData.slice()
    //         .sort(sortDirection === 'ascending' ? this.ascendingSort : this.descendingSort)
    //     : this.biographyData

    // use own sort method
    const biographyDataToRender = sortDirection
        ? this.selectionSort(this.biographyData, sortDirection)
        : this.biographyData

    const arrowDirectionStyle = cx('arrowDirection', {
      arrowDirectionDown: sortDirection === 'ascending',
      arrowDirectionUp: sortDirection === 'descending'
    })
    sortDirection
        ? console.log('New sorted array:', biographyDataToRender)
        : console.log('Current array:', biographyDataToRender)

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
              <BiographyTableRow num={1} year={1971} text={'Год рождения Илона Маска в Претории (ЮАР).\n' +
              'Мать — Мей Маск, была моделью и известным диетологом. Отец — Эррол Маск, — пилот, моряк и инженер.\n' +
              'Зарабатывал консультациями.'}/>
              <BiographyTableRow num={2} year={2006}
                                 text={'Состоялся первый для компании запуск ракеты-носителя Falcon 1, но он завершился аварией. ' +
                                 'Однако в том же году компания SpaceX стала одним из победителей в конкурсе НАСА Commercial Orbital Transportation Services (COTS), ' +
                                 'получив суммарное финансирование в размере 396 млн долларов, для разработки и демонстрации ракеты-носителя Falcon 9 и корабля Dragon.'}/>
              <BiographyTableRow num={3} year={2012}
                                 text={'Была запущена революционная сеть супер-заправок для путешествия на дальние дистанции.'}/>
              <BiographyTableRow num={4} year={1981}
                                 text={'Когда Илону Маску было 10 лет, он получил в подарок первый компьютер Commodore VIC-20, который' +
                                 ' использовал для программирования, уже в 12 лет он продал за 500 долларов свою первую программу, игру' +
                                 ' Blastar, в которой можно было стрелять по инопланетянам из лазерной пушки.'}/>
              <BiographyTableRow num={5} year={2000}
                                 text={'Произошло слияние компаний X.com и Confinity, тем самым объединились системы X.com и PayPal. ' +
                                 'Маск требовал для нового образования бренд X.com вместо PayPal. Это вызвало разногласия внутри организации, ' +
                                 'и Илон по решению Совета директоров ушел в отставку.'}/>
              <BiographyTableRow num={6} year={2010}
                                 text={'Дальнейшими достижениями SpaceX стали: запуск корабля Dragon, который был выведен на орбиту и возвращен на Землю, ' +
                                 'первая в истории посадка первой ступени на землю, выполненная после вывода полезной нагрузки на околоземную орбиту.'}/>
              <BiographyTableRow num={7} year={1992}
                                 text={'Маск переехал в США и поступил в Пенсильванский университет, где получил степень' +
                                 ' бакалавра наук по физике колледжа искусств и наук, а также степень бакалавра по экономике Уортон школы' +
                                 ' бизнеса. Со временем перешел в Стэнфорд, но обучение не закончил.'}/>
              <BiographyTableRow num={8} year={1999}
                                 text={'Илон Маск стал одним из основателей X.com (вложив 12 млн собственных сбережений),' +
                                 ' намереваясь сделать революцию в сфере банковских платежей.'}/>
              <BiographyTableRow num={9} year={2000}
                                 text={'Илон Маск женился на девушке Джастин, которая вместе с ним училась в университете'}/>
              <BiographyTableRow num={10} year={2002}
                                 text={'Илон Маск снова сделал верный ход. Компания PayPal была куплена eBay за 1,5 млрд долларов, ' +
                                 'а Илон за свои 11,7% акций получил 175 млн долларов.'}/>
              <BiographyTableRow num={11} year={2002}
                                 text={'Маск основал свою третью компанию — SpaceX. Эта компания Илона связана с космическими разработками, ' +
                                 'целью ее создания было сокращение расходов на полеты в космос, способствование его освоению и в частности, будущая колонизация Марса.'}/>
              <BiographyTableRow num={12} year={2019}
                                 text={'Тяжелая ракета Falcon Heavy успешно вывела на орбиту спутник связи.'}/>
              <BiographyTableRow num={13} year={2008}
                                 text={'Состоялся первый успешный запуск ракеты-носителя Falcon 1 и вывод полезной нагрузки на орбиту. ' +
                                 'Благодаря энергичным действиям Илона Маска, в компании разработаны два типа потенциально многократных ракет-носителей: ' +
                                 'Falcon 1 и Falcon 9, а также многоразовый космический корабль Dragon.'}/>
              <BiographyTableRow num={14} year={2017}
                                 text={'Власти США выдали Илону Маску разрешение на начало работ по строительству тоннеля между Нью-Йорком и Вашингтоном для реализации проекта Hyperloop. ' +
                                 'Бизнесмен обещает, что его проект поможет жителям этих двух городов преодолевать расстояние в 250 км между ними менее чем за полчаса.'}/>
              <BiographyTableRow num={15} year={1996}
                                 text={'Zip2 — первая компания, которую организовали совместно братья Маск. Они занимались производством программного обеспечения. ' +
                                 'Их проектом был цифровой аналог «Жёлтых страниц», с помощью которого в любом районе ' +
                                 'Сан-Франциско можно было найти ближайшую пиццерию.'}/>
              <BiographyTableRow num={16} year={2010}
                                 text={'Маск появился в фильме «Железный человек 2» в роли самого себя (по сюжету Илон — приятель Тони Старка).'}/>
              <BiographyTableRow num={17} year={2003}
                                 text={'Илон организовал компанию, которую назвал в честь Николы Теслы «Tesla Motors». ' +
                                 'Сферой деятельности этой компании является создание экологически чистых электромобилей.'}/>
              <BiographyTableRow num={18} year={2016}
                                 text={'Вышла новость, что корабль Red Dragon («Красный дракон») компании SpaceX не позднее 2018 года полетит на Марс.'}/>
              <BiographyTableRow num={19} year={2018}
                                 text={'SpaceX осуществила успешный старт сверхтяжёлой ракеты-носителя Falcon Heavy, выведшей на гелиостационарную ' +
                                 'орбиту ярко-красный автомобиль Tesla Roadster из личной коллекции Маска с макетом человека в скафандре на водительском кресле.'}/>
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