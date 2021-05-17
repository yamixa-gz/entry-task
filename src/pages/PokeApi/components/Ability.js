import React from 'react';
import PropTypes from 'prop-types';

const Ability = ({ ability }) => (
  <>
    <span className="lh-sm">{ability}</span>
    <br />
  </>
);
Ability.propTypes = {
  ability: PropTypes.string.isRequired,
};

export default Ability;
