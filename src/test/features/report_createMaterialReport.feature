Feature: Verify Create material Report

    @materialReport @sanity @report
  Scenario: Admin creates and runs create material report
    Given the admin user is logged into the application
    And selects create material report
    And selects all the filters of material report
    And verifies save functionality of material report
    Then verifies save as functionality of material report
    Then the admin clicks on the run button and the material report should be generated successfully

    @materialReportStockNumber @sanity @report
  Scenario: Admin creates and runs create material report
    Given the admin user is logged into the application
    And selects create material report
    And selects material report with stock number filtration
    And verifies save functionality of material report
    Then verifies save as functionality of material report
    Then the admin clicks on the run button and the material report should be generated successfully with applied stock number filter