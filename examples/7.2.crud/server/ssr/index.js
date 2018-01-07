// Ignore assets in SSR
import ignoreAssets from "ignore-styles"
ignoreAssets([".less", ".css", ".jpg", ".jpeg", ".png", ".gif", ".svg"])

import Express from "express"
import * as F from "framework"
import K from "kefir"
import P from "path"
import * as R from "ramda"
import React from "react"
import ReactDOMServer from "react-dom/server"
import {layout200} from "./layout"

let router = Express.Router()

let timeout = (delayMs) =>
  K.later(delayMs, K.constantError(new Error("timeout"))).flatMap()

router.get("/*", (req, res, next) => {
  // With SSR --------------------------------------------------------------------------------------
  // try {
  //   // Dynamic imports
  //   let app = require("client/root").default
  //   let {seed} = require("client/root")
  //   let {APP_KEY} = require("client/meta")
  //
  //   let sources = {
  //     state$: K.pool(),
  //     DOM: F.fromDOMEvent("#" + APP_KEY),
  //   }
  //
  //   let sinks = app(
  //     R.over("state$", x => x.toProperty().skipDuplicates(R.equals), sources),
  //     APP_KEY
  //   )
  //
  //   sources.state$.plug(K.constant(R.merge(seed, {url: req.originalUrl})))
  //
  //   sinks.state$.observe(state => {
  //     sources.state$.plug(K.constant(state))
  //   })
  //
  //   sinks.state$
  //     .skip(1) // skip initial state
  //     .merge(timeout(250)) // TODO experiment with delays
  //     .take(1) // take a single state snapshot
  //     .takeErrors(1)
  //     .observe(state => {
  //       let appHTML = ReactDOMServer.renderToString(<sinks.Component/>)
  //       res.send(layout200({appHTML, state}))
  //     }, next)
  // } catch (error) {
  //   next(error)
  // } finally {
  //   cleanCache(filename => filename.match(P.join("examples", "7.crud", "client")))
  // }

  // Without SSR -----------------------------------------------------------------------------------
  try {
    let {seed} = require("client/root")

    res.send(layout200({
      appHTML: "",
      state: R.merge(seed, {url: req.originalUrl})
    }))
  } catch (error) {
    next(error)
  } finally {
    cleanCache(filename => filename.match(P.join("examples", "7.crud", "client")))
  }
})

export default router

let cleanCache = (matchFn) => {
  Object.keys(require.cache).forEach(module => {
    if (matchFn(require.cache[module].filename)) {
      // console.log(`deleting ${require.cache[module].filename}...`)
      delete require.cache[module]
    }
  })
}
