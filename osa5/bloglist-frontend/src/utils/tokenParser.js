const tokenParser = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const parsedUser = JSON.parse(window.atob(base64))
  return parsedUser.id
}

export default tokenParser
