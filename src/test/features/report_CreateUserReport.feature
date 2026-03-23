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

  @userReporttEMPLATE @sanity @report
  Scenario: Verify USER report template in my report template section
    Given the admin user is logged into the application
    And selects create user report
    And selects all the filters for user report
    And verifies save functionality for user report
    Then verifies save as functionality for user report
    Then the admin clicks on the run button and the user report should be generated successfully
    Then go to report template and verifies the user report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to user report details page
    Then click on download icon and verifies the user report is downloaded successfully
    Then click on schedule icon and verifies the user report is scheduled successfully
    Then click on delete icon and verifies the user report is deleted successfully
    Then user click on logout button
