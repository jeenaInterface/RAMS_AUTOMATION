Feature: Tariff module

  @Tariff @sanity

  Scenario: Add/update/search functionalities under Tariff module
    Given the admin user is logged into the application
    When Go to create tariff page
    And Create a new tariff with required details
    Then Verify the newly created tariff is displayed in the tariff list

    When Search for the created tariff using tariff code
    Then Verify the search results display the correct tariff

    When Update the created tariff with new details
    Then Verify the updated details are reflected in the tariff list

    When user click on logout button