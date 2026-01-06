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
    
