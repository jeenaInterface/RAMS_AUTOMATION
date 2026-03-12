Feature:  Interface Mapping Module

    @AP @sanity @sysyemsettings @RegressionSuit1

    Scenario: Verify Create/Edit/Delete/ActionLog functionalities in Interface Mapping Module - AR

        Given User logged into the application
        Then select  Interface Mapping module from the system settings menu
        Then Select AR tab and click on create button to create new Interface Mapping and save
        Then verify created Interface Mapping is displayed in the grid
        And verify the edit functionality by selecting the created Interface Mapping
        Then verify the delete functionality by selecting the created Interface Mapping
        Then Verify action log functionality in Interface Mapping module - AR
        
    @AP @sanity @sysyemsettings @RegressionSuit1

    Scenario: Verify Create/Edit/Delete/ActionLog functionalities in Interface Mapping Module - AP  
        Given User logged into the application
        Then select  Interface Mapping module from the system settings menu
        Then Select AP tab and click on create button to create new Interface Mapping and save
        Then verify created Interface Mapping is displayed in the grid -AP
        And verify the edit functionality by selecting the created Interface Mapping - AP
        Then verify the delete functionality by selecting the created Interface Mapping -AP
        Then Verify action log functionality in Interface Mapping module - AP