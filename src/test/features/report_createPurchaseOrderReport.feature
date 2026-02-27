Feature: Verify Create purchase Order Report

    @purchaseOrderReport @sanity @report
  Scenario: Admin creates and runs an purchase order report
    Given the admin user is logged into the application
    And selects create purchase order report
    And selects all the filters for purchase order report
    And verifies save functionality for purchase order report
    Then verifies save as functionality for purchase order report
    Then the admin clicks on the run button and the purchase order report should be generated successfully
    Then user click on logout button
    
