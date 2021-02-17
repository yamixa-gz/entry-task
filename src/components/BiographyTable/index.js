import React, {Component, createRef} from 'react'
import {Table, Container, Button, FormControl} from 'react-bootstrap'
import BiographyTableRow from './BiographyTableRow'
import classNames from 'classnames/bind'
// eslint-disable-next-line
import s from './style.module.scss'

const cx = classNames.bind(s)

class BiographyTable extends Component {
  dateInput = createRef()
  descriptionInput = createRef()
  biographyData = [
    '1971-*__*-Год рождения Илона Маска в Претории (ЮАР).' +
    ' Мать — Мей Маск, была моделью и известным диетологом. ' +
    'Отец — Эррол Маск, — пилот, моряк и инженер. Зарабатывал консультациями.',
    '2006-*__*-Состоялся первый для компании запуск ракеты-носителя Falcon 1, но он завершился аварией. ' +
    'Однако в том же году компания SpaceX стала одним из победителей в конкурсе НАСА Commercial Orbital Transportation Services (COTS), ' +
    'получив суммарное финансирование в размере 396 млн долларов, для разработки и демонстрации ракеты-носителя Falcon 9 и корабля Dragon.',
    '2012-*__*-Была запущена революционная сеть супер-заправок для путешествия на дальние дистанции.',
    '1981-*__*-Когда Илону Маску было 10 лет, он получил в подарок первый компьютер Commodore VIC-20, который' +
    ' использовал для программирования, уже в 12 лет он продал за 500 долларов свою первую программу, игру' +
    ' Blastar, в которой можно было стрелять по инопланетянам из лазерной пушки.',
    '2000-*__*-Произошло слияние компаний X.com и Confinity, тем самым объединились системы X.com и PayPal. ' +
    'Маск требовал для нового образования бренд X.com вместо PayPal. Это вызвало разногласия внутри организации, ' +
    'и Илон по решению Совета директоров ушел в отставку.',
    '2010-*__*-Дальнейшими достижениями SpaceX стали: запуск корабля Dragon, который был выведен на орбиту и возвращен на Землю, ' +
    'первая в истории посадка первой ступени на землю, выполненная после вывода полезной нагрузки на околоземную орбиту',
    '1992-*__*-Маск переехал в США и поступил в Пенсильванский университет, где получил степень' +
    ' бакалавра наук по физике колледжа искусств и наук, а также степень бакалавра по экономике Уортон школы' +
    ' бизнеса. Со временем перешел в Стэнфорд, но обучение не закончил.',
    '1999-*__*-Илон Маск стал одним из основателей X.com (вложив 12 млн собственных сбережений),' +
    ' намереваясь сделать революцию в сфере банковских платежей.',
    '2000-*__*-Илон Маск женился на девушке Джастин, которая вместе с ним училась в университете',
    '2002-*__*-Илон Маск снова сделал верный ход. Компания PayPal была куплена eBay за 1,5 млрд долларов, ' +
    'а Илон за свои 11,7% акций получил 175 млн долларов.',
    '2002-*__*-Маск основал свою третью компанию — SpaceX. Эта компания Илона связана с космическими разработками, ' +
    'целью ее создания было сокращение расходов на полеты в космос, способствование его освоению и в частности, будущая колонизация Марса.',
    '2019-*__*-Тяжелая ракета Falcon Heavy успешно вывела на орбиту спутник связи.',
    '2008-*__*-Состоялся первый успешный запуск ракеты-носителя Falcon 1 и вывод полезной нагрузки на орбиту. ' +
    'Благодаря энергичным действиям Илона Маска, в компании разработаны два типа потенциально многократных ракет-носителей: ' +
    'Falcon 1 и Falcon 9, а также многоразовый космический корабль Dragon.',
    '2017-*__*-Власти США выдали Илону Маску разрешение на начало работ по строительству тоннеля между Нью-Йорком и Вашингтоном для реализации проекта Hyperloop. ' +
    'Бизнесмен обещает, что его проект поможет жителям этих двух городов преодолевать расстояние в 250 км между ними менее чем за полчаса.',
    '1996-*__*-Zip2 — первая компания, которую организовали совместно братья Маск. Они занимались производством программного обеспечения. ' +
    'Их проектом был цифровой аналог «Жёлтых страниц», с помощью которого в любом районе ' +
    'Сан-Франциско можно было найти ближайшую пиццерию.',
    '2010-*__*-Маск появился в фильме «Железный человек 2» в роли самого себя (по сюжету Илон — приятель Тони Старка).',
    '2003-*__*-Илон организовал компанию, которую назвал в честь Николы Теслы «Tesla Motors». ' +
    'Сферой деятельности этой компании является создание экологически чистых электромобилей.',
    '2016-*__*-Вышла новость, что корабль Red Dragon («Красный дракон») компании SpaceX не позднее 2018 года полетит на Марс.',
    '2018-*__*-SpaceX осуществила успешный старт сверхтяжёлой ракеты-носителя Falcon Heavy, выведшей на гелиостационарную ' +
    'орбиту ярко-красный автомобиль Tesla Roadster из личной коллекции Маска с макетом человека в скафандре на водительском кресле.',
  ]
  state = {
    sortHeading: '', //one of these -> '', ascending, descending
    addDataToTable: null
  }
  ascendingSort = (prevEl, nextEl) => +prevEl.split('-*__*-')[0] - +nextEl.split('-*__*-')[0]
  descendingSort = (prevEl, nextEl) => +nextEl.split('-*__*-')[0] - +prevEl.split('-*__*-')[0]
  selectionSort = (sortingArr, sortHeading) => {
    let arr = sortingArr.slice()
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        sortHeading === 'ascending' && (arr[j] < arr[i]) && ([arr[i], arr[j]] = [arr[j], arr[i]])
        sortHeading === 'descending' && (arr[j] > arr[i]) && ([arr[i], arr[j]] = [arr[j], arr[i]])
      }
    }
    return arr
  }
  sortClickHandler = () => {
    let setSortHeading
    switch (this.state.sortHeading) {
      case 'ascending':
        setSortHeading = 'descending'
        break
      case 'descending':
        setSortHeading = ''
        break
      case '':
        setSortHeading = 'ascending'
        break
      default:
        setSortHeading = ''
    }
    this.setState({
      sortHeading: setSortHeading
    })
  }

  render() {
    const sortHeading = this.state.sortHeading
    // use inherit sort method
    // const biographyDataToRender = sortHeading
    //     ? this.biographyData.slice()
    //         .sort(sortHeading === 'ascending' ? this.ascendingSort : this.descendingSort)
    //     : this.biographyData

    // use own sort method
    const biographyDataToRender = sortHeading
        ? this.selectionSort(this.biographyData, sortHeading)
        : this.biographyData
    const arrowHeadingStyle = cx('arrowHeading', {
      arrowHeadingDown: sortHeading === 'ascending',
      arrowHeadingUp: sortHeading === 'descending'
    })
    console.log(biographyDataToRender)
    return (
        <Container fluid className='bg-light mb-3'>
          <div className='middle-container'>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th className={arrowHeadingStyle} onClick={this.sortClickHandler}>Дата&nbsp;&nbsp;&nbsp;</th>
                <th>Биография</th>
              </tr>
              </thead>
              <tbody>
              <BiographyTableRow num={1} year={1971} text={'Год рождения Илона Маска в Претории (ЮАР).\n' +
              'Мать — Мей Маск, была моделью и известным диетологом. Отец — Эррол Маск, — пилот, моряк и инженер.\n' +
              'Зарабатывал консультациями.'}/>
              <tr>
                <td>2</td>
                <td>1981</td>
                <td>Когда Илону Маску было 10 лет, он получил в подарок первый компьютер Commodore VIC-20, который
                  использовал для программирования, уже в 12 лет он продал за 500 долларов свою первую программу, игру
                  Blastar, в которой можно было стрелять по инопланетянам из лазерной пушки.
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>1992</td>
                <td>Маск переехал в США и поступил в Пенсильванский университет, где получил степень
                  бакалавра наук по физике колледжа искусств и наук, а также степень бакалавра по экономике Уортон школы
                  бизнеса. Со временем перешел в Стэнфорд, но обучение не закончил.
                </td>
              </tr>
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
              <Button onClick={()=>{
               this.dateInput.current.value = ''

              }} variant="secondary" className=''>Добавить</Button>
              <Button variant="secondary" className='ms-md-2'>Удалить</Button>
              <Button variant="secondary" className='ms-md-2'>Готово</Button>
            </div>
          </div>
        </Container>
    )
  }
}

export default BiographyTable