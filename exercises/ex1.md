# Getting Insights on Anonymous Customers
## Motivation
In this exercise we'll collect cart activities for anonymous users and create insights on top of them
## Walkthrough
* Define a new `Cart Activity`:
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/72374fef075942f6bde01a52ad468909.html
  * Create a new `Activity` named "Cart" with the following typed fields:
    * "product": `string`
    * "category": `string`
    * "date": `date`
* Create a new `Web Client Application`:
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/1246367efca441659ec9e2f53b120864.html
  * Add `cdp.vcap.me` as a Trusted Domain
* Create a `new Web Client Event`:
  * Name it "On Add To Cart"
  * Extend its model with:
    * "product": `string`
    * "category": `string`
  * Map its respective fields to the new `Cart Activity`
  * Implement sending this event from the front-end code according to the snippets, e.g.
    * Load the SDK from `index.html`
    * Add an Angular Provider for injecting the SDK to requesting components [via `InjectionToken`].
    * Create an Angular Service, `ReportService`
    * Inject and use the SDK in the its method `onAddToCart`
    * Call the above method in `ProductsService/addToCart`
* Create an `FavShirtCount Activity Indicator`
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/bf9afd16cc2841dbb9eac8f5d42d3959.html
  * Count activities in the "Tshirts" category
* Create a `TShirtLover Segment`:
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/07df802c92034afbb7c75039f60d76be.html
  * Set the following values
    * ENTHUSIAST
      * `FavShirtCount` > 5
    * FAN
      * `FavShirtCount` > 2
* You can see the Activities being registered and the segment calculated using the "Customer Search" screen