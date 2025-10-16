Feature: Vendor module

  @Vendor @sanity
  Scenario: Verify Create/Edit Vendor functionality
    Given User logged into the application
    Then select Vendor from the system settings menu
    When Click on the create button in vendor form
    And Enter all the fields in Vendor form
    And Click on the save button in Vendor form
    Then Verify the Vendor is created in the inquire list
    And Verify edit functionality in Vendor form
    Then Verify action Log in Vendor form
    Then Verify page is resting and opening the create vendor form on clicking the Add button

