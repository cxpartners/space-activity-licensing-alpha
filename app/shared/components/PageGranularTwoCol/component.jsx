import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Footer from '../../components/Footer/component.jsx'
import Breadcrumb from '../../components/Breadcrumb/component.jsx'
import Hero from '../../components/Hero/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import SidenavContainer from '../../containers/SidenavContainer/component.jsx'
import ContentRepeaterContainer from '../../containers/ContentRepeaterContainer/component.jsx'

const PageGranularTwoCol = props => {
  return (
    <div>
      <Masthead />
      <Hero {...props.hero} />
      <div className='site-wrapper'>
        <main id='content' role='main'>
          <Grid>
            <GridCol className='column-one-third'>
              <SidenavContainer {...props}/>
            </GridCol>
            <GridCol className='column-two-thirds'>
              <ContentRepeaterContainer {...props}/>
            </GridCol>
          </Grid>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default PageGranularTwoCol