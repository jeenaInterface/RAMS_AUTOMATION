Feature: Verify Create material Report

    @materialReport @sanity @report @Regression
  Scenario: Admin creates and runs create material report
    Given the admin user is logged into the application
    And selects create material report
    And selects all the filters of material report
    And verifies save functionality of material report
    Then verifies save as functionality of material report
    Then the admin clicks on the run button and the material report should be generated successfully

    @materialReportStockNumber @sanity @report @Regression
  Scenario: Admin creates and runs create material report with stock number filtration
    Given the admin user is logged into the application
    And selects create material report
    And selects material report with stock number filtration
    And verifies save functionality of material report
    Then verifies save as functionality of material report
    Then the admin clicks on the run button and the material report should be generated successfully with applied stock number filter

  @materialReportNewTemplate @sanity @report @Regression
  Scenario: Verify material report template in my report template section
    Given the admin user is logged into the application
    And selects create material report
    And selects all the filters of material report
    And verifies save functionality of material report
    Then verifies save as functionality of material report
    Then the admin clicks on the run button and the material report should be generated successfully
    Then go to report template and verifies the material report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to material report details page
    Then click on download icon and verifies the material report is downloaded successfully
    Then click on schedule icon and verifies the material report is scheduled successfully
    Then click on delete icon and verifies the material report is deleted successfully
