import Rx from 'rxjs/Rx'

function HomeRouter (sources) {
  const vdom$ = Rx.Observable.of(
    <main>
      Hello Hexo
    </main>
  )

  return {
    DOM: vdom$
  }
}

export default HomeRouter
