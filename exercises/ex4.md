# Engaging a Customer
## Motivation
In this exercise will get acquainted with SAP CDP Customer Journeys: a workflow that can initiate customer engagement by activating actions of connected destination applications.
We'll also discuss how to manage access to outbound customer data via its action purposes.

## Walkthrough
* Create a new segment: VIP
  * Values:
    * Gold, if Total Spend > 100
    * Silver, if Total Spend > 50
    * Bronze, if Total Spend > 20
* Go to the `Processing Purposes` and configure their `Outbound Data Governance`:
  * `service`
    * Check all fields under the `Profile` schema
  * `marketing`
    * Check only `primaryEmail`, `firstName`, `lastName`
* Connect a new Destination: SAP Emarsys Customer Engagement
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/740254e05a4e4e5f9872c9416c0a63c0.html
  * Configuration:
    * username: sap_cdp_test009
    * secret: 19ZeNyuLL8JAUi1EkAjh
    * Emarsys Key identifier (key id): 3
* Edit "Create a contact" action:
  * Settings screen:
    * Processing Purposes:
      * service
      * marketing
  * Mapping screen:
    * firstName -> First Name
    * lastName -> Last Name
    * primaryEmail -> Email
* Edit "Trigger an external event" action:
  * Settings screen:
    * Rename to: Trigger Email Campaign
    * Processing Purposes:
      * marketing
    * Configuration:
      * External event trigger id: 2139
  * Mapping screen:
    * primaryEmail -> external_id
    * [Do not change the rest of the mapped fields]
* Make sure to enable both actions
* Go to the CX Flows screen:
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/dffd9497a3c74ec9b0808ede7fdf4e45.html
  * We'll create 2 CX Flows:
    * "Sync new customers"
      * Trigger: Customer Update
        * Status: created
      * Flow:
        * Create a Contact in Emarsys Action
    * "VIP Gold"
      * Trigger: Segment Membership
        * Segment: VIP
        * Scenario: Entered
        * Values: GOLD, SILVER
      * Flow:
        * Trigger Email Campaign Action
* Now customers that have ordered in high enough sum, will enter our email campaign!
