
Feature: Verify Tariff Discrepancy Report   

  @tariffDiscrepancyReport @sanity @report
  Scenario: Admin creates and runs tariff discrepancy report
    Given the admin user is logged into the application
    And selects create tariff discrepancy report
    And selects all the filters for tariff discrepancy report
    And verifies save functionality for tariff discrepancy report
    Then verifies save as functionality for tariff discrepancy report
    Then the admin clicks on the run button and the tariff discrepancy report should be generated successfully
    Then user click on logout button