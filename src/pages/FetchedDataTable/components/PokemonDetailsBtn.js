import { Button } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokemonDetailsModal from './PokemonDetailsModal';
import { FetchedDataTableContext } from '../../../cotexts/FetchedDataTableProvider';
import { ShowPokemonDetailsContext, ShowPokemonDetailsProvider } from '../../../cotexts/ShowPokemonDetailsProvider';

const PokemonDetailsBtn = ({ url, callbacks }) => {
  const { state } = useContext(FetchedDataTableContext);
  const {
    setPokemonDetailsLoading,
    setPokemonDetailsModalShow,
    isPokemonDetailsLoading,
  } = useContext(ShowPokemonDetailsContext);

  const { isPending } = state;
  const { getPokemonDetailsRequest } = callbacks;
  useEffect(() => {
    if (isPokemonDetailsLoading) {
      getPokemonDetailsRequest(url).then(() => {
        setPokemonDetailsLoading(false);
      });
    }
  }, [isPokemonDetailsLoading]);
  const onClickHandler = (e) => {
    e.stopPropagation();
    if (isPending) return;
    setPokemonDetailsModalShow(true);
    setPokemonDetailsLoading(true);
  };
  return (
    <>
      <Button
        variant="outline-secondary"
        size="sm"
        disabled={isPokemonDetailsLoading}
        onClick={!isPokemonDetailsLoading ? onClickHandler : null}
      >
        {isPokemonDetailsLoading ? 'Loading…' : 'See details'}
      </Button>
      {!isPokemonDetailsLoading && (
        <PokemonDetailsModal />
      )}
    </>
  );
};

PokemonDetailsBtn.propTypes = {
  url: PropTypes.string.isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
    getPokemonDetailsRequest: PropTypes.func.isRequired,
  }).isRequired,
};

export default (props) => (
  <ShowPokemonDetailsProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <PokemonDetailsBtn {...props} />
  </ShowPokemonDetailsProvider>
);
