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

post /request/send/interested/:userId
post /request/send/ignored/:userID
post /request/send/rejected/:userID
post /request/send/Accepted/:userID

## user router

Get /user/connection
Get /user/request
Get /user/feed -> gets the profile of other users
