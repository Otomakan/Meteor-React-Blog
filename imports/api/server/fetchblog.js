

'use strict'

const contentful = require('contentful')

const SPACE_ID = 'ago4yxk9fm5e'
const ACCESS_TOKEN = 'b56f7e83cffc4353acd92d4ce0d40e70b562c68adc667bcbc3a7c81d47b849a7'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})


// fetchContentTypes()
// .then((contentTypes)=>{contentTypes.map((contentType)=>{
//   console.log(contentType.sys.id)
  // client.getEntries({content_type: '2wKn6yEnZewu2SCCkus4as'})
  // .then((res)=> res.items.forEach((entry)=> console.log(entry.fields)))
  // .catch((err)=> console.log(err))
  // })
// })
// .catch((err)=> console.log(err))

// 5KMiN6YPvi42icqAUQMCQe Category
// 2wKn6yEnZewu2SCCkus4as Posts
// 1kUEViTN4EmGiEaaeC6ouY Author
let ContentfulList = client.getEntries({content_type: '2wKn6yEnZewu2SCCkus4as'}).then((res)=> res.items.forEach((entry)=> entry.fields)).catch((err)=> console.log(err))
export default ContentfulList 