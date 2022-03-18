export const stringRandom = (uppcase = false) => {
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    ' ' +
    Math.random().toString(36).substring(2, 15)
  if (uppcase) {
    return randomString
      .toLowerCase()
      .split(' ')
      .map(function (Word) {
        return Word[0].toUpperCase() + Word.substr(1)
      })
      .join(' ')
  }
  return randomString
}

export const randomImage = () => {
  return (
    `https://source.unsplash.com/random/500x500?sig=${
      Math.floor(Math.random() * 100) + 1
    }` || ''
  )
}

export const type = ['fixed_price', 'auction']
