Feature: Verify functionalities under Open Invoice/Credit menu

  @createOpenCredit @sanity @bwo @Regression
  Scenario: Verify create open Credit functionality under Open Invoice/Credit menu

    Given the admin user is logged into the application
    When Go to Create open Invoice Credit menu
    And Create a new open credit by entering all the required fields and save it as draft
    Then Go to Inquire open Invoice Credit menu and Search for the created open credit
    Then verify save functionality for open credit
    Then Capture the open credit number
    Then verify close functionality for open credit
    Then verify cancel functionality for open credit
    Then verify action log functionality for open credit

  @createOpenCreditPost @sanity @bwo @Regression
  Scenario: Verify post functionality of open Credit

    Given the admin user is logged into the application
    When Go to Create open Invoice Credit menu
    And Create a new open credit by entering all the required fields and save it as draft
    Then Go to Inquire open Invoice Credit menu and Search for the created open credit
    Then verify save functionality for open credit
    Then Capture the open credit number
    Then verify close functionality for open credit
    Then go to batch post and do batch post for above open credit
    Then check post result of open credit


  @createOpenInvoicePost @sanity @bwo @Regression
  Scenario: Verify post functionality of open invoice

    Given the admin user is logged into the application
    When Go to Create open Invoice Credit menu
    And Create a new open invoice by entering all the required fields and save it as draft
    Then Go to Inquire open Invoice Credit menu and Search for the created open credit
    Then verify save functionality for open invoice
    Then Capture the open invoice number
    Then verify close functionality for open invoice
    Then go to batch post and do batch post for above open invoice
    Then check post result of open invoice
