Feature: Add, Update, and Search Functionalities in material Module

    @creatematerial @sanity

    Scenario: Create, update, search material, verify New button and action log

        Given the admin user is logged into the application
        When the admin navigates to the material creation page
        And enters all required details to create a new material
        Then the created Stock No is captured for further use
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
        Then the admin searches for an existing material by asset group 'AG - AGV'
        And verifies that the search results display the correct asset group 'AG - AGV'
        Then the admin searches for an existing material by stock location 'P2-E-02-B'
        And verifies that the search results display the correct stock location 'P2-E-02-B'
        Then the admin searches for an existing material by vendor '1080233500'
        And verifies that the search results display the correct vendor '1080233500'
        Then the admin searches for an existing material by status 'Inactive'
        And verifies that the search results display the correct status 'Inactive'
        Then the admin searches for an existing material by shop 'AGV - AGV'
        And verifies that the search results display the correct shop 'AGV - AGV'


    @materialValidation @sanity

    Scenario: Verify mandatory field validations in create material page
        Given the admin user is logged into the application
        When the admin navigates to the material creation page
        And the admin fills in the mandatory fields one by one and attempts to submit the form each time

    @createOrder @sanity

    Scenario: Verify create order functionlity from material module and verify order track is recorded under the material after receiving the material
        Given the admin user is logged into the application
        Then the admin navigates to the material creation page
        When enters all required details to create a new material
        Then the created Stock No is captured for further use
        # When the admin navigates to the inquire material page
        # Then the admin searches for an existing material by Stock No.
        # Then click on the link
        And submits the create order form after filling in the required order details
        Then the Purchase Order number is captured for further use
        Then Do receive material and review for the created order
        Then track the receiving document number for further use
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        And verifies that the order track is recorded under the material details
        Then Verify OH quantity is updated in material after receiving the material
        Then Go to material recive module and Cancel the the created recive done earlier
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        Then Verify the OH quantity is reverted back
        And submits the create order form after filling in the required order details
        Then the Purchase Order number is captured for further use
        Then Do receive material and review for the created order
        Then track the receiving document number for further use

    @transferLocation @sanity
    Scenario: Verify material transfer between stock locations
        Given the admin user is logged into the application
        Then the admin navigates to the material creation page
        When enters all required details to create a new material
        Then the created Stock No is captured for further use
        And submits the create order form after filling in the required order details
        Then the Purchase Order number is captured for further use
        Then Do receive material and review for the created order
        Then track the receiving document number for further use
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        Then Do transfer material to another location
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        And Verify OH quantity and location are updated in material after transfer the material
        And the admin verifies that the transfer is recorded in the materials action log


    @transferLocationMenu @sanity
    Scenario: Verify transfer material functionality from menu
        Given the admin user is logged into the application
        Then the admin navigates to the material creation page
        When enters all required details to create a new material
        Then the created Stock No is captured for further use
        And submits the create order form after filling in the required order details
        Then the Purchase Order number is captured for further use
        Then Do receive material and review for the created order
        Then track the receiving document number for further use
        Then Go to transfer material menu and Do transfer material to another location
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        And Verify OH quantity and location are updated in material after transfer the material

    @adjustOHQuantity @sanity
    Scenario: Verify OH quantity adjustment for a material
        Given the admin user is logged into the application
        Then the admin navigates to the material creation page
        When enters all required details to create a new material
        Then the created Stock No is captured for further use
        And submits the create order form after filling in the required order details
        Then the Purchase Order number is captured for further use
        Then Do receive material and review for the created order
        Then track the receiving document number for further use
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        Then click on the adjust OH quantity button and update the OH quantity
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        And verifies that the material OH quantity is updated accordingly

    @adjustOHQuantityMenu @sanity
    Scenario: Verify adjustment OH quantity menu
        Given the admin user is logged into the application
        Then the admin navigates to the material creation page
        When enters all required details to create a new material
        Then the created Stock No is captured for further use
        And submits the create order form after filling in the required order details
        Then the Purchase Order number is captured for further use
        Then Do receive material and review for the created order
        Then track the receiving document number for further use
        Then click on the adjust OH quantity menu and update the OH quantity
        Then the admin searches for an existing material by Stock No.
        Then click on the link
        And verifies that the material OH quantity is updated accordingly

@adjustOHQuantityRandomUpdate @sanity
  Scenario: Verify adjustment OH quantity menu
    Given the admin user is logged into the application
    When the admin navigates to the adjust OH quantity page
    Then the admin clicks on the adjust button without selecting an adjust reason
    When the admin selects the adjust reason
    And clicks on the adjust button without updating the quantity
    When the admin updates the OH quantity of multiple stocks and verifies the success message

# @materialUsage @sanity
# Scenario: Verify material usage recording and OH quantity update
#     Given the admin user is logged into the application
#     When the admin navigates to the inquire material page
#     Then the admin searches for an existing material by Stock No.
#     And Click stock No. link from the search results
#     Then click on the record material usage button
#     And verifies that the record material usage dialog is displayed
# # Do the integration once complete the work order


