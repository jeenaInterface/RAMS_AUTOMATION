Feature: UOM Conversion Factor module

    @UOM @sanity

    Scenario: Verify Create/Edit Support Data - Asset Group functionality

        Given User logged into the application
        Then select Support Data from the system settings menu
        When Click on the create button and fill the asset group form
        And Search for the created asset group code
        And Verify the search result displays the created asset group
        Then open the Asset form and confirm that the newly added Asset Group is available in the dropdown when creating a new asset
        And verify the edit functionality by selecting the created Asset Group in the Support Data form
