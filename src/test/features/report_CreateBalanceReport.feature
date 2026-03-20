Feature: Verify Create Material balance Report

    @materialbalanceReport @sanity @report
  Scenario: Admin creates and runs create material balance report
    Given the admin user is logged into the application
    And selects create material balance report
    And selects all the filters of material balance report
    And verifies save functionality of material balance report
    Then verifies save as functionality of material balance report
    Then the admin clicks on the run button and the material balance report should be generated successfully


    @materialbalanceReportNewTemplate @sanity @report
  Scenario: Verify created report template in my report template section 
    Given the admin user is logged into the application
    And selects create material balance report
    And selects all the filters of material balance report
    And verifies save functionality of material balance report
    Then verifies save as functionality of material balance report
    Then the admin clicks on the run button and the material balance report should be generated successfully
    Then go to report template and verifies the created material balance report template is displayed in the list
    Then click on the search icon and verifies the page is redirect to material balance report details page
    Then click on download icon and verifies the material balance report is downloaded successfully
    Then click on schedule icon and verifies the material balance report is scheduled successfully
    Then click on delete icon and verifies the material balance report is deleted successfully