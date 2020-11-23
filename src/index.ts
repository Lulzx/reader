import App from './App.svelte'

const app = new App({
  target: document.body,
});

export default app

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.$destroy()
  })
}

//Type override for HMR so TS doesn't complain
declare global {
  interface ImportMeta {
    hot: {
      accept: Function
      dispose: Function
    }
  }
}
