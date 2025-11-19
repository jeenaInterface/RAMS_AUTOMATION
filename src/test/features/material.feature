Feature: Add, Update, and Search Functionalities in material Module

    @creatematerial @sanity

    Scenario: Create, update, search material, verify New button and action log

        Given the admin user is logged into the application
        When the admin navigates to the material creation page
        And enters all required details to create a new material
        Then the admin searches for the newly created material using its Stock No.
        And confirms that the search results correctly display the matching Stock No.
        When the admin updates the created material by modifying its Description and confirms that the updated Description appears correctly in the material list
        And verifies that the New button works as expected
        And verifies that the action log records the performed actions accurately

    @search @sanity

    Scenario: search Material
        Given the admin user is logged into the application
        When the admin navigates to the inquire material page
        Then the admin searches for an existing material by part No 'ST 47 RB'
        And verifies that the search results display the correct part No 'ST 47 RB'
        Then the admin searches for an existing material by Description 'Lamp Tail Light - Red'
        And verifies that the search results display the correct Description 'Lamp Tail Light - Red'
        # Then the admin searches for an existing material by asset group
        # And verifies that the search results display the correct asset group
        Then the admin searches for an existing material by stock location 'P2-E-02-B'
        And verifies that the search results display the correct stock location 'P2-E-02-B'
        # Then the admin searches for an existing material by vendor
        # And verifies that the search results display the correct vendor
        # Then the admin searches for an existing material by status
        # And verifies that the search results display the correct status
        # Then the admin searches for an existing material by shop
        # And verifies that the search results display the correct shop


    @materialValidation @sanity

    Scenario: Verify mandatory field validations in create material page
        Given the admin user is logged into the application
        When the admin navigates to the material creation page
        And attempts to create a new material without filling in the mandatory fields
        Then verifies that appropriate validation messages are displayed for each mandatory field
        And the admin fills in the mandatory fields one by one and attempts to submit the form each time
        Then verifies that the validation messages disappear as the mandatory fields are filled
        And finally, the admin fills in all mandatory fields and successfully creates the material

#     @transferLocation @sanity
#     Scenario: Verify material transfer between stock locations
#         Given the admin user is logged into the application
#         When the admin navigates to the inquire material page
#         Then the admin searches for an existing material by Stock No.
#         And Click stock No. link from the search results
#         Then click on the transfer location button
#         And verifies that the transfer location dialog is displayed
#         Then the admin selects a different stock location to transfer the material to
#         And submits the transfer location form
#         Then verifies that the material transfer is completed successfully with a confirmation message
#         Then the admin navigates back to the inquire material page
#         Then the admin searches for the same material by Stock No.
#         And verifies that the material's stock location is updated to the new location
#         Then Verify OH quantity is updated in both stock locations after transfer
#         And the admin verifies that the transfer is recorded in the material's action log



#     @adjustOHQuantity @sanity
#     Scenario: Verify OH quantity adjustment for a material
#         Given the admin user is logged into the application
#         When the admin navigates to the inquire material page
#         Then the admin searches for an existing material by Stock No.
#         And Click stock No. link from the search results
#         Then click on the adjust OH quantity button
#         And verifies that the adjust OH quantity dialog is displayed
#         Then the admin enters the adjustment details (increase or decrease quantity and reason)
#         And submits the adjust OH quantity form
#         Then verifies that the OH quantity adjustment is completed successfully with a confirmation message
#         Then the admin navigates back to the inquire material page
#         Then the admin searches for the same material by Stock No.
#         And verifies that the material's OH quantity is updated accordingly
#         Then the admin verifies that the OH quantity adjustment is recorded in the material's action log


# @materialUsage @sanity
# Scenario: Verify material usage recording and OH quantity update
#     Given the admin user is logged into the application
#     When the admin navigates to the inquire material page
#     Then the admin searches for an existing material by Stock No.
#     And Click stock No. link from the search results
#     Then click on the record material usage button
#     And verifies that the record material usage dialog is displayed
# # Do the integration once complete the work order

#     @createOrder @sanity

#     Scenario: Verify create order functionlity from material module and verify order track is recorded under the material after receiving the material
#         Given the admin user is logged into the application
#         When the admin navigates to the inquire material page
#         Then the admin searches for an existing material by Stock No.
#         And Click stock No. link from the search results
#         Then click on the create order button
#         And verifies that the create order page is displayed with prefilled material details
#         Then the admin fills in the required order details
#         And submits the create order form
#         Then verifies that the order is created successfully with a confirmation message
#         Then Do recive material for the created order
#         And verifies that the material is received successfully with a confirmation message
#         Then Do batch review for the received material
#         And verifies that the batch review is completed successfully with a confirmation message
#         Then the admin navigates back to the inquire material page
#         Then the admin searches for the same material by Stock No.
#         And verifies that the order track is recorded under the material details
#         Then Verify OH quantity is updated in material after receiving the material