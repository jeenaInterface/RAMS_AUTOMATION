Feature: Add, Update, and Search Functionalities in order Module

    @createPurchaseOrder @sanity
    Scenario: Verify create and update purchase order functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields and clicks on the save button
        Then the purchase order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then updates the description, adds one more stock detail, and verifies the update is correct
        Then verifies the value in the receive status field in PO
        Then verifies the print functionality
        Then verifies the email functionality
        Then Verify Cancel functionality
        Then verifies the action log in the purchase order

    @createexternalRebuildOrder @sanity
    Scenario: Verify create and update external rebuild order functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        Then select external rebuild option
        Then the purchase order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then updates the description, adds one more stock detail in external rebuild order
        Then verifies the value in the receive status field
        Then verifies the print functionality
        Then verifies the email functionality
        Then Verify Cancel functionality
        Then verifies the action log in the external purchase order

    @createInternalRebuildOrder @sanity
    Scenario: Verify create and update internal rebuild order functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        Then select internal rebuild option
        Then the purchase order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then updates the description and verifies the update is correct
        Then verifies the value in the receive status field in internal RO
        Then Verify Cancel functionality
        Then verifies the action log in the Internal purchase order


@search @sanity
Scenario: Search purchase orders
    Given the admin user is logged into the application
    When the admin navigates to the inquire order page

    Then the admin searches for the orders created on the current date
    And verifies that the search results display the orders created on the current date

    Then the admin searches by Order Request Date
    And verifies that the search results display based on the Order Request Date

    Then the admin searches by Order Status
    And verifies that the search results display based on the Order Status

    Then the admin searches by Vendor
    And verifies that the search results display based on the Vendor

    Then the admin searches by Category
    And verifies that the search results display based on the Category

    Then the admin searches by Asset Number
    And verifies that the search results display based on the Asset Number

    Then the admin searches by Receive Status
    And verifies that the search results display based on the Receive Status

    Then the admin searches by Matched Status
    And verifies that the search results display based on the Matched Status

    Then the admin searches by Order Type
    And verifies that the search results display based on the Order Type

    Then the admin searches by Shop
    And verifies that the search results display based on the Shop

    Then the admin searches by Order Capture Date
    And verifies that the search results display based on the Order Capture Date

    Then the admin searches by Orders with Outstanding Cost
    And verifies that the search results display based on Outstanding Cost

    Then the admin searches by Job Number
    And verifies that the search results display based on the Job Number



@VerifyBatchApproveOrder @sanity
Scenario: Verify batch approve and reject functionalities
    Given the admin user is logged into the application
    Then the admin navigates to the order creation menu
    And enters all the required fields and clicks on the save button
    Then the purchase order number is captured for further use

    Then the admin navigates to the batch approve order page
    And performs batch reject

    Then the admin navigates to the order creation menu
    And enters all the required fields and clicks on the save button
    Then the purchase order number is captured for further use

    Then the admin navigates to the batch approve order page
    And performs batch approve

    Then the admin verifies the refresh button functionality


Scenario: Verify create order and receive functionalities
    Given the admin user is logged into the application
    Then the admin navigates to the order creation menu
    And enters all the required fields and clicks on the save button
    Then the purchase order number is captured for further use

    Then partially receive the order
    And track the receiving document number for further use

    Then the user searches for the newly created order in the inquiry list page
    And verifies the receive status and attaches that status in the report
    And verifies total order quantity and total outstanding quantity

    Then perform full receive
    And the user searches for the newly created order in the inquiry list page
    And verifies the receive status and attaches that status in the report
    And verifies total order quantity and total outstanding quantity after full receive

       