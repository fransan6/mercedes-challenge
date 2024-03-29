import { Controller } from "@hotwired/stimulus"
let museumsObj = {};

export default class extends Controller {
  static targets = [ "longitude", "latitude", "results", "limit" ];
  static values = { api: String };

  submit(event) {
    event.preventDefault();
    this.resultsTarget.innerHTML = '';

    if (isNaN(this.limitTarget.value) || parseInt(this.limitTarget.value) > 10) {
      this.createParaElement("Please enter a number from 1 to 10.");
    } else {
      if (this.longitudeTarget.value === '' || this.latitudeTarget.value === '' || this.limitTarget.value === '') {
        this.unsuccessful(event);
      } else {
        this.successful(event);
      }
    }
  }

  async obtainMuseums(longitude, latitude, limit) {
    try {
      const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/category/museum?access_token=${this.apiValue}&limit=${limit}&proximity=${longitude},${latitude}`);
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
      this.createParaElement("Apologies, there is an error in obtaining the museums.");
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
    this.limitTarget.value = '';
  }

  unsuccessful() {
    this.createParaElement("You're missing something, try again..")
  }

  async successful() {
    museumsObj = {};
    await this.obtainMuseums(this.longitudeTarget.value, this.latitudeTarget.value, this.limitTarget.value);
    this.displayMuseums();
  }

  createParaElement(message) {
    let para = document.createElement("p");
    para.textContent = `${message}`;
    this.resultsTarget.appendChild(para);
  }
}
