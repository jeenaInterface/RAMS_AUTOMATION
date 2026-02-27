Feature: Verify Create Material Adjustment Report

    @materialAdjustmentReport @sanity @report
  Scenario: Admin creates and runs create material adjustment report
    Given the admin user is logged into the application
    And selects create material adjustment report
    And selects all the filters of material adjustment report
    And verifies save functionality of material adjustment report
    Then verifies save as functionality of material adjustment report
    Then the admin clicks on the run button and the material adjustment report should be generated successfully
