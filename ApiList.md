# DevTinder API's

# Auth router
post/signup
post/login
post/logout

## profile router

get/profile/view
post/profile/edit
post/profile/password

## connection request router

post /request/send/:status/:userId ->ignored,interested

post /request/send/:status/:userID-> accepted,rejected


## user router


Get /user/request
Get /user/connection
Get /user/feed -> gets the profile of other users
