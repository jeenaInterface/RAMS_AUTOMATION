Feature: Stock Location module

    @StockLocation @sanity

    Scenario: Verify Create/Edit/delete stock location functionality

        Given User logged into the application
        Then select stock location from the system settings menu
        When Click on the create button and fill stock location details
        And Search for the created stock location
        Then Verify the search result displays the created stock location
        And Delete the created stock location
        And Verify the deleted stock location is not displayed in the search result