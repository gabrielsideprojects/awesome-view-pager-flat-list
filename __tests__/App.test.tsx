import React from "react";
import App from "../App";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
describe("The viewPager modal should be visible", () => {
  it("should press the butto open and check if the viewPager modal is Visible", async () => {
    const { getByText, getByTestId, debug } = render(<App />);
    const openViewPagerModalButton = getByText(
      /Open the most awesome view pager modal!/i
    );
    const viewPagerModal = getByTestId("viewPagerModal");
    fireEvent(openViewPagerModalButton, "onPress");
    await waitFor(() => {
      expect(viewPagerModal.props.visible).toBeTruthy();
    });
  });
});
//TODO Teste de integração ou E2E para checar o swipe dos itens? Acredito que E2E.
