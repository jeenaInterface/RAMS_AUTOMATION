Feature: UOM Conversion Factor module

    @UOM @sanity @sysyemsettings

    Scenario: Verify Create/Edit/Delete UOM Conversion Factor functionality

        Given User logged into the application
        Then select UOM Conversion Factor from the system settings menu
        When Click on the create button and fill the UOM Conversion Factor details
        And Search for the created UOM Conversion Factor
        And Verify the search result displays the created UOM Conversion Factor
        And verify the edit functionality by selecting the created UOM Conversion Factor
        Then verify the delete functionality by selecting the created UOM Conversion Factor
