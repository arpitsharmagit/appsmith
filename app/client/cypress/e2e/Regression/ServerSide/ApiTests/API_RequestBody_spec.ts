import {
  entityItems,
  apiPage,
  agHelper,
} from "../../../../support/Objects/ObjectsCore";

describe("API Panel request body", function () {
  it("1. Check whether input exists when form-encoded is selected", function () {
    apiPage.CreateApi("FirstAPI");
    apiPage.SelectAPIVerb("POST");
    apiPage.SelectPaneTab("Body");
    apiPage.SelectSubTab("FORM_URLENCODED");
    agHelper.AssertElementVisible(apiPage._bodyKey(0));
    agHelper.ActionContextMenuWithInPane({
      action: "Delete",
      entityType: entityItems.Api,
    });
  });
});
