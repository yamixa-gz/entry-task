import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MenuItem = ({ menuItem, toggleBurger }) => {
  const { t } = useTranslation('Header');

  return (
    <li>
      <Link onClick={() => toggleBurger(false)} to={menuItem.href}>{t(menuItem.value)}</Link>
    </li>
  );
};

MenuItem.propTypes = {
  toggleBurger: PropTypes.func.isRequired,
  menuItem: PropTypes.shape({
    value: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
