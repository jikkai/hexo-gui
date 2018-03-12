import Rx from 'rxjs'
import { routerify } from 'cyclic-router'
import switchPath from 'switch-path'

import HomeRouter from './routes/home'

function main (sources) {
  const match$ = sources.router.define({
    '/': HomeRouter
  })

  const page$ = match$.map(({path, value}) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path)
    }))
  })

  return {
    DOM: page$.switchMap(c => c.DOM),
    router: page$.switchMap(c => c.DOM),
    // HTTP: Rx.Observable.merge(page$.switchMap(c => c.HTTP))
  }
}

export default routerify(main, switchPath)
