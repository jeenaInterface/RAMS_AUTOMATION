
Feature: Verify work order Report   

  @workOrderReport @sanity @report
  Scenario: Admin creates and runs work order report
    Given the admin user is logged into the application
    And selects create work order report
    And selects all the filters for work order report
    And verifies save functionality for work order report
    Then verifies save as functionality for work order report
    Then the admin clicks on the run button and the work order report should be generated successfully
    Then user click on logout button

