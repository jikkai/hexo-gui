import Rx from 'rxjs'
import { run } from '@cycle/rxjs-run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHashHistoryDriver } from '@cycle/history'
import { makeHTTPDriver } from '@cycle/http'

import App from './app'

import './styles/main.css'

run(App, {
  DOM: makeDOMDriver('body'),
  history: makeHashHistoryDriver(),
  HTTP: makeHTTPDriver()
})
