Feature: Shift and Holiday module
    @Shift @sanity @sysyemsettings

    Scenario: Verify Edit/ActionLog functionalities

        Given User logged into the application
        Then select shift and holiday module from the system settings menu
        When Define overtime work for weekend and save
        And Revert back the overtime work for weekend and save
        Then Verify action log functionality in shift and holiday module
        Then Select holiday calendar
        And Select any date and click on save button
        Then Verify the confirmation message is displayed
        
