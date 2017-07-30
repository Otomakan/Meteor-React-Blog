		

export function Publish (reqId, client){client.getEntry(reqId).then(
				// Fore Some reason I cant resolve links from contetnful so I have to do an extra query to get image and author names client.getEntries({'sys.id': request.body.sys.id}, 'include':10).then((res)=>console.log(res.items[0].fields.author.fields.name)

				(res)=> {

				console.log(res.fields.author)
				let newPost = res

				let insertFeaturedImage = client.getAsset(res.fields.featuredImage.sys.id)
				.then((featuredImage)=> {newPost.fields.featuredImage=featuredImage})
				.catch(()=> console.log('there was an error fetching the image'))
				
				let insertAuthor = client.getEntry(res.fields.author[0].sys.id)
				.then((author)=>{newPost.fields.author = [author]})
				.catch(()=>console.log('there was an error fetching the author'))

				Promise.all([insertFeaturedImage, insertAuthor]).then((entries)=>{
					console.log('Adding New Entry')
					Meteor.call('add-entry', newPost)
					console.log('added')
			
				})
			
			}
		)
		.catch((err)=> console.log(error))
}
