Feature: Verify Create Payroll Report

    @payrollReport @sanity @report
  Scenario: Admin creates and runs create payroll report
    Given the admin user is logged into the application
    And selects create payroll report
    And selects all the filters of payroll report
    And verifies save functionality of payroll report
    Then verifies save as functionality of payroll report
    Then the admin clicks on the run button and the payroll report should be generated successfully
