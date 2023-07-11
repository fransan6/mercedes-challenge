import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "longitude", "latitude" ];
  static values = { api: String }

  connect() {
    console.log("Controller connected");
    this.obtainPostalCode();
  }

  obtainPostalCode() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/-0.171944,51.496667.json?access_token=${this.apiValue}`)
      .then(response => response.json())
      .then(data => { console.log(data.features[2].text) })
  };
}
