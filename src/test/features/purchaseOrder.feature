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


    @searchPO @sanity
    Scenario: Search purchase orders
        Given the admin user is logged into the application
        When the admin navigates to the inquire order page

        Then the admin searches for the orders created on the current date
        And verifies that the search results display the orders created on the current date

        Then the admin searches by Order Request Date
        And verifies that the search results display based on the Order Request Date

        Then the admin searches by Order Status
        And verifies that the search results display based on the Order Status

        Then the admin searches for an existing po by vendor '1080233500'
        And verifies that the PO search results display the correct vendor '1080233500'

        Then the admin searches by Category

        Then the admin searches by Receive Status
        And verifies that the search results display based on the Receive Status

        Then the admin searches by Order Type
        And verifies that the search results display based on the Order Type

        Then the admin searches by Shop
        And verifies that the search results display based on the Shop



    @VerifyBatchRejectOrder @sanity
    Scenario: Verify batch reject functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        And performs batch reject
        Then verify the status of the po

    @VerifyBatchApproveOrder @sanity
    Scenario: Verify batch approve functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        And performs batch approve
        Then verify the status of the po

    @VerifyBatchRejectOrderFromForm @sanity
    Scenario: Verify batch reject functionality for orders
        Given the admin user is logged into the application
        When the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        Then verify the status of the po
        When the admin navigates to the batch approve order page
        And performs a batch reject by selecting the order
        And the user searches for the newly created order in the inquiry list page
        Then verify the status of the po

    @VerifyBatchApproveOrderFromForm @sanity
    Scenario: Verify batch approve functionality for orders
        Given the admin user is logged into the application
        When the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        Then verify the status of the po
        When the admin navigates to the batch approve order page
        And performs a batch approve by selecting the order
        And the user searches for the newly created order in the inquiry list page
        Then verify the status of the po


    @VerifyOrderLinkInBatch @sanity
    Scenario: Verify navigation on clicking purchase order number link
        Given the admin user is logged into the application
        When the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        Then verify the status of the po
        When the admin navigates to the batch approve order page

        When the admin navigates to the batch approve order page
        Then the system verifies navigation to the corresponding purchase order screen once click on the link

    @VerifyMultipleOrderApproval @sanity
    Scenario: Verify multiple purchase order approval functionality
        Given the admin user is logged into the application
        When the admin navigates to the order creation menu
        And fills in all required fields for order approval
        And saves the order
        Then the purchase order number is captured for further use

        When the admin navigates to the batch approve order page
        And selects multiple purchase orders
        And performs batch approval on the selected orders
        Then the system verifies that all selected orders are approved successfully

    Scenario: Verify create order and receive functionalities
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields and clicks on the save button
        Then the purchase order number is captured for further use

        Then partially receive and review the order
        And track the receiving document number for further use

        Then the user searches for the newly created order in the inquiry list page
        And verifies the receive status and attaches that status in the report
        And verifies total order quantity and total outstanding quantity

        Then perform full receive
        And the user searches for the newly created order in the inquiry list page
        And verifies the receive status and attaches that status in the report
        And verifies total order quantity and total outstanding quantity after full receive

    Scenario: Verify cancel and action log functionalities in receiving material page
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields and clicks on the save button
        Then the purchase order number is captured for further use

        Then partially receive the order and review
        And track the receiving document number for further use
        Then verify the action Log
        Then the user searches for the newly created order in the inquiry list page
        And verifies the receive status and attaches that status in the report
        And verifies total order quantity and total outstanding quantity

        Then go to inquire material receive screen
        Then search the material receive and do cancel

         Then the user searches for the newly created order in the inquiry list page
        And verifies the receive status and attaches that status in the report
        And verifies total order quantity and total outstanding quantity

        Scenario: Verify search functionalities in inquire material receive page
        Given the admin user is logged into the application
        Then the admin navigates to inquire material receive screen
        And verify the search by po number
        Then verify the search by Pack Slip No.
        Then verify the search by Receiving Date
        Then verify the serach by Vendor
        Then verify the serach by Stock No.
        Then verify the serach by Status
        Then verify the serach by Order Type
        Then verify the serach by Receiving Doc. No.



   Scenario: Verify Batch Review Receiving functionalities 
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields and clicks on the save button
        Then the purchase order number is captured for further use

        Then partially receive the order
        And track the receiving document number for further use
        Then go to batch review receiving screena and search by payslip number
        Then the user searches for the newly created order in the inquiry list page
        And verifies the receive status and attaches that status in the report
        And verifies total order quantity and total outstanding quantity