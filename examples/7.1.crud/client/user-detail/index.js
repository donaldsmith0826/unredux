import A from "axios"
import * as F from "framework"
import K from "kefir"
import * as D from "selfdb"
import * as R from "ramda"
import React from "react"
import UserDetail from "./UserDetail"

export default (sources, key) => {
  let {params} = sources.props
  let baseLens = ["users", params.id]

  let intents = {
    fetch$: sources.state$
      .filter(s => !R.view(baseLens, s))
      .flatMapConcat(_ => K
        .fromPromise(A.get(`/api/users/${params.id}`))
        .map(resp => resp.data.models[params.id])
      ),
  }

  let user$ = D.deriveOne(sources.state$, baseLens)

  let Component = F.connect(
    {
      user: user$,
    },
    UserDetail,
  )

  let action$ = K.merge([
    intents.fetch$.map(user => {
      if (user) {
        return function afterGET(state) {
          return R.set(baseLens, user, state)
        }
      } else {
        return R.id // TODO add alert box
      }
    }).flatMapErrors(err => {
      console.warn(`Request to "${err.response.config.url}" failed with message "${err.response.status} ${err.response.statusText}"`)
      return K.never() // TODO add alert box
    }),
  ])

  return {Component, action$}
}
