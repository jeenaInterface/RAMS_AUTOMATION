Feature: Verify Create Inventory Report

    @inventoryReport @sanity @report
  Scenario: Admin creates and runs an inventory report
    Given the admin user is logged into the application
    And selects create inventory report
    And selects all the filters of inventory report
    And verifies save functionality of inventory report
    Then verifies save as functionality of inventory report
    Then the admin clicks on the run button and the inventory report should be generated successfully


  @inventoryReportWithStockNumberFiltration @sanity @report
  Scenario: Admin creates and runs an inventory report with stock number filter
    Given the admin user is logged into the application
    And selects create inventory report
    And selects all the filters of inventory report with stock number filtration
    And verifies save functionality of inventory report
    Then verifies save as functionality of inventory report
    Then the admin clicks on the run button and the inventory report should be generated successfully with applied stock number filter

  @inventoryReportTemplate @sanity @report
  Scenario: Verify created report template in my report template section
    Given the admin user is logged into the application
    And selects create inventory report
    And selects all the filters of inventory report
    And verifies save functionality of inventory report
    Then verifies save as functionality of inventory report
    Then the admin clicks on the run button and the inventory report should be generated successfully
    Then go to report template and verifies the created inventory report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to inventory report details page
    Then click on download icon and verifies the inventory report is downloaded successfully
    Then click on schedule icon and verifies the inventory report is scheduled successfully
    Then click on delete icon and verifies the inventory report is deleted successfully