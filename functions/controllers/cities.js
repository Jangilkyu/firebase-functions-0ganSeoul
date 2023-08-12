const citiesList = require("../utils/citiesList");
const createCitiesData = require("../utils/createCitiesData");
const City = require("../models/City");
const {StatusCodes} = require("http-status-codes");

const createSeoulInitCityAPI = async (req, res) => {
  try {
    const citiesArr = [];
    await Promise.all(citiesList.map((city) => createCitiesData(city, citiesArr)));

    const citiesCount = await City.find();
    if (Array.isArray(citiesCount) && citiesCount.length === 0) {
      try {
        const cityData = new City({cities: citiesArr});
        await cityData.save();
      } catch (error) {
        console.log(error);
      }
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({citiesArr});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
  }
};

module.exports = {
  createSeoulInitCityAPI,
};
