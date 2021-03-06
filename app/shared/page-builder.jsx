import React from 'react'
import Longform from './components/Longform/component'
import Title from './components/Title/component'
import Hero from './components/Hero/component'
import Form from './components/Form/component'
import List from './components/List/component'
import Heading from './components/Heading/component.jsx'
import Collapsible from './components/Collapsible/component.jsx'
import ContentRepeater from './components/ContentRepeater/component.jsx'
import Panel from './components/Panel/component.jsx'
import Notice from './components/Notice/component.jsx'
import Listing from './components/Listing/component.jsx'
import InfoGrid from './components/InfoGrid/component.jsx'
import NoticePanel from './components/NoticePanel/component.jsx'
import Button from './components/Button/component.jsx'
import ButtonGroup from './components/ButtonGroup/component.jsx'
import Divider from './components/Divider/component.jsx'
import ProgressList from './components/ProgressList/component.jsx'
import Spinner from './components/Spinner/component.jsx'
import AccordionBlock from './components/AccordionBlock/component.jsx'
//  import Pagination from './components/Pagination/component.jsx'

export function pageBuilder (pageData) {
  let contentItems = pageData.content

  if (!contentItems || contentItems.length === 0) {
    return
  }

  let reactComponents = []

  if (!contentItems) {
    return null
  }

  for (let i = 0; i < contentItems.length; i++) {
    let item = contentItems[i]
    let reactComponent

    switch (item.contentType) {
      case 'heading':
        reactComponent = <Heading {...item} key={i} />
        break
      case 'list':
        reactComponent = <List {...item} key={i} />
        break
      case 'longform':
        reactComponent = <Longform {...item} key={i} />
        break
      case 'accordion':
        reactComponent = <AccordionBlock {...item} key={i} />
        break
      case 'listing':
        reactComponent = <Listing {...item} key={i} />
        break
      case 'button':
        reactComponent = <Button {...item} key={i} />
        break
      case 'buttongroup':
        reactComponent = <ButtonGroup {...item} key={i} />
        break
      case 'noticePanel':
        reactComponent = <NoticePanel {...item} key={i} />
        break
      case 'hero':
        reactComponent = <Hero {...item} key={i} />
        break
      case 'panel':
        reactComponent = <Panel {...item} key={i} />
        break
      case 'infoGrid':
        reactComponent = <InfoGrid {...item} key={i} />
        break
      case 'collapsible':
        reactComponent = <Collapsible {...item} key={i} />
        break
      case 'divider':
        reactComponent = <Divider {...item} key={i} />
        break
      case 'form':
        reactComponent = <Form {...item} key={i} />
        break
      case 'collapsiblepanel':
        reactComponent = <ContentRepeater {...item} key={i} />
        break
      case 'notice':
        reactComponent = <Notice {...item} key={i} />
        break
      case 'title':
        reactComponent = <Title {...item} key={i} />
        break
      case 'pagination':
        reactComponent = <Pagination {...item} key={i} />
        break
      case 'spinner':
        reactComponent = <Spinner {...item} key={i} />
        break
      case 'progressList':
        reactComponent = <ProgressList {...item} key={i} />
        break
      default:
        console.error('Could not match ' + item.contentType)
        continue
    }
    reactComponents.push(reactComponent)
  }
  return reactComponents
}
