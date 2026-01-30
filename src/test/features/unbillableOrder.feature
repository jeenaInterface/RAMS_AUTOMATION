Feature: Verify functionalities under Un-Billable Work Order

  @createUnBillableOrderSingleAssetForNormal @sanity @bwo
  Scenario: Create unbillable work order with single asset for the first shift(standard)
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And After entering all required fields for the unbillable work order and clicking Draft, verify that its status is updated to Drafted
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    Then the unbillable work order number is captured for future reference
    Then verify save button functionality under unbillable work order
    When the admin clicks the close button and verify the status of the unbillable work order is Closed
    Then verify the action logged
    Then Search for the recently created unbillable work order using the captured work order number
    Then verify the new button functionality


  @createUnBillableOrderSingleAssetVesselSail @sanity @bwo
  Scenario: Create unbillable work order with single asset for the first shift(Vessel Sail)
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and selects special shift as vessel sail and clicks on the Draft button
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    Then the unbillable work order number is captured for future reference
    Then verify save button functionality under unbillable work order
    When the admin clicks the close button and verify the status of the unbillable work order is Closed
    Then verify the action logged
    Then Search for the recently created unbillable work order using the captured work order number
    Then verify the new button functionality

  @createUnBillableOrderSingleAsset4AndGo @sanity @bwo
  Scenario: Create unbillable work order with single asset for the speciat shift 4 and Go(First shift)
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and selects special shift as 4 and Go and clicks on the Draft button
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    Then the unbillable work order number is captured for future reference
    Then verify save button functionality under unbillable work order
    When the admin clicks the close button and verify the status of the unbillable work order is Closed
        Then Search for the recently created unbillable work order using the captured work order number

  @createUnBillableOrderSingleAssetPMATraining @sanity @bwo
  Scenario: Create unbillable work order with single asset for the special shift PMA Training(First shift)
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and selects special shift as PMA Training and clicks on the Draft button
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    Then the unbillable work order number is captured for future reference
    Then verify save button functionality under unbillable work order


  @createUnBillableOrderFiveAsset @sanity @bwo
  Scenario: Create an unbillable work order containing ten assets- add five assets during the creation phase and include an additional five assets while the work order is in draft mode (second shift)
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds three assets then clicks on the Draft button
    Then add another two assets in draft mode
    Then the unbillable work order number is captured
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    When the admin clicks the close button and verify the status of the unbillable work order is Closed
    Then Search for the recently created unbillable work order using the captured work order number


  @firstShiftValidation @sanity @bwo
  Scenario: Verify hour validation for first shift having two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @secondShiftValidation @sanity @bwo
  Scenario: Verify hour validation for second shift with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @thirdShiftValidation @sanity @bwo
  Scenario: Verify hour validation for third shift with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @FirstShiftValidationSpecialShiftAsVesselSail @sanity @bwo
  Scenario: Verify hour validation for first shift (special shift: Vessel Sail) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @secondShiftValidationSpecialShiftAsVesselSail @sanity @bwo
  Scenario: Verify hour validation for second shift (special shift: Vessel Sail) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @thirdShiftValidationSpecialShiftAsVesselSail @sanity @bwo
  Scenario: Verify hour validation for third shift (special shift: Vessel Sail) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @FirstShiftValidationSpecialShiftAs4AndGo @sanity @bwo
  Scenario: Verify hour validation for first shift (special shift: 4 and Go) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @secondShiftValidationSpecialShiftAs4AndGo @sanity @bwo
  Scenario: Verify hour validation for second shift (special shift: 4 and Go) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @thirdShiftValidationSpecialShiftAs4AndGo @sanity @bwo
  Scenario: Verify hour validation for third shift (special shift: 4 and Go) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @FirstShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify hour validation for first shift (special shift: PMA Training) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @secondShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify hour validation for second shift (special shift: PMA Training) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button

  @thirdShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify hour validation for third shift (special shift: PMA Training) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button


    @thirdShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify internal RO validation for third shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button