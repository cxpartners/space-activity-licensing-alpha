import React from 'react'
import classNames from 'classnames'
import Longform from '../Longform/component.jsx'
import Heading from '../Heading/component.jsx'
import Divider from '../Divider/component.jsx'
import List from '../List/component.jsx'
import CommentModule from '../CommentModule/component.jsx'

const ContentRepeater = props => {
  let classes = classNames(props.className, props.modifiers)

  return (
    <section className={classes} id={props.permalink}>
      <Heading {...props.title}/>
      <Longform {...props}/>
      <Heading {...props.heading}/>
      {props.documents && <List list={props.documents} className='list-inline'/>}
      <CommentModule id={props.permalink} {...props.commentBlock}/>
      <div className='text'>
        <a href='#' className='link-back'>Back to top</a>
      </div>
      <Divider />
    </section>
  )
}

export default ContentRepeater
