
export default async function ({ app, store, redirect, route, axios }) {
  console.log("middle", route.path, route.query, app.$axios)
  if (route.query.i === undefined) {
  //   console.log("qweasd")
  //   redirect("/")
  //   store.dispatch("setupSnackbar", {
  //     show: true,
  //     text: "Verification failed. Please request for new verification email.",
  //     type: "error"
  //   })
  // }
  // if (store.state.auth.loggedIn) {
  //   return redirect("/")
  }
}
