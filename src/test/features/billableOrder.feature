Feature: Verify functionalities under Billable Work Order

  @createBillableOrder @sanity @bwo
  Scenario: Verify billable work order creation
    Given the admin user is logged into the application
    When the admin navigates to the billable work order creation menu
    And enters all the required fields for billable work order and clicks on the Draft button
    Then the billable work order number is captured
    And verify the status of the billable work order is 'Drafted'
    # When the admin click on complete button
    # Then verify the status of the billable work order is 'Completed'
    # Then the admin click on Review button
    # Then verify the status of the billable work order is 'Reviewed'
    # When the admin click on close button
    # Then verify the status of the billable work order is 'Closed'
    
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
    And enters all the required fields for billable work order after copy and add multiple activity code
    When the admin click on complete, review and close the order
    Then Then verify mnr invoice is generated from the closed billable work order