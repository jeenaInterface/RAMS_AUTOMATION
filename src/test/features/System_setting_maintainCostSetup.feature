Feature: Maintain cost setup module

    @cost @sanity @sysyemsettings @RegressionSuit1

    Scenario: Verify Edit/Delete Maintain cost setup functionality

        Given User logged into the application
        Then select Maintain cost setup from the system settings menu
        And verify the edit functionality by selecting the created Maintain cost setup
        Then verify the delete functionality by selecting the created Maintain cost setup
        Then Verify Action log for Maintain cost setup  module
