Feature:  Invoice Matching Tolerance module
    @invoice @sanity

    Scenario: Verify Edit/Reset/ActionLog functionalities in Invoice Matching Tolerance

        Given User logged into the application
        Then select  Invoice Matching Tolerance module from the system settings menu
        Then Edit Freight Max Limitation and click on save
        And Reset Freight Max Limitation to previous value - 10000 and save
        Then verify all the fields are empty on clicking reset button
        Then Verify action log functionality in Invoice Matching Tolerance module