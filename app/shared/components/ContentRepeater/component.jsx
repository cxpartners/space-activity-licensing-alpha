import React from 'react'
import classNames from 'classnames'
import Longform from '../Longform/component.jsx'
import Heading from '../Heading/component.jsx'
import Divider from '../Divider/component.jsx'
import List from '../List/component.jsx'
import CommentModule from '../CommentModule/component.jsx'
import TabPanel from '../TabPanel/component.jsx'
import Tablist from '../Tablist/component.jsx'
import Tab from '../Tab/component.jsx'
import Accordion from '../Accordion/component.jsx'

const ContentRepeater = props => {
  let classes = classNames(props.className, props.modifiers)
  let tabs = props.commentBlock && props.commentBlock.tabs ? <React.Fragment><Tablist>{props.commentBlock.tabs.map((v, i) => <Tab key={i} id={v.id}>{v.label}</Tab>)}</Tablist>{props.commentBlock.tabs.map((v, i) => <TabPanel key={i} id={v.id}>{props.commentBlock && <CommentModule id={props.permalink + v.id} {...props.commentBlock}/>}</TabPanel>)}</React.Fragment> : null
  let collapsible = props.commentBlock && props.commentBlock.collapsible && props.commentBlock.tabs ? (<Accordion><div className='accordion-section'><div className='accordion-section-header'></div><div className='accordion-section-body'>{tabs}</div></div></Accordion>) : tabs
  return (
    <section className={classes} id={props.permalink}>
      {props.title && <Heading {...props.title}/>}
      <Longform {...props}/>
      {props.heading && <Heading {...props.heading}/>}
      {props.documents && <List list={props.documents} className='list-inline'/>}
      {collapsible}
      {props.backbutton && <div className='text'><a href='#' className='link-back'>Back to top</a></div>}
      {props.divider && <Divider />}
    </section>
  )
}

export default ContentRepeater
