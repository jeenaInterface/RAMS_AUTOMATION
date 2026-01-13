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
    Then the billable work order number is captured
    And verify the status of the billable work order is Drafted
    When the admin click on complete button
    Then verify the status of the billable work order is Completed
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
    # Then verify action logged
    # Then verify print draft invoice functionality
    # Then verify Email draft invoice functionality
    # Then verify save button functionality
    # Then Verify New button functionality
