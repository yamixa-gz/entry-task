import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import s from './scss/Description.module.scss';
import Card from './components/Card';
import Layout from '../../layout/Layout';
import { DescriptionContext, DescriptionProvider } from '../../cotexts/DescriptionProvider';

const Description = () => {
  const { openCardId, setOpenCardId, cardDescription } = useContext(DescriptionContext);
  const { Header, Footer } = Layout();
  const { t } = useTranslation('Description');

  const clickHandler = (id) => setOpenCardId(id);

  const makeShortTextForCardContent = (fullText, symbolsAmount = 140) => (
    fullText.length < symbolsAmount
      ? fullText
      : `${fullText.slice(0, symbolsAmount)}...`
  );

  const cardsList = cardDescription.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      title={t(item.title)}
      description={t(item.description)}
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

export default () => (
  <DescriptionProvider>
    <Description />
  </DescriptionProvider>
);
