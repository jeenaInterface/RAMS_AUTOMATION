Feature: Verify Create purchase Order Report

    @purchaseOrderReport @sanity @report @Regression
  Scenario: Admin creates and runs an purchase order report
    Given the admin user is logged into the application
    And selects create purchase order report
    And selects all the filters for purchase order report
    And verifies save functionality for purchase order report
    Then verifies save as functionality for purchase order report
    Then the admin clicks on the run button and the purchase order report should be generated successfully
    Then user click on logout button
    
    @purchaseOrderReportwithFilters @sanity @report @Regression
  Scenario: Admin creates and runs an purchase order report
    Given the admin user is logged into the application
    And selects create purchase order report
    And selects purchase order report with stock number filters
    And verifies save functionality for purchase order report
    Then verifies save as functionality for purchase order report
    Then the admin clicks on the run button and the purchase order report should be generated successfully with applied stock number filters
    Then user click on logout button


    @purchaseOrderReportNewTemplate @sanity @report @Regression
  Scenario: Verify purchase order report template in my report template section
    Given the admin user is logged into the application
    And selects create purchase order report
    And selects all the filters for purchase order report
    And verifies save functionality for purchase order report
    Then verifies save as functionality for purchase order report
    Then the admin clicks on the run button and the purchase order report should be generated successfully
    Then go to report template and verifies the purchase order report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to purchase order report details page
    Then click on download icon and verifies the purchase order report is downloaded successfully
    Then click on schedule icon and verifies the purchase order report is scheduled successfully
    Then click on delete icon and verifies the purchase order report is deleted successfully
    Then user click on logout button