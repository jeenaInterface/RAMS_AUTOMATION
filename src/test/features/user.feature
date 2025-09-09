Feature: Admin module

  @user @sanity
  Scenario: Verify Create/Edit User functionality
    Given User logged into the application
    Then select user from the system settings menu
    When Click on the add button
    And Enter all the fields
    And Click on the save button
    Then Verify the user is created in the user list
    And Verify edit functioanlity
    Then Verify action Log
