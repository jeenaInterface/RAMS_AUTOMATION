Feature: Verify Create invoice matching Report

    @invoiceMatchingReport @sanity @report
  Scenario: Admin creates and runs create invoice matching report
    Given the admin user is logged into the application
    And selects create invoice matching report
    And selects all the filters of invoice matching report
    And verifies save functionality of invoice matching report
    Then verifies save as functionality of invoice matching report
    Then the admin clicks on the run button and the invoice matching report should be generated successfully
