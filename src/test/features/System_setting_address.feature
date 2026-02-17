Feature: Address module
    @address @sanity @sysyemsettings

    Scenario: Verify Edit/ActionLog functionalities

        Given User logged into the application
        Then select Address module from the system settings menu
        Then Edit ship tp addess and bill to address field
        And Revert back the changes and save
        Then Verify action log functionality in addess module

