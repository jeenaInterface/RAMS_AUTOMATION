Feature: Add, Update, and Search Functionalities in Preventive Maintance Module

@MaintainPM   @sanity
Scenario: Create, update, delete and action log functionalities under pm module

    Given the admin user is logged into the application
    When the admin navigates to the maintain PM
    Then Select any asset group
    Then Create a pm for per usage
    Then Click on update button and edit pm name
    Then Create a pm for per calendar
    Then verify action log
    Then delete the entry created for per usage
    Then delete the entry created for per calendar

@createWOWithLatestPM   @sanity
Scenario: Verify whether its able to create an unbillable order with a latest created pm
    Given the admin user is logged into the application
    When the admin navigates to the maintain PM
    Then Select any asset group
    Then Create a pm for per usage
    When Create an unbillable order with latest pm details created
    Then go to inquire unbillable order page and cancel the unbillable order created for pm
    Then go to maintain pm page and delete the entry created for per usage

    @assetUsageScreen   @sanity
Scenario: Verify the last update usage of the asset
    Given the admin user is logged into the application
    Then go to batch update asset usage screen
    Then Edit last usage entry usage
    Then go to create unbillable order and verify the updated pm hour is showing

    @downLoadUsage   @sanity
Scenario: Verify the last update usage of the asset
    Given the admin user is logged into the application
    Then go to batch update asset usage screen
    Then Verify downloadUsage functionality
    Then user click on logout button


@pmScheduleDashBoard   @sanity
Scenario: Verify pm schedule dashboard
        Given the admin user is logged into the application
        When the admin navigates to the maintain PM
        Then Select any asset group
        Then Create a pm for per usage
        When go to batch update asset usage screen to copy last usage
        Then go pm schedule dashboard
        Then verify last update usage, last update date, next pm name and next pm expected
        Then go to maintain pm page and delete the entry created for per usage