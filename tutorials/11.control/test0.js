import {Observable as O} from "rxjs"
import * as R from "../../vendors/ramda"
import * as D from "../../vendors/selfdb"

let seed = {x1: 0, x2: 0}

let state = D.run(
  () => D.makeStore({}),
  D.withLog({name: "db"}),
  D.withControl({}),
)(O.merge(
  O.of(() => seed),
  O.of(R.id),
))

state.$.subscribe()

// Proactive actions are logged as well ^_^
state.over(R.over("x1", R.inc))
state.over(R.over("x2", R.dec))
state.set(seed)
state.merge({x3: 0})
state.merge({tags: {foo: true}})
state.mergeDeep({tags: {bar: true}})

// Next: ???
