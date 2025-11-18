Feature: Add, Update, and Search Functionalities in Tariff Module

  @Tariff @sanity

  Scenario: Manage Tariffs
    Given the admin user is logged into the application
    When the admin navigates to the create tariff page
    And creates a new tariff with the required details
    Then the admin searches for the created tariff by tariff name
    And verifies that the search results display the correct tariff

    When the admin updates the created tariff with new details
    Then the admin verifies that the updated details are reflected in the tariff list

    And the admin verifies the copy functionality
    And the admin verifies the New button functionality
    And the admin verifies the action log functionality
