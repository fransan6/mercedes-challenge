import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="museums-search"
export default class extends Controller {
  connect() {
    console.log("Museums search is connected")
  }
}
