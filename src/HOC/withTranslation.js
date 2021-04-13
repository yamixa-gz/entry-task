import React from 'react'
import {languages} from '../translation/languages'
import {APP_LANGUAGE} from '../translation/appLanguage'

const withTranslation = (Component) => {
  if (!Component?.name) return
  const currentLanguagePack = Object.entries(languages).find(entry => entry[0] === APP_LANGUAGE)[1]
  return (props) => {
    return <Component
        {...props}
        appLanguage={Object.entries(currentLanguagePack).find(entry => entry[0] === Component.name)[1]}
    />
  }
}

export default withTranslation