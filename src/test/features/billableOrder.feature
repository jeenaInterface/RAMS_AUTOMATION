Feature: Verify functionalities under Billable Work Order

  @createBillableOrder @sanity @bwo
  Scenario: Verify billable work order creation
    Given the admin user is logged into the application
    When the admin navigates to the billable work order creation menu
    And enters all the required fields for billable work order and clicks on the Draft button
    When the admin click on complete button after draft
    Then verify the status of the billable work order is Completed
    Then the billable work order number is captured
    Then Go to Batch review billable work order and review the created billable work order after completion
    Then Go to Inquire billable work order and verify the status is Reviewed
    Then Go to Batch close billable work order and close the created billable work order after review
    Then Go to Inquire billable work order and verify the status is Closed

  @AllBO @sanity @bwo
  Scenario: Verify billable work order copy, cancel, new, print, email and save functionalities
    Given the admin user is logged into the application
    When the admin navigates to the Inquire Billable Work Order menu
    And Opens an existing billable work order 'CH397015'
    Then Clicks on the Copy button to duplicate the billable work order
    And enters all the required fields for billable work order after copy and clicks on the Draft button
    When the admin click on complete button
    Then verify the status of the billable work order is Completed
    Then the billable work order number is captured
    Then the admin click on review button
    Then verify the status of the billable work order is Reviewed
    Then Click on Return to complete button
    Then verify the status of the billable work order is Completed
    Then the admin click on review button
    Then verify the status of the billable work order is Reviewed
    When the admin click on close button
    Then verify the status of the billable work order is Closed
    Then the admin click on cancel button
    Then verify the status of the billable work order is Cancelled
    Then verify print draft invoice functionality
    Then verify Email draft invoice functionality
    Then verify action logged
    Then Verify New button functionality


  @ReviewBO @sanity @bwo
  Scenario: Verify billable work order batch review and batch close functionalities
    Given the admin user is logged into the application
    When the admin navigates to the Inquire Billable Work Order menu
    And Opens an existing billable work order 'CH397015'
    Then Clicks on the Copy button to duplicate the billable work order
    And enters all the required fields for billable work order after copy and clicks on the Draft button
    When the admin click on complete button
    Then verify the status of the billable work order is Completed
    Then the billable work order number is captured
    Then verify the status of the billable work order is Completed
    Then Go to Batch review billable work order and review the created billable work order
    Then Go to Inquire billable work order and verify the status is Reviewed
    Then Go to Batch close billable work order and close the created billable work order
    Then Go to Inquire billable work order and verify the status is Closed

  @mnr @sanity @bwo
  Scenario: Verify mnr invoice generation from billable work order
    Given the admin user is logged into the application
    When the admin navigates to the Inquire Billable Work Order menu
    And Opens an existing billable work order 'CH397015'
    Then Clicks on the Copy button to duplicate the billable work order
    And enters all the required fields for billable work order after copy and clicks on the Draft button
    When the admin click on complete, review and close the order
    Then verify mnr invoice is generated from the closed billable work order

  @searchInquireBO @sanity @bwo
  Scenario: Verify mnr invoice generation from billable work order
    Given the admin user is logged into the application
    And searches for a billable work order using the asset 'GACZ401537' and verifies the search results
    Then searches for a billable work order using the billable asset description '40CZ - 40' and verifies the search results
    Then searches for a billable work order using the asset group 'CH - Chassis' and verifies the search results
    Then searches for a billable work order using the billing party 'DCL - Direct Chassis Link' and verifies the search results
# Then searches for a billable work order using the work order status 'Draft' and verifies the search results
# Then searches for a billable work order using shop and verifies the search results
# Then searches for a billable work order using shift and verifies the search results
# Then searches for a billable work order using repair date range and verifies the search results
