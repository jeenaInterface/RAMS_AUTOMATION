Feature: Verify Create user Report

  @userReport @sanity @report
  Scenario: Admin creates and runs user report
    Given the admin user is logged into the application
    And selects create user report
    And selects all the filters for user report
    And verifies save functionality for user report
    Then verifies save as functionality for user report
    Then the admin clicks on the run button and the user report should be generated successfully
    Then user click on logout button

