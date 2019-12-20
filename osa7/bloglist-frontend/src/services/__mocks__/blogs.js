const blogs = [
  {
    title: 'Timon Hautajaiset',
    author: 'Ilpo',
    url: 'www.fullstackopen.com',
    likes: 2,
    user: {
      username: 'Pusse',
      name: 'Pusse',
      id: '5dc158e8dc13421e78bf92f5'
    },
    id: '5dc167d667973b2c3cb35ac8'
  },
  {
    title: 'Uusi blogi',
    author: 'Jesse Vainikka',
    url: 'dota2.com',
    likes: 6,
    user: {
      username: 'Pusse2',
      name: 'Pusse2',
      id: '5dc171228306ba0524a18f22'
    },
    id: '5dc2d1e844f0e80e544df7bc'
  },
  {
    title: 'Jussin perunamaa kukoistaa',
    author: 'Mirri',
    url: 'www.google.com',
    likes: 7,
    user: {
      username: 'Pusse2',
      name: 'Pusse2',
      id: '5dc171228306ba0524a18f22'
    },
    id: '5dc42419e3919a1f9c4d8764'
  },
  {
    title: 'Testiblogi',
    author: 'Pelle',
    url: 'https://www.finnair.com',
    likes: 1,
    user: {
      username: 'Pusse2',
      name: 'Pusse2',
      id: '5dc171228306ba0524a18f22'
    },
    id: '5dc42424e3919a1f9c4d8765'
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
