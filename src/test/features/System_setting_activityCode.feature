Feature: UOM Conversion Factor module

    @activityCode @sanity @sysyemsettings

    Scenario: Verify Create/Edit/Delete Activity Code functionality

        Given User logged into the application
        Then select Activity Code from the system settings menu
        When Click on the create button and fill the Activity Code details
        And Search for the created Activity Code
        And Verify the search result displays the Activity Code
        And verify the edit functionality by selecting the created Activity Code
        Then verify the delete functionality by selecting the created Activity Code
        Then Verify Action log for Activity Code module
