# Marvel Cinematic Universe (MCU) API

This is a Marvel Cinematic Universe (MCU) API server that provides information about all Marvel Cinematic Universe(MCU) characters including all movies and tv-shows produced by Marvel Studio.
this api include only mcu characters means characters from X-men, Spiderman and netflix series (Defender saga) excluded.
***
### Base URL

<a href="https://mcu-api-app.herokuapp.com/api/v1/characters">https://mcu-api-app.herokuapp.com/api/v1/characters</a>



### Get specific charater

<a href="https://mcu-api-app.herokuapp.com/api/v1/characters">https://mcu-api-app.herokuapp.com/api/v1/characters</a>/charactername
### Pagination

Return 12 character per page<br>
<a href="https://mcu-api-app.herokuapp.com/api/v1/characters">https://mcu-api-app.herokuapp.com/api/v1/characters</a>/?page=2
***
### Character information

id: unique id of character<br>
name: name of characetr<br>
category: Hero or villain<br>
species: Human/asgardian etc<br>
gender: Male/Female/other <br>
status: Alive or Dead<br>
movie: all movies in character appears <br>
tv_series: all tv-shows in character appears <br>
image URL: https://raw.githubusercontent.com/virangpatel09/MCU-API/main/images/movies/Ant-Man<br>
#### NOTE: add .jpg at the end of the image url
description: Character brief description<br>
***
### API Utilizes:

<ul>
<li>Node js</li>
<li>Mongoose</li>
<li>Express</li>
<li>Heroku</li>
<li>MongoDB / Atlas</li>
</ul>

<hr>

### Status
last movie: Eternals(2021)<br>
last tv-show: Hawkeye(2021)<br>

***

### Reference

"https://www.marvel.com/characters"



