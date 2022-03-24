import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import th from "react-intl/locale-data/th";
import de from "react-intl/locale-data/de";
import fr from "react-intl/locale-data/fr";
import ja from "react-intl/locale-data/ja";
import ko from "react-intl/locale-data/ko";
import zh from "react-intl/locale-data/zh";
import thTranslation from "./th.json";
import enTranslation from "./en.json";
import deTranslation from "./de.json";
import frTranslation from "./fr.json";
import jaTranslation from "./ja.json";
import krTranslation from "./kr.json";
import zhTranslation from "./zh.json";
import { connect } from "react-redux";

addLocaleData([...en, ...th, ...de, ...fr, ...ja, ...ko, ...zh]);

class IntlProviderWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLang: "en"
    };
  }

  getMessageListFromLocale = locale => {
    if (locale === "en") return enTranslation;
    else if (locale === "th") return thTranslation;
    else if (locale === "de") return deTranslation;
    else if (locale === "fr") return frTranslation;
    else if (locale === "ja") return jaTranslation;
    else if (locale === "ko") return krTranslation;
    else if (locale === "zh") return zhTranslation;
    else return enTranslation;
  };

  render() {
    const { children, lang } = this.props;

    const locale = lang || this.state.defaultLang;
    const messages = this.getMessageListFromLocale(locale);

    return (
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ setting: { lang } }) => {
  return { lang: lang };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntlProviderWrapper);
