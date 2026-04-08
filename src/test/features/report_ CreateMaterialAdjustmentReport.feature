Feature: Verify Create Material Adjustment Report

    @materialAdjustmentReport @sanity @report @Regression
  Scenario: Admin creates and runs create material adjustment report
    Given the admin user is logged into the application
    And selects create material adjustment report
    And selects all the filters of material adjustment report
    And verifies save functionality of material adjustment report
    Then verifies save as functionality of material adjustment report
    Then the admin clicks on the run button and the material adjustment report should be generated successfully

    @materialAdjustmentReportwithFilters @sanity @report @Regression
  Scenario: Admin creates and runs create material adjustment report
    Given the admin user is logged into the application
    And selects create material adjustment report
    And selects material adjustment report with filters
    And verifies save functionality of material adjustment report
    Then verifies save as functionality of material adjustment report
    Then the admin clicks on the run button and the material adjustment report should be generated successfully with applied filters

    @materialAdjustmentReportNewTemplate @sanity @report @Regression
  Scenario: Verify Material Adjustment report template in my report template section
    Given the admin user is logged into the application
    And selects create material adjustment report
    And selects all the filters of material adjustment report
    And verifies save functionality of material adjustment report
    Then verifies save as functionality of material adjustment report
    Then the admin clicks on the run button and the material adjustment report should be generated successfully
    Then go to report template and verifies the created material adjustment report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to material adjustment report details page
    Then click on download icon and verifies the material adjustment report is downloaded successfully
    Then click on schedule icon and verifies the material adjustment report is scheduled successfully
    Then click on delete icon and verifies the material adjustment report is deleted successfully