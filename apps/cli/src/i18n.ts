import { I18n } from "i18n";
import path from "path";

const i18n = new I18n({
  locales: ["en", "fr"],
  directory: "./apps/cli/src/assets/locales",
});

export default i18n;
