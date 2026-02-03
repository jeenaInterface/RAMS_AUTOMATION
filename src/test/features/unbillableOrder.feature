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
    Then the unbillable work order number is captured for future reference
    When the admin clicks the complete and then close button


  @firstShiftValidation @sanity @bwo
  Scenario: Verify hour validation for first shift having two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift
    Then Verify hour validation messages are displayed as expected

  @secondShiftValidation @sanity @bwo
  Scenario: Verify hour validation for second shift with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift
    Then Verify hour validation messages are displayed as expected

  @thirdShiftValidation @sanity @bwo
  Scenario: Verify hour validation for third shift with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift
    Then Verify hour validation messages are displayed as expected for the third shift

  @FirstShiftValidationSpecialShiftAsVesselSail @sanity @bwo
  Scenario: Verify hour validation for first shift (Vessel Sail) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift and selects special shift as vessel sail
    Then Verify hour validation messages are displayed as expected for the first shift  for special shift as vessel sail

  @secondShiftValidationSpecialShiftAsVesselSail @sanity @bwo
  Scenario: Verify hour validation for second shift (Vessel Sail) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift and selects special shift as vessel sail
    Then Verify hour validation messages are displayed as expected for the second shift  for special shift as vessel sail

  @thirdShiftValidationSpecialShiftAsVesselSail @sanity @bwo
  Scenario: Verify hour validation for third shift (Vessel Sail) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift and selects special shift as vessel sail
    Then Verify hour validation messages are displayed as expected for the third shift  for special shift as vessel sail

  @FirstShiftValidationSpecialShiftAs4AndGo @sanity @bwo
  Scenario: Verify hour validation for first shift (4 and Go) with two assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift and selects special shift as 4 and Go
    Then Verify hour validation messages are displayed as expected for the first shift  for special shift as four and Go

  @secondShiftValidationSpecialShiftAs4AndGo @sanity @bwo
  Scenario: Verify hour validation for second shift (4 and Go) with three assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift and selects special shift as 4 and Go
    Then Verify hour validation messages are displayed as expected for the second shift  for special shift as four and Go

  @thirdShiftValidationSpecialShiftAs4AndGo @sanity @bwo
  Scenario: Verify hour validation for third shift (4 and Go) with three assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift and selects special shift as 4 and Go
    Then Verify hour validation messages are displayed as expected for the third shift  for special shift as four and Go

  @FirstShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify hour validation for first shift (PMA Training) with three assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift and selects special shift as PMA Training
    Then Verify hour validation messages are displayed as expected for the first shift  for special shift as PMA Training

  @secondShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify hour validation for second shift (PMA Training) with three assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift and selects special shift as PMA Training
    Then Verify hour validation messages are displayed as expected for the second shift  for special shift as PMA Training

  @thirdShiftValidationSpecialShiftAsPMATraining @sanity @bwo
  Scenario: Verify hour validation for third shift (PMA Training) with three assets
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift and selects special shift as PMA Training
    Then Verify hour validation messages are displayed as expected for the third shift  for special shift as PMA Training


    # Scenario: Create unbillable work order PM details verification
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift 
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift for Vessel Sail
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift for 4 and Go
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift for PMA Training
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift 
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift for Vessel Sail
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift for 4 and Go
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift for PMA Training
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift 
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift for Vessel Sail
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift for 4 and Go
    # Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift for PMA Training

    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift 
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift for Vessel Sail
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift for 4 and Go
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift for PMA Training
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift 
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift for Vessel Sail
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift for 4 and Go
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift for PMA Training
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift 
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift for Vessel Sail
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift for 4 and Go
    # Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift for PMA Training
    # Scenario: Search functionality in inquirey screen for unbillable work order
    # Scenario: Verify Batch close screen functionalities for unbillable work order



