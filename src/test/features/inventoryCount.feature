Feature: Verify functionalities under inventory count
  @inventoryCount @sanity

  Scenario: Verify Create, Complete, Cancel and Download inventory count functionalities
    Given the user is logged into the application
    When the user selects the inventory count menu under material
    And clicks on the create button and fills in the warehouse and inventory count name
    And clicks on the inventory count ID
    Then the user verifies the search functionality using Stock No., Material Description, Manufacturer's Part No., and Issue UOM
    And fills in the counting quantity
    And clicks on save
    And verifies the transfer of material using the location under inventory count
    When the user clicks on complete
    Then verifies the transfer of material using the location under inventory count
    And verifies the inventory count download functionality
    When the user verifies the cancel functionality
    Then verifies the transfer of material using the location under inventory count