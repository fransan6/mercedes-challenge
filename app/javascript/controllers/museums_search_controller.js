import { Controller } from "@hotwired/stimulus"
let museumsObj = {};

export default class extends Controller {
  static targets = [ "longitude", "latitude", "results" ];
  static values = { api: String };

  submit(event) {
    event.preventDefault();
    this.resultsTarget.innerHTML = '';

    if (this.longitudeTarget.value === '' | this.latitudeTarget.value === '') {
      this.unsuccessful(event)
    } else {
      this.successful(event)
    }
  }

  async obtainMuseums(longitude, latitude) {
    try {
      const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/category/museum?access_token=${this.apiValue}&limit=10&proximity=${longitude},${latitude}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      for (const museum of data.features) {
        let postCode = museum.properties.context.postcode.name;

        if (Object.keys(museumsObj).includes(postCode) === false) {
          museumsObj[postCode] = [museum.properties.name];
        } else {
          museumsObj[postCode].push(museum.properties.name);
        }
      }
    } catch (error) {
      console.error(`Could not get museums: ${error}`);
      let para = document.createElement("p");
      para.textContent = "Apologies, there is an error in obtaining the museums."
      this.resultsTarget.appendChild(para);
    }
  }

  displayMuseums() {
    for (const museum in museumsObj) {
      let para = document.createElement("p");
      let museumListing = `<b>${museum}</b> - ${museumsObj[museum]}`;
      para.innerHTML += museumListing.replaceAll(",", ", ");
      this.resultsTarget.appendChild(para);
    }

    this.longitudeTarget.value = '';
    this.latitudeTarget.value = '';
  }

  unsuccessful() {
    let para = document.createElement("p")
    para.textContent = "You're missing a coordinate, try again.."
    this.resultsTarget.appendChild(para);
  }

  async successful() {
    museumsObj = {};
    await this.obtainMuseums(this.longitudeTarget.value, this.latitudeTarget.value);
    this.displayMuseums();
  }
}
