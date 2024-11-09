import { RawCountries } from './RawCountries';
import { RawTerritories } from './RawTerritories';

export interface CountryDataProps {
  name: string;
  localName: string;
  countryCode: string;
  regions: string[];
  format: string;
  iso2: string;
  dialCode: string;
  mainCode: boolean;
  hasAreaCodes: boolean;
  isAreaCode: boolean;
  priority: number;
  areaCodeLength: number;
}

function getMask(
  prefix: string,
  dialCode: string,
  predefinedMask: string,
  defaultMask: string,
  alwaysDefaultMask: boolean
) {
  if (!predefinedMask || alwaysDefaultMask) {
    return prefix + ''.padEnd(dialCode.length, '.') + ' ' + defaultMask;
  } else {
    return prefix + ''.padEnd(dialCode.length, '.') + ' ' + predefinedMask;
  }
}

// enableAreaCodes: boolean || array of iso2 codes
function initCountries(
  countries: Array<Array<string | number | Array<string>>>,
  enableAreaCodes: Array<string>,
  prefix: string,
  defaultMask: string,
  alwaysDefaultMask: boolean
) {
  let hiddenAreaCodes: CountryDataProps[] = [];

  const getCountryDataProps = (): CountryDataProps[][] => {
    return countries.map((country) => {
      const countryItem: CountryDataProps = {
        name: (country[0] as string) ?? '',
        regions: (country[1] as string[]) ?? [],
        iso2: (country[2] as string) ?? '',
        countryCode: (country[3] as string) ?? '',
        dialCode: (country[3] as string) ?? '',
        format: getMask(
          prefix,
          country[3] as string,
          country[4] as string,
          defaultMask,
          alwaysDefaultMask
        ),
        priority: (country[5] as number) ?? 0,
        mainCode: false,
        hasAreaCodes: false,
        isAreaCode: false,
        areaCodeLength: 0,
        localName: '',
      };

      const areaItems: CountryDataProps[] = [];
      if (country[6]) {
        (country[6] as Array<string>).map((areaCode: string) => {
          const areaItem: CountryDataProps = {
            ...countryItem,
            dialCode: (country[3] as string) + areaCode,
            isAreaCode: true,
            areaCodeLength: areaCode.length,
          };

          areaItems.push(areaItem);
        });
      }

      if (areaItems.length > 0) {
        countryItem.mainCode = true;

        if (enableAreaCodes.includes(country[2] as string)) {
          countryItem.hasAreaCodes = true;
          return [countryItem, ...areaItems];
        } else {
          hiddenAreaCodes = hiddenAreaCodes.concat(areaItems);
          return [countryItem];
        }
      }

      return [countryItem];
    });
  };

  const initializedCountries: CountryDataProps[] =
    new Array<CountryDataProps>().concat(...getCountryDataProps());

  return [initializedCountries, hiddenAreaCodes];
}

function extendUserContent(
  userContent: Array<string[]>,
  contentItemIndex: number,
  extendingObject: string[] | number | undefined,
  firstExtension?: boolean
) {
  if (!extendingObject) return;

  const keys = Object.keys(extendingObject);
  const values = Object.values(extendingObject);

  keys.forEach((iso2, index) => {
    if (firstExtension) {
      // masks
      return userContent.push([iso2, values[index]]);
    }

    const countryIndex = userContent.findIndex((arr) => arr[0] === iso2);
    if (countryIndex === -1) {
      const newUserContent = [iso2];
      newUserContent[contentItemIndex] = values[index];
      userContent.push(newUserContent);
    } else {
      userContent[countryIndex][contentItemIndex] = values[index];
    }
  });
}

function initUserContent(
  masks: string[] | undefined,
  priority: number | undefined,
  areaCodes: string[] | undefined
) {
  let userContent: Array<string[]> = [];
  extendUserContent(userContent, 1, masks, true);
  extendUserContent(userContent, 3, priority);
  extendUserContent(userContent, 2, areaCodes);
  return userContent;
}

function extendRawCountries(
  countries: Array<Array<string | number | Array<string>>>,
  userContent: Array<string[]>
) {
  if (userContent.length === 0) return countries;

  // userContent index -> rawCountries index of country array to extend
  // [iso2 (0 -> 2), mask (1 -> 4), priority (3 -> 5), areaCodes (2 -> 6)]

  return countries.map((o) => {
    const userContentIndex = userContent.findIndex((arr) => arr[0] === o[2]); // find by iso2
    if (userContentIndex === -1) return o; // if iso2 not in userContent, return source country object
    const userContentCountry = userContent[userContentIndex];
    if (userContentCountry[1]) o[4] = userContentCountry[1]; // mask
    if (userContentCountry[3]) o[5] = userContentCountry[3]; // priority
    if (userContentCountry[2]) o[6] = userContentCountry[2]; // areaCodes
    return o;
  });
}

export class CountryData {
  private _hiddenAreaCodes: CountryDataProps[];
  private _onlyCountries: CountryDataProps[];
  private _preferredCountries: CountryDataProps[];

