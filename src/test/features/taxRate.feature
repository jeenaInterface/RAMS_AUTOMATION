Feature: Tax rate module
    @taxRate @sanity

Scenario: Validate search, reset, create and delete functionalities in tax rate module

    Given User logged into the application 
    When the user navigates to the tax rate module from the system settings menu  
    And verify RESET functionalities in tax rate module  
    And verify search functionalities in tax rate module  
    Then create a new tax rate and verify it is displayed in the grid
    And delete the created tax rate and verify it is removed from the grid 
    Then verifies the action log functionality in the tax rate module

