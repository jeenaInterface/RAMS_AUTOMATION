Feature: Verify Create Asset Report

  @assetReport @sanity @report
  Scenario: Admin creates and runs an asset report
    Given the admin user is logged into the application
    And selects create asset report
    And selects all the filters
    And verifies save functionality
    Then verifies save as functionality
    Then the admin clicks on the run button and the report should be generated successfully
    Then user click on logout button

  @assetReportWithAssetNumberFilter @sanity @report
  Scenario: Admin creates and runs an asset report with asset number filter
    Given the admin user is logged into the application
    And selects create asset report
    And selects asset number filter for asset report
    And verifies save functionality
    Then verifies save as functionality
    Then the admin clicks on the run button and verifies the report is generated successfully with applied asset number filter
    Then user click on logout button
    
    
