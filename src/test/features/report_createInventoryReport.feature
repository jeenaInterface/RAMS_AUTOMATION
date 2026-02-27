Feature: Verify Create Inventory Report

    @inventoryReport @sanity @report
  Scenario: Admin creates and runs an inventory report
    Given the admin user is logged into the application
    And selects create inventory report
    And selects all the filters of inventory report
    And verifies save functionality of inventory report
    Then verifies save as functionality of inventory report
    Then the admin clicks on the run button and the inventory report should be generated successfully
