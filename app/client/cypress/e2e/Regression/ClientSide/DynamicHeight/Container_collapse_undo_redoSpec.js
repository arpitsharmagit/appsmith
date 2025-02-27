import {
  entityExplorer,
  agHelper,
} from "../../../../support/Objects/ObjectsCore";

describe("Dynamic Height Width validation", function () {
  it("1. Validate change with auto height width for widgets", function () {
    const modifierKey = Cypress.platform === "darwin" ? "meta" : "ctrl";
    cy.fixture("DynamicHeightDefaultHeightdsl").then((val) => {
      agHelper.AddDsl(val);
    });
    entityExplorer.SelectEntityByName("Container1");
    cy.get(".t--widget-containerwidget")
      .invoke("css", "height")
      .then((height) => {
        entityExplorer.SelectEntityByName("Button1", "Container1");
        cy.get("body").type("{del}", { force: true });
        cy.wait(2000);
        cy.get(".t--widget-containerwidget")
          .invoke("css", "height")
          .then((newheight) => {
            expect(height).to.not.equal(newheight);
            expect(newheight).to.equal("100px");
            cy.get("body").type(`{${modifierKey}}z`);
            cy.wait(2000);
            cy.get(".t--widget-containerwidget")
              .invoke("css", "height")
              .then((oheight) => {
                expect(oheight).to.equal(height);
                expect(oheight).to.not.equal(newheight);
              });
          });
      });
  });
});
