Feature: Verify Create receiving Report

  @receivingReport @sanity @report
  Scenario: Admin creates and runs receiving report
    Given the admin user is logged into the application
    And selects create receiving report
    And selects all the filters for receiving report
    And verifies save functionality for receiving report
    Then verifies save as functionality for receiving report
    Then the admin clicks on the run button and the receiving report should be generated successfully
    Then user click on logout button

