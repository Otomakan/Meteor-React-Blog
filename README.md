This is an example of a blog I built for my little sister using Meteor, React and a headless CMS. I want to make this an easy to setup boilerplate. 

The reason for building it this way is that I wanted to build a blog in React but didn't really like working with the current Node CMSs. So I decided to use a headless CMS I started with ButterCMS then used contentful because I can get more free content. Now the problem is that I want to stay in free tier as long as possible which wont be option if there is a request made to headless CMS every time a user logs in (especially that the app is made in such a way that every page requires to load about 6 posts). 

Finally, I chose Meteor as a framework. Why not an other framework? No real reason behind it except that I saw an interesting front-end position which required to know Meteor(Oh! and user Auth seems quite easy to setup). So I want to make this an easy to use boilerplate and maybe  So maybe I'll make an other boilerplate using an other framework (MERN?).

You can find a version of it working at 
Even if intial loading can be a bit slow, thanks to React and the general architecture of the app, navigation is really fast I think. 


To try out the webhook localy run ./ngrok http 3000 in your project folder then copy the server address and use it to build your webhook in the contentful folder. 

<Image> Component takes 3 props : src which is the contentful url, height and width. This will make a query to the Contentful server to return the exact image size you need. 