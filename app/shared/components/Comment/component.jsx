import React from 'react'
import classNames from 'classnames'
import Longform from '../Longform/component.jsx'
import List from '../List/component.jsx'
import Byline from '../Byline/component.jsx'
import Heading from '../Heading/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

const Comment = props => {
  let classes = classNames('box box--flat has-byline', props.className, props.modifiers)

  return (
    <article className={classes} id={props.id} data-comment-block>
      <Byline {...props.byline}/>
      <Longform {...props}/>
      <Grid>{props.deadline && <GridCol className='column-half'><Heading {...props.deadline}/></GridCol>}{props.assignees && <GridCol className='column-half'><Heading {...props.assignees}/></GridCol>}</Grid>
      <Grid className='spacing-top--single'>{props.documents && <GridCol className='column-full'><p>Comment attachments</p><List list={props.documents} /></GridCol>}</Grid>
    </article>
  )
}

export default Comment
