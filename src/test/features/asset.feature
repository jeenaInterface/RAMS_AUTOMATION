Feature: Asset module

  @Asset @sanity
  Scenario: Verify Create/Edit asset functionality
    Given User logged into the application
    Then select asset from the system settings menu
    When Click on the create button in asset form
    And Enter all the fields in asset form
    And Click on the save button in asset form
    Then Verify the asset is created in the inquire list
    And Verify edit functionality in asset form
    Then Verify action Log in asset form


#   Scenario: Verify repair asset functionality
#     Given User logged into the application
#     Then create an unbillable order
#     Then select asset from the system settings menu
#     When Search the asset in the inquire list that used to create the order
#     And Click on the repair button in asset form
#     Then Search with a mechanic in the repair form
#     When Verify the entry is existing in the grid
