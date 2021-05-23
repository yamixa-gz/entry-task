import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './scss/Description.module.scss';
import Card from './components/Card';
import Layout from '../../layout/Layout';
import cardDescription from '../../data/cardDescription';
import setOpenCardId from '../../store/description/actions';

const Description = ({ openCardId, setOpenCardIdAction }) => {
  const { Header, Footer } = Layout();
  const { t } = useTranslation('Description');

  const clickHandler = (id) => setOpenCardIdAction(id);

  const makeShortTextForCardContent = (fullText, symbolsAmount = 140) => (
    fullText.length < symbolsAmount
      ? fullText
      : `${fullText.slice(0, symbolsAmount)}...`
  );

  const cardsList = cardDescription.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      title={item.title}
      description={item.description}
      img={item.img}
      isOpen={openCardId === item.id}
      clickHandler={clickHandler}
      makeShortTextForCardContent={makeShortTextForCardContent}
    />
  ));
  return (
    <>
      <Header />
      <div className="content">
        <div className="app-container">
          <div className={s.description}>
            <div className={s.descriptionTitle}>
              {t('descriptionTitle')}
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
};

Description.propTypes = {
  openCardId: PropTypes.string.isRequired,
  setOpenCardIdAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  openCardId: state.description.openCardId,
});

export default connect(mapStateToProps, {
  setOpenCardIdAction: setOpenCardId,
})(Description);
