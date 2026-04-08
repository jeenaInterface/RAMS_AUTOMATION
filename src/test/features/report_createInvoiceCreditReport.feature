Feature: Verify Create invoice Credit Report

    @invoiceCreditReport @sanity @report @Regression
  Scenario: Admin creates and runs create invoice Credit report
    Given the admin user is logged into the application
    And selects create invoiceCredit report
    And selects all the filters of invoiceCredit report
    And verifies save functionality of invoiceCredit report
    Then verifies save as functionality of invoiceCredit report
    Then the admin clicks on the run button and the invoiceCredit report should be generated successfully

    @invoiceCreditReportTemplate @sanity @report @Regression
  Scenario: Verify Invoice credit report template in my report template section
    Given the admin user is logged into the application
    And selects create invoiceCredit report
    And selects all the filters of invoiceCredit report
    And verifies save functionality of invoiceCredit report
    Then verifies save as functionality of invoiceCredit report
    Then the admin clicks on the run button and the invoiceCredit report should be generated successfully
    Then go to report template and verifies the created invoice Credit report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to invoice Credit report details page
    Then click on download icon and verifies the invoice Credit report is downloaded successfully
    Then click on schedule icon and verifies the invoice Credit report is scheduled successfully
    Then click on delete icon and verifies the invoice Credit report is deleted successfully