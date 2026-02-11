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

@batchUpdateAssetUsage   @sanity
Scenario: Verify the last update usage of the asset
    Given the admin user is logged into the application
    When the admin navigates to the maintain PM
    Then Select any asset group
    Then Create a pm for per usage
    When Create an unbillable order having pm and copy the pm hours
    Then go to batch update asset usage screen and verify the last update usage of the asset
    Then verify the pm hours are matching in unbillable order and batch update asset usage screen

@curentUsage   @sanity
Scenario: Verify the last update usage of the asset
        Given the admin user is logged into the application
        When go to Batch Update Asset Usage  
        Then update current usage and click on save button
        Then verify downloadusage functyionality - reharse the feature file