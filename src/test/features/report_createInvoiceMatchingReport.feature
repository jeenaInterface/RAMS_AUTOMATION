Feature: Verify Create invoice matching Report

  @invoiceMatchingReport @sanity @report
  Scenario: Admin creates and runs create invoice matching report
    Given the admin user is logged into the application
    And selects create invoice matching report
    And selects all the filters of invoice matching report
    And verifies save functionality of invoice matching report
    Then verifies save as functionality of invoice matching report
    Then the admin clicks on the run button and the invoice matching report should be generated successfully


  @invoiceMatchingReportNewTemplate @sanity @report
  Scenario: Verify invoice matching report template in my report template section
    Given the admin user is logged into the application
    And selects create invoice matching report
    And selects all the filters of invoice matching report
    And verifies save functionality of invoice matching report
    Then verifies save as functionality of invoice matching report
    Then the admin clicks on the run button and the invoice matching report should be generated successfully
    Then go to report template and verifies the invoice matching report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to invoice matching report details page
    Then click on download icon and verifies the invoice matching report is downloaded successfully
    Then click on schedule icon and verifies the invoice matching report is scheduled successfully
    Then click on delete icon and verifies the invoice matching report is deleted successfully
