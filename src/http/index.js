import axios from 'axios'

export const api = axios.create({
  timeout: 3000,
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const posts = function (opts, ...rest) {
  let config = {
    url: 'posts'
  }

  if (opts) {
    Object.assign(config, opts)

    // https://github.com/typicode/json-server
    // Id values are not mutable. Any id value in the body of your PUT or PATCH request wil be ignored. Only a value set in a POST request wil be respected, but only if not already taken.
    // A POST, PUT or PATCH request should include a Content-Type: application/json header to use the JSON in the request body. Otherwise it will result in a 200 OK but without changes being made to the data.
    if (opts.method && opts.method === 'patch') {
      Object.assign(config, {
        url: `posts/${rest[0]}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  return api.request(config)
}

export const comments = function (opts) {
  let config = {
    url: 'comments'
  }

  if (opts) {
    Object.assign(config, opts)
  }

  return api.request(config)
}
