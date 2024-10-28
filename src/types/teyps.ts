export interface Ilocationtype {
  documentation: string;
  licenses: [
    {
      name: string;
      url: string;
    }
  ];
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: [
    {
      annotations: {
        DMS: {
          lat: string;
          lng: string;
        };
        MGRS: string;
        Maidenhead: string;
        Mercator: {
          x: number;
          y: number;
        };
        NUTS: {
          NUTS0: {
            code: string;
          };
          NUTS1: {
            code: string;
          };
          NUTS2: {
            code: string;
          };
          NUTS3: {
            code: string;
          };
        };
        OSM: {
          edit_url: string;
          note_url: string;
          url: string;
        };
        UN_M49: {
          regions: {
            DE: string;
            EUROPE: string;
            WESTERN_EUROPE: string;
            WORLD: string;
          };
          statistical_groupings: [string];
        };
        callingcode: number;
        currency: {
          alternate_symbols: [];
          decimal_mark: string;
          html_entity: string;
          iso_code: string;
          iso_numeric: string;
          name: string;
          smallest_denomination: number;
          subunit: string;
          subunit_to_unit: number;
          symbol: string;
          symbol_first: number;
          thousands_separator: string;
        };
        flag: string;
        geohash: string;
        qibla: number;
        roadinfo: {
          drive_on: string;
          road: string;
          speed_in: string;
        };
        sun: {
          rise: {
            apparent: number;
            astronomical: number;
            civil: number;
            nautical: number;
          };
          set: {
            apparent: number;
            astronomical: number;
            civil: number;
            nautical: number;
          };
        };
        timezone: {
          name: string;
          now_in_dst: number;
          offset_sec: number;
          offset_string: string;
          short_name: string;
        };
        what3words: {
          words: string;
        };
      };
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
      components: {
        // ISO_3166_1_alpha_2: string
        //         ISO_3166_1_alpha_3: string
        //         ISO_3166_2: [
        //             string
        //         ],
        category: string;
        _normalized_city: string;
        _type: string;
        city: string;
        city_district: string;
        continent: string;
        country: string;
        country_code: string;
        county: string;
        house_number: string;
        office: string;
        political_union: string;
        postcode: string;
        road: string;
        state: string;
        state_code: string;
        suburb: string;
      };
      confidence: number;
      distance_from_q: {
        meters: number;
      };
      formatted: string;
      geometry: {
        lat: number;
        lng: number;
      };
    }
  ];
  status: {
    code: number;
    message: string;
  };
  stay_informed: {
    blog: string;
    mastodon: string;
  };
  thanks: string;
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
}

export interface IWeatherType {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
