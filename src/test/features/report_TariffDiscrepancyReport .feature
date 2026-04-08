
Feature: Verify Tariff Discrepancy Report

  @tariffDiscrepancyReport @sanity @report @Regression
  Scenario: Admin creates and runs tariff discrepancy report
    Given the admin user is logged into the application
    And selects create tariff discrepancy report
    And selects all the filters for tariff discrepancy report
    And verifies save functionality for tariff discrepancy report
    Then verifies save as functionality for tariff discrepancy report
    Then the admin clicks on the run button and the tariff discrepancy report should be generated successfully
    Then user click on logout button


  @tariffDiscrepancyReportNewTemplate @sanity @report @Regression
  Scenario: Admin creates and runs tariff discrepancy report
    Given the admin user is logged into the application
    And selects create tariff discrepancy report
    And selects all the filters for tariff discrepancy report
    And verifies save functionality for tariff discrepancy report
    Then verifies save as functionality for tariff discrepancy report
    Then the admin clicks on the run button and the tariff discrepancy report should be generated successfully
    Then go to report template and verifies the tariff discrepancy report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to tariff discrepancy report details page
    Then click on download icon and verifies the tariff discrepancy report is downloaded successfully
    Then click on schedule icon and verifies the tariff discrepancy report is scheduled successfully
    Then click on delete icon and verifies the tariff discrepancy report is deleted successfully
    Then user click on logout button