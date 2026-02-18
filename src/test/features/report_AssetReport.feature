Feature: Verify Create Asset Report

  Scenario: Admin creates and runs an asset report
    Given the admin user is logged into the application
    When the admin navigates to the report menu
    And selects create asset report
    And selects all the filters
    And clicks on the save button
    Then the report should be saved successfully
    When the admin clicks on the save as button
    Then the report should be saved successfully with a new name
    When the admin clicks on the run button
    Then the report should be generated successfully