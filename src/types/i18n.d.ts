// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ns1 from "@/utils/translations/en.json";
import ns2 from "@/utils/translations/es.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "ns1";
    // custom resources type
    resources: {
      ns1: typeof ns1;
      ns2: typeof ns2;
    };
    // other
  }
}
