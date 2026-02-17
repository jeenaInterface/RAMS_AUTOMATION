Feature: Asset manufature module

  @AssetManufacture @sanity @sysyemsettings
    Scenario: Verify Create/Edit Asset Manufacturer functionality
      Given User logged into the application
      Then select Asset Manufacturer from the system settings menu
      When Click on the create button in Asset Manufacturer form
      And Enter all the fields in Asset Manufacturer form
      And Click on the save button in Asset Manufacturer form
      And Verify edit functionality in Asset Manufacturer form
      Then Verify action Log in Asset Manufacturer form
      Then Verify page is resting and opening the create Asset Manufacturer form on clicking the Add button