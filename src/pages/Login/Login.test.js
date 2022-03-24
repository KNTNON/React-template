import React from "react";

import Login from "./Login";

import axios from "axios";

import { performSignIn } from "reducers/auth/action";

import { ThemeProvider } from "emotion-theming";
import { theme } from "theme/theme";

function create() {
  const props = {};

  const initialState = {
    auth: {
      user: {
        name: "non@msn.com"
      }
    }
  };

  const store = mockStore(initialState);

  const intlWrapper = mountWithIntl(
    <ThemeProvider theme={theme}>
      <Login store={store} {...props} />
    </ThemeProvider>
  );

  // ThemeProvider > redux > injectIntl
  const wrapper = intlWrapper
    .childAt(0)
    .childAt(0)
    .childAt(0);

  return { store, props, wrapper };
}

describe("when input changed", () => {
  const { store, props, wrapper } = create();

  it("E-mail input correctly", () => {
    expect(wrapper.find(".input-email"));
  });

  it("should change property email in the state", () => {
    wrapper
      .find(".input-email")
      .at(0)
      .simulate("change", {
        target: { name: "email", value: "blah@gmail.com" }
      });
    expect(wrapper.state("email")).toEqual("blah@gmail.com");
  });
});

describe("performSignIn action creator", () => {
  it("dispatches SIGN_IN action and returns data on success", async () => {
    const { store, props, wrapper } = create();
    axios.mockImplementationOnce(test => {
      return Promise.resolve({
        data: { token: "TOKEN" }
      });
    });

    await store.dispatch(performSignIn());
    const actions = store.getActions();
    expect(actions[0].type).toEqual("SIGN_IN_PENDING");
    expect(actions[1].type).toEqual("SIGN_IN_FULFILLED");
    expect(actions[1].payload.token).toEqual("TOKEN");
  });

  it("dispatches SIGN_IN action and returns data on error", async () => {
    const { store, props, wrapper } = create();
    axios.mockImplementationOnce(() => {
      return Promise.reject({
        response: { data: { message: "errorDefaultMessage" } }
      });
    });
    try {
      await store.dispatch(performSignIn());
    } catch {
      const actions = store.getActions();
      expect(actions[0].type).toEqual("SIGN_IN_PENDING");
      expect(actions[1].type).toEqual("SIGN_IN_REJECTED");
      expect(actions[1].payload.message).toEqual("errorDefaultMessage");
    }
  });
});
