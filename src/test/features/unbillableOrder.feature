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


  @BatchClose @sanity @bwo
  Scenario: Verify Batch close screen functionalities for unbillable work order
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and selects special shift as vessel sail and clicks on the Draft button
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the Batch close menu and perform batch close operation for the recently created unbillable work order
    Then Search for the recently created unbillable work order using the captured work order number
    Then verify the status of the unbillable work order is Closed

  @BatchCloseFromToDoList @sanity @bwo
  Scenario: Verify Batch close screen functionalities for unbillable work order
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and selects special shift as vessel sail and clicks on the Draft button
    When the admin clicks the complete button and verify the status of the unbillable work order is Completed
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the Batch close menu from to do list and perform batch close operation for the recently created unbillable work order
    Then Search for the recently created unbillable work order using the captured work order number
    Then verify the status of the unbillable work order is Closed

  @unBillableSearch @sanity @bwo
  Scenario: Search functionality in Inquire Un-billable Work Order screen
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order inquiry menu
    Then verify the search functionality using asset and verify the results are displayed as expected 'ASCRB'
    Then verify the search functionality using asset description number and verify the results are displayed as expected 'Automatic Stacking Crane Rebuild'
    Then verify the search functionality using asset group and verify the results are displayed as expected 'AG - AGV'
    Then verify the search functionality using work Order status and verify the results are displayed as expected 'Closed'
    Then verify the search functionality using Mechanic and verify the results are displayed as expected 'ARMANDO.RICO'
    Then verify the search functionality using repair date and verify the results are displayed as expected
    Then verify the search functionality using shop and verify the results are displayed as expected 'AGV - AGV'
    Then verify the search functionality using shift and verify the results are displayed as expected '1 - First Shift'
    Then verify the search functionality using stock number and verify the results are displayed as expected '1000'
    Then verify the search functionality using asset manufacturer and verify the results are displayed as expected 'ZPMC'
    Then verify the search functionality using asset manufacturer claime type and verify the results are displayed as expected 'Claim with Parts'

  @weekDaySTNormalShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for first shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for first shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDaySTNormalShiftSTSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for second shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for second shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDaySTNormalShiftSTThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for third shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for third shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDayOTNormalShiftFirstShiftOT @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for first shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO


  @weekDayOTNormalShiftSecondShiftOT @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for second shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDayOTNormalShiftThirdShiftOT @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for third shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDaySTVesselFirstShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for first shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for first shift with special shift as Vessel Sail and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for Vessel Sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDaySTVesselSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for second shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for second shift with special shift as Vessel Sail and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for Vessel Sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDaySTVesselThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for third shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for third shift with special shift as Vessel Sail and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for Vessel Sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDayOTVesselFirstShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for first shift with special shift as Vessel Sail and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for Vessel Sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDayOTVesselSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for second shift with special shift as Vessel Sail and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for Vessel Sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDayOTVesselThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for third shift with special shift as Vessel Sail and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for Vessel Sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDaySTFourAndGoFirstShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for first shift for 4 and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for first shift with special shift as four and Go and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDaySTFourAndGoSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for second shift for 4 and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for second shift with special shift as four and Go and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDaySTFourAndGoThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for third shift for 4 and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for third shift with special shift as four and Go and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDayOTFourAndGoFirstShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift for 4 and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for first shift with special shift as four and Go and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDayOTFourAndGoSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift for 4 and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for second shift with special shift as four and Go and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDayOTFourAndGoThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift for 4 and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for third shift with special shift as four and Go and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDaySTPMATrainingFirstShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for first shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for first shift with special shift as PMA Training and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDaySTPMATrainingSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for second shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for second shift with special shift as PMA Training and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDaySTPMATrainingThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select straight time in hour type, the verify ST and OT in payroll screen for third shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select straight time in hour type for third shift with special shift as PMA Training and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekDayOTPMATrainingFirstShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for first shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for first shift with special shift as PMA Training and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO

  @weekDayOTPMATrainingSecondShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for second shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for second shift with special shift as PMA Training and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO

  @weekDayOTPMATrainingThirdShift @sanity @bwo
  Scenario: Create a WO for weekday and select overtime in hour type, the verify ST and OT in payroll screen for third shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekday and select overtime in hour type for third shift with special shift as PMA Training and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO

  @weekEndSTNormalShiftFirstShift @sanity @bwo
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend and select overtime in hour type for first shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend after cancelling the WO

  @weekEndSTNormalShiftSecondShift @sanity @bwo
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend and select overtime in hour type for second shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend after cancelling the WO

  @weekEndSTNormalThirdShift @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend and select overtime in hour type for third shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend after cancelling the WO

  @weekEndSTNormalShiftFirstShiftVessel @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift vessel sail and select overtime in hour type for first shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend for the special shift vessel sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend after cancelling the WO

  @weekEndSTNormalShiftSecondShiftVessel @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift vessel sail and select overtime in hour type for second shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend for the special shift vessel sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend after cancelling the WO

  @weekEndSTNormalShiftThirdShiftVessel @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift for Vessel Sail
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift vessel sail and select overtime in hour type for third shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend for the special shift vessel sail
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend after cancelling the WO

  @weekEndOTNormalShiftFirstShiftFourandGo @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift for four and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift four and Go and select overtime in hour type for first shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend for the special shift four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend after cancelling the WO

  @weekEndOTNormalShiftSecondShiftFourandGo @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift for four and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift four and Go and select overtime in hour type for second shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend for the special shift four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend after cancelling the WO

  @weekEndOTNormalShiftThirdShiftFourAndGo @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift for four and Go
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift four and Go and select overtime in hour type for third shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend for the special shift four and Go
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend after cancelling the WO

  @weekEndOTNormalShiftFirstShiftPMATraining @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for first shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift PMA Training and select overtime in hour type for first shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend for the special shift PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend after cancelling the WO

  @weekEndOTNormalShiftSecondShiftPMATraining @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for second shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift PMA Training and select overtime in hour type for second shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend for the special shift PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend after cancelling the WO

  @weekEndOTNormalShiftThirdShiftPMATraining @sanity
  Scenario: Create a WO for weekend and select overtime in hour type, the verify ST and OT in payroll screen for third shift for PMA Training
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And Create a WO for weekend for the special shift PMA Training and select overtime in hour type for third shift and close the WO
    Then the unbillable work order number is captured for future reference
    When the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend for the special shift PMA Training
    Then capture the ST and OT hours
    Then Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift
    Then cancel the created unbillable work order
    Then the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend after cancelling the WO

  @leadManCheckBox @sanity
  Scenario: Verify that the IsLead checkbox is checked by default when logged in as Lead Mechanic
    Given the lead mechanic user logs into the application
    And the admin navigates to the unbillable work order creation menu
    Then confirm that the IsLead checkbox is checked by default
@leadManNotCheckBox @sanity
  Scenario: Verify that the IsLead checkbox is not checked by default when logged in as Mechanic
    Given the mechanic user logs into the application
    And the admin navigates to the unbillable work order creation menu
    Then confirm that the IsLead checkbox is not checked by default


  @YT-YardTractor @sanity @bwo
  Scenario: Create unbillable work order PM details verification for YT-YardTractor asset
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and and select Is PM work order checkbox then clicks on the Draft button
    Then the unbillable work order number is captured for future reference
    When the admin clicks the complete and then close button
    Then Search for the recently created unbillable work order using the captured work order number

#Scenario: Verify IsPm functionality for Bombcart assets

  @Bombcartpm @sanity @bwo
  Scenario: Create unbillable work order PM details verification for Bombcart asset
    Given the admin user is logged into the application
    When the admin navigates to the unbillable work order creation menu
    And enters all the required fields for unbillable work order and and select Is PM work order checkbox then clicks on the Draft button for bombcart asset
    Then the unbillable work order number is captured for future reference
    When the admin clicks the complete and then close button
    Then Search for the recently created unbillable work order using the captured work order number


#Scenario: Verify payroll review functionality
#Scenario: Verify approve payroll functionality







