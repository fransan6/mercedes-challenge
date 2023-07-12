import { Controller } from "@hotwired/stimulus"
let museumsObj = {};

export default class extends Controller {
  static targets = [ "longitude", "latitude", "results" ];
  static values = { api: String };

  async submit(event) {
    event.preventDefault();
    this.resultsTarget.innerHTML = '';
    museumsObj = {};

    await this.obtainMuseums(this.longitudeTarget.value, this.latitudeTarget.value);
    this.displayMuseums();
  }

  async obtainMuseums(longitude, latitude) {
    const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/category/museum?access_token=${this.apiValue}&limit=10&proximity=${longitude},${latitude}`);
    const data = await response.json();

    for (const museum of data.features) {
      let postCode = museum.properties.context.postcode.name;

      if (Object.keys(museumsObj).includes(postCode) === false ) {
        museumsObj[postCode] = [museum.properties.name];
      } else {
        museumsObj[postCode].push(museum.properties.name);
      }
    }
  }

  displayMuseums() {
    for (const museum in museumsObj) {
      let para = document.createElement("p")
      let museumListing = `<b>${museum}</b> - ${museumsObj[museum]}`
      para.innerHTML += museumListing.replaceAll(",", ", ");
      this.resultsTarget.appendChild(para);
    }

    this.longitudeTarget.value = '';
    this.latitudeTarget.value = '';
  }
}
