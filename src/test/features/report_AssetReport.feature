Feature: Verify Create Asset Report

    @assetReport @sanity @report
  Scenario: Admin creates and runs an asset report
    Given the admin user is logged into the application
    And selects create asset report
    And selects all the filters
    And clicks on the save button
    Then the report should be saved successfully
    When the admin clicks on the save as button
    Then the report should be saved successfully with a new name
    When the admin clicks on the run button
    Then the report should be generated successfully