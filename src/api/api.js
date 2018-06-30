import { createAPI } from 'create-api'

const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  }
})

function fetch (child) {
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchListData (type) {
  return fetchIdsByType(type)
    .then((ids) => fetchItems(ids))
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
