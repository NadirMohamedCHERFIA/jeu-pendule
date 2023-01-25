import React from 'react'
import './index.css'
import Top from './components/Top/Top'
import Main from './components/Main/Main'
import About from './components/About/About'
import Contacts from './components/Contacts/Contacts'
import Copyrights from './components/Copyrights/Copyrights'
import Before from './components/Before/Before'
const App = () => {
  return (<>
    <Before/>
    <Top/>
    <Main/>
    <About/>
    <Contacts/>
    <Copyrights/>
  </>
  )
}

export default App