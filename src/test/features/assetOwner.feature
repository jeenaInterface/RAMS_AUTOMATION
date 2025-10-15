Feature: Asset Owner module

  @assetOwner @sanity
  Scenario: Verify Create/Edit Asset Owner functionality
    Given User logged into the application
    Then select Asset Owner from the system settings menu
    When Click on the create button
    And Enter all the fields in asset owner form
    And Click on the save button in asset owner form
    Then Verify the asset owner is created in the inquire list
    And Verify edit functionality in asset owner form
    Then Verify action Log in asset owner form
