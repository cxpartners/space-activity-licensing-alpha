import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Footer from '../../components/Footer/component.jsx'
import Button from '../../components/Button/component.jsx'
import Hero from '../../components/Hero/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import SidenavContainer from '../../containers/SidenavContainer/component.jsx'
import ContentRepeaterContainer from '../../containers/ContentRepeaterContainer/component.jsx'
import Progress from '../Progress/component.jsx'
import Banner from '../Banner/component.jsx'
import Breadcrumb from '../Breadcrumb/component.jsx'
import Heading from '../Heading/component.jsx'

const PageGranularTwoCol = props => {
  return (
    <React.Fragment>
      <Masthead {...props.masthead}/>
      {!props.hero && <div id='global-header-bar' />}
      <Banner {...props.banner}/>
      {props.breadcrumb && <Breadcrumb breadcrumb={props.breadcrumb} />}
      {props.hero && <Hero {...props.hero} />}
      <div className='site-wrapper'>
        <main id='content' role='main'>
          <Grid>
            <GridCol className='column-one-third'>
              <SidenavContainer {...props}/>
            </GridCol>
            <GridCol className='column-two-thirds'>
              <ContentRepeaterContainer {...props}/>
              {props.progress && <Progress {...props.progress}/>}
              {props.complete && <Button {...props.complete}/>}
            </GridCol>
          </Grid>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default PageGranularTwoCol
