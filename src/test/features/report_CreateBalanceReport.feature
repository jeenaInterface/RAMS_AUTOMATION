Feature: Verify Create Material balance Report

    @materialbalanceReport @sanity @report
  Scenario: Admin creates and runs create material balance report
    Given the admin user is logged into the application
    And selects create material balance report
    And selects all the filters of material balance report
    And verifies save functionality of material balance report
    Then verifies save as functionality of material balance report
    Then the admin clicks on the run button and the material balance report should be generated successfully
