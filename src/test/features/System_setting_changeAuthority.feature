Feature: Change authority module

  @changeAuthority @sanity @sysyemsettings

  Scenario: Add and Remove Interface Mapping for a User
    Given the admin user is logged into the application
    When the admin selects "Change Authority" from the system settings menu
    And the admin selects the "Add" operation
    And assigns an interface mapping to a specific user
    Then user click on logout button

    When the assigned user logs into the application
    Then the user should see the assigned interface mapping

    When user click on logout button
    And the admin logs back into the application
    And the admin selects "Change Authority" from the system settings menu
    And the admin selects the "Remove" operation
    And removes the interface mapping from the user
    Then user click on logout button

    When the assigned user logs into the application
    Then the assigned interface mapping should no longer be visible for the user
    Then user click on logout button
    And the admin logs back into the application
    Then Verify reset functionalities
