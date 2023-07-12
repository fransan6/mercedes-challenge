import { Controller } from "@hotwired/stimulus"
const museumsObj = {};

export default class extends Controller {
  static targets = [ "longitude", "latitude", "results" ];
  static values = { api: String };

  submit(event) {
    event.preventDefault();
    this.obtainMuseums(this.longitudeTarget.value, this.latitudeTarget.value);
    console.log(museumsObj);
  }

  obtainMuseums(longitude, latitude) {
    fetch(`https://api.mapbox.com/search/searchbox/v1/category/museum?access_token=${this.apiValue}&limit=10&proximity=${longitude},${latitude}`)
    .then(response => response.json())
    .then(data => {
      for (const museum of data.features) {
        let postCode = museum.properties.context.postcode.name

        if (Object.keys(museumsObj).includes(postCode) === false ) {
          museumsObj[postCode] = [museum.properties.name];
        } else {
          museumsObj[postCode].push(museum.properties.name);
        }
      }
    })
  }
}
