import React from 'react'
import {languages} from '../translation/languages'
import {APP_LANGUAGE} from '../translation/appLanguage'
import PropTypes from 'prop-types'

const withTranslation = (Component) => {
  let appLanguage = null
  if (!Component.name) {
    throw new Error('Component is not valid!')
  }
  if (!Object.keys(languages).includes(APP_LANGUAGE)) {
    throw new Error('Type of language is not valid!')
  }
  const currentLanguagePack = Object.entries(languages).find(entry => entry[0] === APP_LANGUAGE)[1]
  if (!Object.keys(currentLanguagePack).includes(Component.name)) {
    console.error('Component is not recognized!')
  } else {
    appLanguage = Object.entries(currentLanguagePack).find(entry => entry[0] === Component.name)[1]
  }
  return (props) => {
    return <Component
        {...props}
        appLanguage={appLanguage}
    />
  }
}
withTranslation.propTypes = {
  Component: PropTypes.object
}

export default withTranslation