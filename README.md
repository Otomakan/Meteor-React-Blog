# Meteor React Blog

This is an example of a blog I built for my little sister using Meteor, React and a headless CMS (Curerently Contentful, but also one ButterCMS branch). I want to make this an easy to setup boilerplate. 

You can find a demo at meteoreactblog.herokuapp.com

## TL;DR

The reason for building it this way is that I wanted to build a blog in React but didn't really like working with the current Node CMSs. So I decided to use a headless CMS I started with ButterCMS then used contentful because I can get more free content. Now the problem is that I want to stay in free tier as long as possible which wont be option if there is a request made to headless CMS every time a user logs in (especially that the app is made in such a way that every page requires to load about 6 posts). 

Finally, I chose Meteor as a framework. Why not an other framework? No real reason behind it except that I saw an interesting front-end position which required to know Meteor(Oh! and user Auth seems quite easy to setup). So I want to make this an easy to use boilerplate and maybe  So maybe I'll make an other boilerplate using an other framework (MERN?).

You can find a version of it working at 
Even if intial loading can be a bit slow, thanks to React and the general architecture of the app, navigation can be quite smooth and fast I think. 

## Get Started
### Clone This Repository
```
git clone https://github.com/Otomakan/Meteor-React-Blog.git
```

### Install Meteor: 
For OSX/Linux run :
```
curl https://install.meteor.com/ | sh
```

For Windows, download the installer and follow the instructions at https://www.meteor.com/install

Then run 
```
meteor npm install
```

Finally just just run 
```
meteor
```
And you are ready to code! (sort of)

## Setup Your Contentful Account

Go to contentful.com and create an account. Then Create a new Space, when given the option create an example space and pick the blog option.  (see here: https://gyazo.com/b09ff79af6af5d813af150c160e6bcf4 ). 

This boilerplate almost exclusively deals with the Post Content Type. 


### Link your app to the Contentful Database. 
In server/main.js replace the Access Tokens with you own. You can find SPACEID and ACCESS TOKEN (called Content Delivery API on contentful) by clicking on "APIs" on the contentful navbar > Content delivery /preview tokens >>Website Key.

### Write Some Posts and Watch Them Appear Locally!



## Setup Webhooks
My workflow for working with webhooks locally  uses ngrok. You can find more info about it at https://ngrok.com/download.

To try out the webhooks localy run ./ngrok http 3000 in your project root folder then copy the server address and use it to build your webhook in the Contentful platform. 
All the webhooks related files are in imports/api/public folder. Sorry for the weird organisationm I started with the default meteor project structure, not sure I'm very happy about it. 

##During Development 


<Image> Components takes 3 props : src which is the contentful url, height and width. This will make a query to the Contentful server to return the exact image size you need. Like this you can always have optimized images!

