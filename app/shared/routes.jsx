import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { notifyByEmail, notifyBySms, fetchPage, receivePageError } from './actions'

import NoMatchContainer from './containers/NoMatchContainer/component.jsx'
import ServerError from './components/ServerError/component.jsx'
import PageContainer from './containers/PageContainer/component'
import PageGranularContainer from './containers/PageGranularContainer/component'
import PageTwoColContainer from './containers/PageTwoColContainer/component'
import PageGranularTwoColContainer from './containers/PageGranularTwoColContainer/component'
import PageFlatImage from './containers/PageFlatImageContainer/component'

import { config } from 'config'

/*
 * Render 404 / 500 errors
 */

let getRoutes = store => {
  function withFallback (WrappedComponent, selectData) {
    return class extends React.Component {
      render () {
        let state = store.getState()
        switch (state.error) {
          case 500:
            return <ServerError />
          case 404:
            return <NoMatchContainer />
          default:
            return <WrappedComponent {...this.props} />
        }
      }
    }
  }

  function getPage (nextState, replace, callback) {
    store.dispatch(fetchPage(this.slug))
      .then(() => {
        callback()
      }).catch(err => {
        console.log(err)
        // error pushed to state
        callback()
      })
  }

  function getPageAndEmail (nextState, replace, callback) {
    let p1 = store.dispatch(notifyByEmail())
    let p2 = store.dispatch(fetchPage(this.slug))
    Promise.all([p1, p2]).then(() => {
      callback()
    }).catch(err => {
      console.log(err)
      // error pushed to state
      callback()
    })
  }

  function getPageAndSms (nextState, replace, callback) {
    let p1 = store.dispatch(notifyBySms())
    let p2 = store.dispatch(fetchPage(this.slug))

    Promise.all([p1, p2]).then(() => {
      callback()
    }).catch(err => {
      console.log(err)
      // error pushed to state
      callback()
    })
  }

  function noMatchError (nextState, replace, callback) {
    store.dispatch(receivePageError(404))
    callback()
  }

  return (
    <Route path='/'>
      <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='index'/>
      <Route path='uksa-homepage' component={withFallback(PageFlatImage)} onEnter={getPage} slug='uksa-homepage' />
      <Route path='applications' component={withFallback(PageTwoColContainer)} onEnter={getPage} slug='application-homepage' />
      <Route path='notifications' component={withFallback(PageFlatImage)} onEnter={getPage} slug='notifications' />
      <Route path='activity' component={withFallback(PageFlatImage)} onEnter={getPage} slug='activity' />
      <Route path='application-overview'>
        <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='application-overview' />
        <Route path='time-passes' component={withFallback(PageContainer)} onEnter={getPage} slug='application-overview-time-passes' />
        <Route path='new-member' component={withFallback(PageFlatImage)} onEnter={getPage} slug='new-member' />
        <Route path='technical'>
          <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='application-overview-technical'/>
          <Route path='no-updates' component={withFallback(PageContainer)} onEnter={getPage} slug='application-overview-technical-no-updates' />
          <Route path='ready-for-admin' component={withFallback(PageContainer)} onEnter={getPage} slug='application-overview-technical-ready-for-admin' />
          <Route path='satellite-and-mission-overview' component={withFallback(PageGranularContainer)} onEnter={getPage} slug='technical-safety' />
          <Route path='satellite-and-mission-overview-pre' component={withFallback(PageGranularContainer)} onEnter={getPage} slug='technical-safety-pre' />
          <Route path='satellite-and-mission-overview-reviewed' component={withFallback(PageGranularContainer)} onEnter={getPage} slug='technical-safety-reviewed' />
          <Route path='satellite-and-mission-overview-assessed' component={withFallback(PageGranularContainer)} onEnter={getPage} slug='technical-safety-assessed' />
          <Route path='satellite-and-mission-overview-assessed-admin' component={withFallback(PageGranularContainer)} onEnter={getPage} slug='technical-safety-assessed-admin' />
          <Route path='share' component={withFallback(PageContainer)} onEnter={getPage} slug='technical-share' />
          <Route path='all-attachments' component={withFallback(PageFlatImage)} onEnter={getPage} slug='all-attachments' />
        </Route>
        <Route path='frequency'>
          <IndexRoute component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='application-overview-frequency-comments'/>
        </Route>
      </Route>
      <Route path='sign-in'>
        <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='sign-in'/>
        <Route path='authenticate' component={withFallback(PageContainer)} onEnter={getPage} slug='authenticate' />
        <Route path='log-out' component={withFallback(PageContainer)} onEnter={getPage} slug='log-out' />
        <Route path='sign-in-engineer' component={withFallback(PageContainer)} onEnter={getPage} slug='sign-in-engineer' />
        <Route path='authenticate-engineer' component={withFallback(PageContainer)} onEnter={getPage} slug='authenticate-engineer' />
        <Route path='sign-in-operator' component={withFallback(PageContainer)} onEnter={getPage} slug='sign-in-operator' />
        <Route path='authenticate-operator' component={withFallback(PageContainer)} onEnter={getPage} slug='authenticate-operator' />
        <Route path='technical-section-share-email' component={withFallback(PageFlatImage)} onEnter={getPage} slug='technical-section-share-email' />
        <Route path='backstage-to-frontstage-comment-email' component={withFallback(PageFlatImage)} onEnter={getPage} slug='backstage-to-frontstage-comment-email' />
        <Route path='frontstage-to-backstage-comment-email' component={withFallback(PageFlatImage)} onEnter={getPage} slug='frontstage-to-backstage-comment-email' />
        <Route path='backstage-to-backstage-admin-email' component={withFallback(PageFlatImage)} onEnter={getPage} slug='backstage-to-backstage-admin-email' />
      </Route>
      <Route path='homepage'>
        <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='homepage' />
        <Route path='satellite-operator-license' component={withFallback(PageContainer)} onEnter={getPage} slug='satellite-operator-license' />
        <Route path='application-process' component={withFallback(PageContainer)} onEnter={getPage} slug='application-process' />
        <Route path='guidance-for-applicants' component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='guidance-for-applicants' />
        <Route path='new-to-licensing' component={withFallback(PageContainer)} onEnter={getPage} slug='new-to-licensing' />
      </Route>
      <Route path='apply'>
        <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-1'/>
        <Route path='register' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-register' />
        <Route path='page-1-b' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-1-b' />
        <Route path='page-1-c' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-1-c' />
        <Route path='page-1-d' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-1-d' />
        <Route path='page-2' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-2' />
        <Route path='page-2-a' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-2-a' />
        <Route path='page-4' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-4' />
        <Route path='page-5' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-page-5' />
        <Route path='your-organisation' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-your-organisation' />
        <Route path='confirmation' component={withFallback(PageContainer)} onEnter={getPage} slug='apply-confirmation' />
        <Route path='email-confirmation' component={withFallback(PageFlatImage)} onEnter={getPage} slug='apply-email-confirmation' />
      </Route>
      <Route path='machine-learning'>
        <IndexRoute component={withFallback(PageFlatImage)} onEnter={getPage} slug='ml-1' />
        <Route path='machine-learning-2' component={withFallback(PageFlatImage)} onEnter={getPage} slug='ml-2' />
        <Route path='machine-learning-3' component={withFallback(PageFlatImage)} onEnter={getPage} slug='ml-3' />
      </Route>
      <Route path='caa'>
        <IndexRoute component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='operator-technical-questions' />
      </Route>
      <Route path='operator'>
        <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview'/>
        <Route path='engineer-email' component={withFallback(PageFlatImage)} onEnter={getPage} slug='engineer-email-technical' />
        <Route path='operator-eligibility-assessing' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-eligibility-assessing' />
        <Route path='operator-eligibility-has-been-assessed' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-eligibility-has-been-assessed' />
        <Route path='operator-eligibility-assessing-approved' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-eligibility-assessing-approved' />
        <Route path='operator-eligibility-assessing-approved-admin' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-eligibility-assessing-approved-admin' />
        <Route path='operator-submission-ready-email' component={withFallback(PageFlatImage)} onEnter={getPageAndEmail} slug='operator-submission-ready-email' />
        <Route path='operator-overview-technical-partial-submit' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-technical-partial-submit' />
        <Route path='operator-overview-technical-partial-submit-2' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-technical-partial-submit-2' />
        <Route path='operator-technical-questions-completed' component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='operator-technical-questions-completed' />
        <Route path='operator-eligibility-assessed-updated' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-eligibility-assessed-updated' />
        <Route path='operator-overview-unlocked' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-unlocked' />
        <Route path='operator-overview-technical' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-technical' />
        <Route path='operator-overview-technical-draft' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-technical-draft' />
        <Route path='operator-overview-technical-ready-for-submission' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-technical-ready-for-submission' />
        <Route path='operator-overview-technical-submit' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-overview-technical-submit' />
        <Route path='email-submission-ready' component={withFallback(PageFlatImage)} onEnter={getPageAndSms} slug='email-submission-ready' />
        <Route path='technical-eligibility-questions' component={withFallback(PageContainer)} onEnter={getPage} slug='technical-eligibility-questions' />
        <Route path='technical-draft' component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='operator-technical-questions-draft' />
        <Route path='technical' component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='operator-technical-questions' />
        <Route path='technical-share' component={withFallback(PageContainer)} onEnter={getPage} slug='operator-technical-share' />
        <Route path='link-previous-application' component={withFallback(PageFlatImage)} onEnter={getPage} slug='link-previous-application' />
        <Route path='link-section-summaries' component={withFallback(PageFlatImage)} onEnter={getPage} slug='link-section-summaries' />
        <Route path='technical-section-linked' component={withFallback(PageFlatImage)} onEnter={getPage} slug='technical-section-linked' />
      </Route>
      <Route path='generate-license'>
        <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='generate-license' />
        <Route path='add-condition' component={withFallback(PageGranularTwoColContainer)} onEnter={getPage} slug='generate-license-add-condition' />
        <Route path='create-license' component={withFallback(PageContainer)} onEnter={getPage} slug='generate-license-create-license' />
        <Route path='create-license-page-1' component={withFallback(PageContainer)} onEnter={getPage} slug='generate-license-create-license-page-1' />
        <Route path='add-conditions-multiple' component={withFallback(PageContainer)} onEnter={getPage} slug='generate-license-add-conditions-multiple' />
        <Route path='create-license-page-incorporated' component={withFallback(PageContainer)} onEnter={getPage} slug='generate-license-create-license-page-2' />
      </Route>
      <Route path='*' component={withFallback(PageContainer)} onEnter={getPage} slug='no-match' />
    </Route>
  )
}

export { getRoutes }
