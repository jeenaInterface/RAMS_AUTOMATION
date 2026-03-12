Feature: Asset module

  @Asset @sanity @sysyemsettings @RegressionSuit1
  Scenario: Verify Create/Edit asset functionality
    Given User logged into the application
    Then select asset from the system settings menu
    When Click on the create button in asset form
    And Enter all the fields in asset form
    And Click on the save button in asset form
    Then Verify the asset is created in the inquire list
    And Verify edit functionality in asset form
    Then Verify action Log in asset form



