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
    

  @myReportTemplate @sanity @report
  Scenario: Verify created report template in my report template section
    Given the admin user is logged into the application
    And selects create asset report
    And selects asset number filter for asset report
    And verifies save functionality
    Then verifies save as functionality
    Then the admin clicks on the run button and verifies the report is generated successfully with applied asset number filter
    Then go to report template and verifies the created report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to report details page
    Then click on download icon and verifies the report is downloaded successfully
    Then click on schedule icon and verifies the report is scheduled successfully
    Then click on delete icon and verifies the report is deleted successfully
    Then user click on logout button
    
    
