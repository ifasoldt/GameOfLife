# README

This is a simple implementation of Conway's Game of Life. There's lots of places where it could be improved, but it should handle the basic functionality just fine.

To try it out:

* Clone down the repo locally.
* In the root directory: `rake db:create` and `rake db:migrate`
* Get your gems: `bundle install`
* `cd app/frontend` and install the npm packages by running `npm install`
* In the same frontend folder build your frontend by calling `npm run dev` (this will also live update if you make any changes to the react files)
* Start your server: `rails s`

* Navigate to `localhost:3000` (or wherever you have your rails server start)

* You should be good to go!
