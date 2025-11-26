Feature: Verify functionalities under inventory count

  @inventoryCount @sanity

  Scenario: Verify Create, Complete, Cancel and Download inventory count functionalities
    Given the admin user is logged into the application
    When the user selects the inventory count menu under material
    And clicks on the create button and fills in the warehouse and inventory count name
    And clicks on the inventory count ID
    Then the user verifies the search functionality using Stock No.
    And fills in the counting quantity and click on save
    And verifies the transfer of material using the location under inventory count
    And verifies the adjust OH Quantity of material under inventory count
    When the user clicks on complete
    Then verifies adjust OH Quantity after complete
    Then the user click on close button
    When the user verifies the cancel functionality
    And verifies the inventory count download functionality
