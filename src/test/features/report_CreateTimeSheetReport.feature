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

  @timesheetReportTemplate @sanity @report
  Scenario: Verify timesheet report template in my report template section
    Given the admin user is logged into the application
    And selects create timesheet report
    And selects all the filters for timesheet report
    And verifies save functionality for timesheet report
    Then verifies save as functionality for timesheet report
    Then the admin clicks on the run button and the timesheet report should be generated successfully
    Then go to report template and verifies the timesheet report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to timesheet report details page
    Then click on download icon and verifies the timesheet report is downloaded successfully
    Then click on schedule icon and verifies the timesheet report is scheduled successfully
    Then click on delete icon and verifies the timesheet report is deleted successfully
    Then user click on logout button
