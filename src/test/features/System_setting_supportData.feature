Feature: Support Data module

    @AssetGroup @sanity

    Scenario: Verify Create/Edit Support Data - Asset Group functionality

        Given User logged into the application
        Then select Support Data from the system settings menu
        When Click on the create button and fill the asset group form
        And Search for the created asset group code
        And Verify the search result displays the created asset group
        Then open the Asset form and confirm that the newly added Asset Group is available in the dropdown when creating a new asset
        And verify the edit functionality by selecting the created Asset Group in the Support Data form

    @warehouse @sanity

    Scenario: Verify Create/Edit Support Data - wareHouse functionality

        Given User logged into the application
        Then select Support Data from the system settings menu
        When Click on the create button and fill the wareHouse form
        And Search for the created warehouse code
        And Verify the search result displays the created warehouse
        Then open the stock location and confirm that the newly added wareHouse is available in the warehouse dropdown
        And verify the edit functionality by selecting the created warehouse in the Support Data form by changing its status

        @vendorType @sanity

    Scenario: Verify Create/Edit Support Data - vendorType functionality

        Given User logged into the application
        Then select Support Data from the system settings menu
        When Click on the create button and fill the vendorType form
        And Search for the created vendorType code
        And Verify the search result displays the created vendorType
        Then open the vendor and confirm that the newly added vendorType is available in the vendor type dropdown
        And verify the edit functionality by selecting the created vendorType in the Support Data form by changing its status