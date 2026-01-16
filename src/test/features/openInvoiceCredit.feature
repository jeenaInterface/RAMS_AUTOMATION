Feature: Verify functionalities under Open Invoice/Credit menu

  @createBillableOrder @sanity @bwo
  Scenario: Verify create open Credit functionality under Open Invoice/Credit menu

    Given the admin user is logged into the application
    When Go to Create open Invoice/Credit menu
    And Create a new open credit by entering all the required fields and save it as draft
    Then Capture the open credit number
    When Go to Inquire open Invoice/Credit menu
    Then Search for the created open credit and verify the details entered while creating the open credit