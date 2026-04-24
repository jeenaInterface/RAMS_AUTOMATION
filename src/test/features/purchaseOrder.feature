Feature: Add, Update, and Search Functionalities in order Module

    @createPurchaseOrder @sanity @po @Regression
    Scenario: Verify create and update purchase order functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields and clicks on the save button
        Then the purchase order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then updates the description, adds one more stock detail, and verifies the update is correct
        Then verifies the value in the receive status field in Purchase Order
        Then verifies the print functionality
        Then verifies the email functionality
        Then Verify Cancel functionality
        Then verifies the action log in the purchase order

    @createexternalRebuildOrder @sanity @po @Regression
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
        Then Verify Cancel functionality in external RO
        Then verifies the action log in the external purchase order

    @createInternalRebuildOrder @sanity @po @Regression
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


    @searchPO @sanity @po @Regression
    Scenario: Search purchase orders @Regression
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

    @VerifyBatchRejectOrder @sanity @po @Regression
    Scenario: Verify batch reject functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        And performs batch reject
        Then verify the status of the po

    @VerifyBatchApproveOrder @sanity @po @Regression
    Scenario: Verify batch approve functionality
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        And performs batch approve
        Then verify the status of the po

    @VerifyBatchRejectOrderFromForm @sanity @po @Regression
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

    @VerifyBatchApproveOrderFromForm @sanity @po @Regression
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


    @VerifyOrderLinkInBatch @sanity @po @Regression
    Scenario: Verify navigation on clicking purchase order number link
        Given the admin user is logged into the application
        When the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        Then verify the status of the po
        When the admin navigates to the batch approve order page
        Then the system verifies navigation to the corresponding purchase order screen once click on the link

    @VerifyMultipleOrderApproval @sanity @po @Regression
    Scenario: Verify multiple purchase order approval functionality
        Given the admin user is logged into the application
        When the admin navigates to the order creation menu
        And enters all the required fields for approval and clicks on the save button
        Then the purchase order number is captured
        Then verify the status of the po

        When the admin navigates to the batch approve order page
        And selects multiple purchase orders and performs batch approval on the selected orders
        Then the system verifies that all selected orders are approved successfully
        


    @createInternalRebuildOrderUnbillableOrder @sanity @po @Regression
    Scenario: Verify create internal rebuild order and map to unbillable order
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        Then select internal rebuild option
        Then the purchase order number is captured
        Then Go to unbillable order page and map the internal rebuild order
        Then the unbillable work order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then verifies the retail price is updated in internal rebuild order
        Then Do receive material for internal RO and review for the created order
        Then verifies the receive status value is updated to Fully Received
        Then cancel the material receive for the internal rebuild order
        Then verifies the receive status value is updated to Not Received
        Then Do receive material for internal RO and review for the created order
        Then verifies the receive status value is updated to Fully Received
        Then go to material return page and do the material return for the internal rebuild order


    @verifyInternalRebuildOrderUnbillableOrderValidations @sanity @po @Regression
    Scenario: Verify internalRebuild order validations in unbillable order
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        Then select internal rebuild option
        Then the purchase order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then Navigate to the Unbillable Order page and select a stock number
        Then Click the Complete button and verify hour validations appear
        Then Enter the activity code and hours, then click Complete and verify internal RO validations
        Then Select an internal RO, click Complete without selecting a stock number, and confirm the validation message for missing stock number is displayed
        Then Finally, select a stock number and click Complete
        Then the unbillable work order number is captured

    @CreateUnbillableOrderHavingNormalOrderAndInternalRO @sanity @po @Regression
    Scenario: Create unbillable order having normal order and internal RO
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        Then select internal rebuild option
        Then the purchase order number is captured
        Then the user searches for the newly created order in the inquiry list page
        Then Go to unbillable order page and add normal order and internal RO
        Then the unbillable work order number is captured

    @POReportContent @sanity @po @Regression
    Scenario: Verify the created PO is displayed in the PO report
        Given the admin user is logged into the application
        Then the admin navigates to the order creation menu
        And enters all the required fields and clicks on the save button
        Then the purchase order number is captured
        Then the user navigates to the PO report and searches for the created PO
        Then verifies that the created PO is displayed in the search results of the PO report