  constructor(
    enableAreaCodes: Array<string>,
    enableTerritories: boolean,
    regions: string[],
    onlyCountries: string[],
    preferredCountries: string[],
    excludeCountries: string[],
    preserveOrder: string[],
    areaCodes: string[] | undefined,
    localization: Record<string, string>,
    prefix: string,
    defaultMask: string,
    alwaysDefaultMask: boolean,
    masks: string[] | undefined,
    priority: number | undefined
  ) {
    const userContent = initUserContent(masks, priority, areaCodes);
    const rawCountries = extendRawCountries(
      JSON.parse(JSON.stringify(RawCountries)),
      userContent
    );
    const rawTerritories = extendRawCountries(
      JSON.parse(JSON.stringify(RawTerritories)),
      userContent
    );

    let [initializedCountries, hiddenAreaCodes] = initCountries(
      rawCountries,
      enableAreaCodes,
      prefix,
      defaultMask,
      alwaysDefaultMask
    );
    if (enableTerritories) {
      let [initializedTerritories, hiddenAreaCodes] = initCountries(
        rawTerritories,
        enableAreaCodes,
        prefix,
        defaultMask,
        alwaysDefaultMask
      );
      initializedCountries = this.sortTerritories(
        initializedTerritories,
        initializedCountries
      );
    }
    if (regions.length > 0)
      initializedCountries = this.filterRegions(regions, initializedCountries);

    const filteredCountries = this.getFilteredCountryList(
      onlyCountries,
      initializedCountries,
      preserveOrder.includes('onlyCountries')
    );
    const countries = this.excludeCountries(
      filteredCountries,
      excludeCountries
    );
    this._onlyCountries = this.localizeCountries(
      countries,
      localization,
      preserveOrder.includes('onlyCountries')
    );

    this._preferredCountries =
      preferredCountries.length === 0
        ? []
        : this.localizeCountries(
            this.getFilteredCountryList(
              preferredCountries,
              initializedCountries,
              preserveOrder.includes('preferredCountries')
            ),
            localization,
            preserveOrder.includes('preferredCountries')
          );

    // apply filters to hiddenAreaCodes
    this._hiddenAreaCodes = this.excludeCountries(
      this.getFilteredCountryList(onlyCountries, hiddenAreaCodes),
      excludeCountries
    );
  }

  public get hiddenAreaCodes(): CountryDataProps[] {
    return this._hiddenAreaCodes;
  }

  public get onlyCountries(): CountryDataProps[] {
    return this._onlyCountries;
  }

  public get preferredCountries(): CountryDataProps[] {
    return this._preferredCountries;
  }

  private filterRegions(regions: string[], countries: CountryDataProps[]) {
    if (typeof regions === 'string') {
      const region = regions;
      return countries.filter((country) => {
        return country.regions.some((element) => {
          return element === region;
        });
      });
    }

    return countries.filter((country) => {
      const matches = regions.map((region) => {
        return country.regions.some((element) => {
          return element === region;
        });
      });
      return matches.some((el) => el);
    });
  }

  private sortTerritories(
    initializedTerritories: CountryDataProps[],
    initializedCountries: CountryDataProps[]
  ) {
    const fullCountryList = [
      ...initializedTerritories,
      ...initializedCountries,
    ];
    fullCountryList.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return fullCountryList;
  }

  private getFilteredCountryList(
    countryCodes: string[],
    sourceCountryList: CountryDataProps[],
    preserveOrder?: boolean
  ): CountryDataProps[] {
    if (countryCodes.length === 0) return sourceCountryList;

    let filteredCountries: CountryDataProps[] = [];
    if (preserveOrder) {
      // filter using iso2 user-defined order
      let countries = countryCodes
        .map((countryCode) => {
          const country = sourceCountryList.find(
            (country) => country.iso2 === countryCode
          );
          if (country) return country;
        })
        .filter((country) => country); // remove any not found

      filteredCountries = countries as CountryDataProps[];
    } else {
      // filter using alphabetical order
      filteredCountries = sourceCountryList.filter((country) => {
        return countryCodes.some((element) => {
          return element === country.iso2;
        });
      });
    }

    return filteredCountries;
  }

  private localizeCountries(
    countries: CountryDataProps[],
    localization: Record<string, string>,
    preserveOrder: boolean
  ) {
    for (let i = 0; i < countries.length; i++) {
      if (localization[countries[i].iso2] !== undefined) {
        countries[i].localName = localization[countries[i].iso2];
      } else if (localization[countries[i].name] !== undefined) {
        countries[i].localName = localization[countries[i].name];
      }
    }
    if (!preserveOrder) {
      countries.sort(function (a, b) {
        if (a.localName < b.localName) {
          return -1;
        }
        if (a.localName > b.localName) {
          return 1;
        }
        return 0;
      });
    }
    return countries;
  }

  private excludeCountries(
    onlyCountries: CountryDataProps[],
    excludedCountries: string[]
  ) {
    if (excludedCountries.length === 0) {
      return onlyCountries;
    } else {
      return onlyCountries.filter((country) => {
        return !excludedCountries.includes(country.iso2);
      });
    }
  }
}
