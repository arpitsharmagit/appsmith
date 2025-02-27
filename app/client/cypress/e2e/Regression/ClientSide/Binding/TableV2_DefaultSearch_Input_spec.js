const publish = require("../../../../locators/publishWidgetspage.json");
const testdata = require("../../../../fixtures/testdata.json");
import * as _ from "../../../../support/Objects/ObjectsCore";

describe("Binding the Table and input Widget", function () {
  before(() => {
    cy.fixture("formInputTableV2Dsl").then((val) => {
      _.agHelper.AddDsl(val);
    });
  });

  it("1. Input widget test with default value from table widget", function () {
    _.entityExplorer.ExpandCollapseEntity("Form1");
    _.entityExplorer.SelectEntityByName("Input1");
    cy.testJsontext("defaultvalue", testdata.defaultInputWidget + "}}");

    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    // validation of data displayed in input widgets based on search value set
    _.entityExplorer.SelectEntityByName("Table1");
    cy.get(".t--property-control-allowsearching input").click({ force: true });
    cy.testJsontext("defaultsearchtext", "2736212");
    cy.wait("@updateLayout").isSelectRow(0);
    cy.readTableV2dataPublish("0", "0").then((tabData) => {
      const tabValue = tabData;
      expect(tabValue).to.be.equal("2736212");
      cy.log("the value is" + tabValue);
      cy.get(publish.inputWidget + " " + "input")
        .first()
        .invoke("attr", "value")
        .should("contain", tabValue);
    });
  });
});
