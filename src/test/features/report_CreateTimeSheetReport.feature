Feature: Verify Create Timesheet Report

  @timesheetReport @sanity @report
  Scenario: Admin creates and runs timesheet report
    Given the admin user is logged into the application
    And selects create timesheet report
    And selects all the filters for timesheet report
    And verifies save functionality for timesheet report
    Then verifies save as functionality for timesheet report
    Then the admin clicks on the run button and the timesheet report should be generated successfully
    Then user click on logout button

