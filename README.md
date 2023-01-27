# 06 Server-Side APIs: Weather Dashboard

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```


Github Repo: [https://github.com/jason1chiu/weather-dashboard](https://github.com/jason1chiu/weather-dashboard) <br>
Github Page: [https://jason1chiu.github.io/weather-dashboard/](https://jason1chiu.github.io/weather-dashboard/)


![Screenshot 2023-01-27 at 4 29 26 PM](https://user-images.githubusercontent.com/119711904/215205228-553cd406-09fe-4323-ab43-e2de79b48755.png)
![Screenshot 2023-01-27 at 4 30 00 PM](https://user-images.githubusercontent.com/119711904/215205258-2cfbdbf4-a8f8-4a51-9279-ebc8faf75587.png)
![Screenshot 2023-01-27 at 4 30 09 PM](https://user-images.githubusercontent.com/119711904/215205275-0f2f262c-2203-44ea-a284-b41ad9efc8c9.png)
![Screenshot 2023-01-27 at 4 30 24 PM](https://user-images.githubusercontent.com/119711904/215205291-d2172f3c-4b8e-4a4c-aa4f-19f9a6aaf437.png)
![Screenshot 2023-01-27 at 4 30 31 PM](https://user-images.githubusercontent.com/119711904/215205313-aa41c4c8-cb04-4086-9e47-e6b5e1abe7e8.png)
![Screenshot 2023-01-27 at 4 30 41 PM](https://user-images.githubusercontent.com/119711904/215205327-38eb9ffd-6cc7-423b-bcdb-6fc4a107ee66.png)
![Screenshot 2023-01-27 at 4 30 45 PM](https://user-images.githubusercontent.com/119711904/215205357-653f6a32-f802-44f6-b9aa-a304a794813a.png)

