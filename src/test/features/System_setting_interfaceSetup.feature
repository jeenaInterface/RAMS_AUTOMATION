Feature:  Interface setup module
    @Interfacesetup @sanity @sysyemsettings

Scenario: Validate Edit and Action Log functionalities in Interface Setup

    Given User logged into the application 
    When the user navigates to the Interface Setup module from the system settings menu  
    And creates and configures a Default Repair Location  
    And Edit the created Repair Location  
    And deletes the created Repair Location  
    And adds a test URL and verifies the test connection functionality  
    Then verifies the action log functionality in the Interface Setup module

