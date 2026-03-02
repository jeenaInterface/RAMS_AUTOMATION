Feature: Verify Create invoiceCredit Report

    @invoiceCreditReport @sanity @report
  Scenario: Admin creates and runs create invoiceCredit report
    Given the admin user is logged into the application
    And selects create invoiceCredit report
    And selects all the filters of invoiceCredit report
    And verifies save functionality of invoiceCredit report
    Then verifies save as functionality of invoiceCredit report
    Then the admin clicks on the run button and the invoiceCredit report should be generated successfully
