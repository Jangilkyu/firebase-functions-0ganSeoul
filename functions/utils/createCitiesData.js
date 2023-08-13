const functions = require("firebase-functions");
const xml2js = require("xml2js");
const axios = require("axios");
const parser = new xml2js.Parser({explicitArray: false, mergeAttrs: true});
const {openapi, apikey, type, service, startindex, endindex} = functions.config().env;

const createCitiesData = async (city, cityArr) => {
  const uri = `${openapi}/${apikey}/${type}/${service}/${startindex}/${endindex}/${city[0]}`;
  const encodedURI = encodeURI(uri);
  const response = await axios(encodedURI);
  const xml = await response.data;
  const res = await parser.parseStringPromise(xml);

  const {AREA_NM, LIVE_PPLTN_STTS, ROAD_TRAFFIC_STTS, SBIKE_STTS} = res["SeoulRtd.citydata"].CITYDATA;
  const {ROAD_MSG, ROAD_TRAFFIC_IDX, ROAD_TRFFIC_TIME, ROAD_TRAFFIC_SPD} = ROAD_TRAFFIC_STTS.AVG_ROAD_DATA;
  const sBikeStats = SBIKE_STTS ? SBIKE_STTS.SBIKE_STTS : [];
  const sBikeSpotNames = sBikeStats;
  const latitude = city[1];
  const longitude = city[2];
  const Category = city[3];

  const {
    LIVE_PPLTN_STTS: {
      AREA_CONGEST_LVL,
      AREA_CONGEST_MSG,
      AREA_PPLTN_MIN,
      AREA_PPLTN_MAX,
      MALE_PPLTN_RATE,
      FEMALE_PPLTN_RATE,
      PPLTN_RATE_0,
      PPLTN_RATE_10,
      PPLTN_RATE_20,
      PPLTN_RATE_30,
      PPLTN_RATE_40,
      PPLTN_RATE_50,
      PPLTN_RATE_60,
      PPLTN_RATE_70,
      RESNT_PPLTN_RATE,
      NON_RESNT_PPLTN_RATE,
      REPLACE_YN,
      PPLTN_TIME,
    },
  } = LIVE_PPLTN_STTS;

  const cityObj = {
    AREA_NM,
    LIVE_PPLTN_STTS: {
      AREA_CONGEST_LVL,
      AREA_CONGEST_MSG,
      AREA_PPLTN_MIN,
      AREA_PPLTN_MAX,
      MALE_PPLTN_RATE,
      FEMALE_PPLTN_RATE,
      PPLTN_RATE_0,
      PPLTN_RATE_10,
      PPLTN_RATE_20,
      PPLTN_RATE_30,
      PPLTN_RATE_40,
      PPLTN_RATE_50,
      PPLTN_RATE_60,
      PPLTN_RATE_70,
      RESNT_PPLTN_RATE,
      NON_RESNT_PPLTN_RATE,
      REPLACE_YN,
      PPLTN_TIME,
    },
    AVG_ROAD_DATA: {
      ROAD_MSG,
      ROAD_TRAFFIC_IDX,
      ROAD_TRFFIC_TIME,
      ROAD_TRAFFIC_SPD,
    },
    SBIKE_STTS: sBikeSpotNames,
    Coordinate: {
      latitude,
      longitude,
    },
    Category,
  };

  cityArr.push(cityObj);
};

module.exports = createCitiesData;
