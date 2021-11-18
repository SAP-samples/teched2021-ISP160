# Collecting Orders
## Motivation
In this exercise we'll introduce SAP CDP's data governance and utilize it in order to only collect Orders if consent is given.

## Walkthrough
* Define 2 `processing purposes`:
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/11e28c4e567f462a940792dbd5edf041.html
  * `service`
    * external id: `service`
  * `marketing`
    * external id: `myconsent`
* Edit "Get full accounts in batch" event from the previous exercise:
  * Settings screen:
    * Granted Processing Purposes: `service`
  * Mapping screen:
    * Map the following fields to the Privacy schema:
      * preferences.externalId -> "Processing Purposes".externalId
      * preferences.status -> "Processing Purposes".status
      * preferences.date -> "Processing Purposes".date
* Connect a new Source: WooCommerce Application
  * https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/1d4137e313d8413da6a9b508c87a47bf.html
  * Configuration:
    * username: ck_fd2fe536455f1d9891e0603b178139a3f3ddaa50
    * password: cs_c216cd8894207bf54adbbfb433884c23227944f8
    * api base url: https://myshop.gigya-cs.com/
* Edit its "Listen for new or updated order in real-time" event:
  * Settings screen:
    * Set its Required Processing Purposes to `marketing`
  * Mapping screen:
    * billing.email -> profile.primaryEmail
    * line_items.total -> orders.amount
    * line_items.product -> orders.name
  * Listener screen:
    * Set the authentication type to be via query string
    * Copy the Webhook URL
    * Configure it in WooCommerce:
      * https://myshop.gigya-cs.com/wp-login.php?isadmin=true 
      * Login credentials:
        * username: teched
        * pwd: Gigya123
      * Then go to this url:
        * https://myshop.gigya-cs.com/wp-admin/admin.php?page=wc-settings&tab=advanced&section=webhooks
        * Configure a new webhook for "order updated" to the copied URL
  * Orders will now be synced into SAP CDP only for customers that granted consent for the marketing purpose
