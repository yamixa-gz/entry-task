import React, {Component} from 'react'
import s from './style.module.scss'

const OPEN_CARD = 'Read Less'
const CLOSED_CARD = 'Read More'

class Card extends Component {

  render() {
    const {id, title, fullTextContent, img, clickHandler, openCardId, makeShortTextForCardContent} = this.props
    const isOpen = openCardId === id

    return (
        <div className={s.card}>
          <div className={s.cardBody}>
            <div className={s.cardImg}>
              <img src={img} alt='cvs'/>
            </div>
            <div className={s.cardTitle}>
              {title}
            </div>
            <div className={s.cardDescription}>
              {isOpen ? fullTextContent : makeShortTextForCardContent(fullTextContent)}
            </div>
            <button onClick={() => clickHandler(id)}
                    className={s.cardButton}>{isOpen ? OPEN_CARD : CLOSED_CARD}</button>
          </div>
        </div>
    )
  }
}

export default Card