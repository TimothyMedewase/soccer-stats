const Player = () => {
  const apiKey = process.env.API_KEY;

  const PlayerData = async () => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://sofasport.p.rapidapi.com/v1/players/data",
      params: { player_id: "12994" },
      headers: {
        "x-rapidapi-key": "5c2c6b0adcmshefad5497d038618p1e8e40jsnb0f775ff12f2",
        "x-rapidapi-host": "sofasport.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PlayerData />
    </div>
  );
};

export default Player;
