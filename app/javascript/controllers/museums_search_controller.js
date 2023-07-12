import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "longitude", "latitude", "search" ];
  static values = { api: String }

  connect() {
    console.log("Controller connected");
    this.obtainMuseums();
  }

  obtainMuseums() {
    fetch(`https://api.mapbox.com/search/searchbox/v1/category/museum?access_token=${this.apiValue}&limit=10&proximity=13.437641,52.494857`)
    .then(response => response.json())
    .then(data => {
      for (const museum of data.features) {
        if (!museumsObj.keys().includes(museum.properties.context.postcode.name)) {
        museumsObj[museum.properties.context.postcode.name] = [museum.properties.name]
      } else {
        museumsObj[museum.properties.context.postcode.name].push(museum.properties.name)
      }
    }})
    console.log(museumsObj)
  }

  submit() {
    console.log("This is submitted")
  }
}

const museumsObj = { first: "test" };
