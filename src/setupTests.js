import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { IntlProvider, intlShape } from "react-intl";
import enTranslation from "lang/en.json";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Create IntlProvider to retrieve React Intl context
const intlProvider = new IntlProvider(
  {
    locale: "en",
    messages: enTranslation
  },
  {}
);
const { intl } = intlProvider.getChildContext();

// `intl` prop is required when using injectIntl HOC
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

// shallow() with React Intl context
global.shallowWithIntl = (node, { context, ...options } = {}) => {
  return shallow(nodeWithIntlProp(node), {
    ...options,
    context: {
      ...context,
      intl
    }
  });
};
// mount() with React Intl context
global.mountWithIntl = (
  node,
  { context, childContextTypes, ...options } = {}
) => {
  return mount(nodeWithIntlProp(node), {
    ...options,
    context: {
      ...context,
      intl
    },
    childContextTypes: {
      intl: intlShape,
      ...childContextTypes
    }
  });
};

global.mockStore = configureMockStore([thunk, promiseMiddleware]);
