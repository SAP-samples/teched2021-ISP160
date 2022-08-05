# Custom Connectivity
## Motivation
In this exercise, we'll simulate connecting to an external delivery system in order to set express delivery for VIP GOLD customers.
We'll create a new `Connector` in order to create an action that will invoke an HTTP request to a mock service [configured on top of Kyma].

## Walkthrough
* Navigate to the `Connector-Studio` and create a new `Connector`:
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/a69832d0774a45499a4f6bb76dac7134.html
  * Details screen:
    * Name: My Delivery System
    * Category: Service
    * API Version: 1.0.0
  * API Authentication screen:
    * Base URL: https://workshop.a8f4ae0.kyma-stage.shoot.live.k8s-hana.ondemand.com
    * Basic Authentication
  * Resources screen:
    * Create a new endpoint:
      * Method: POST
      * Endpoint URL: /delivery
      * Intent: Consume data from CDP
      * Request Schema:
        * email: `string`
        * firstName: `string`
  * Events/Actions screen:
    * Create a new Action:
      * Name: Priority Delivery
      * Based on the endpoint above
  * Publish screen:
    * Click the "Publish" button
  * Enable the `Connector` that was created
* Navigate back to the main CDP Console
* Connect a new destination application, based on the above `Connector`:
  * username: baryo
  * password: baryo
* Edit the "Priority Delivery" action:
  * Setting screen:
    * Processing Purposes: `service`
  * Mapping screen:
    * primaryEmail -> email
    * firstName -> firstName
* Navigate to the "VIP GOLD" flow and edit it:
  * Extend the flow:
    * After the last step [Emarsys Action], add:
      * "Is in a segment?" Decision step
        * Segment: VIP
        * Values: GOLD
        * YES branch:
          * Priority Delivery Action
* Now an additional email [marking the express delivery] will be sent for VIP GOLD customers