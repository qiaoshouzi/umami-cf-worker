import { Hono } from 'hono'

const app = new Hono<{
  Bindings: Env
}>()

app
  .get('/umami.js', () => {
    return fetch('https://cloud.umami.is/script.js')
  })
  .onError((err, c) => {
    console.error('unknownError', err)
    return c.body(`unknownError: ${err.name}, ${err.message}`, 500)
  })

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>
