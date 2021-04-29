import React, { useContext } from 'react';
import s from './scss/Description.module.scss';
import Card from './components/Card';
import Layout from '../../layout/Layout';
import { DescriptionContext, DescriptionProvider } from '../../cotexts/DescriptionProvider';

const Description = () => {
  const { openCardId, setOpenCardId, descriptionCards } = useContext(DescriptionContext);
  const { Header, Footer } = Layout();

  const descriptionTitle = `Данный проект раскрывает основные понятия git, 
  node.js, а также затрагивает основы html и css.`;

  const clickHandler = (id) => setOpenCardId(id);

  const makeShortTextForCardContent = (fullText, symbolsAmount = 140) => {
    return fullText.length < symbolsAmount
      ? fullText
      : `${fullText.slice(0, symbolsAmount)}...`;
  };
  const cardsList = descriptionCards.map((item) => (
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
              {descriptionTitle}
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
