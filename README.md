## README

As per a Le Wagon Careers Week optional, this addresses the following challenge using RoR:

### :car: Brief
We're looking for a small Ruby on Rails application providing an endpoint which takes a GPS latitude and longitude and spits out the names of museums around that location grouped by their postcode as JSON. As an example: when doing a request to **/museums?lat=52.494857&lng=13.437641**, it would generate a response similar to:

`{
"10999": ["Werkbundarchiv – museum of things"],
"12043": ["Museum im Böhmischen Dorf"],
"10179": [
"Märkisches Museum",
"Museum Kindheit und Jugend",
"Historischer Hafen Berlin"
],
"12435": ["Archenhold Observatory"]
}`

<sub><sup>Using Ruby 3.1.2 with Rails 7.0.4.3</sup></sub>
