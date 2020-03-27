# bitsy
A URL shortener for the [CODEX](https://www.github.com/codex-iter) community.

## API Endpoints
![GET/uri/all](https://img.shields.io/static/v1?label=GET&message=%2Furi%2Fall&colorB=00cc00&style=flat-square)

GET request for all registered URL and their corresponding short URL and ID
<br>*Requires Authentication*

#### Request Body
`none`

#### Response
| Status Code | Message                      | Reason                                                         |
| :--         | :--------------------------- | :------------------------------------------------------------- |
| 200         | All URI list                 | The list of URLs shortened/registered                          |
| 201         | No URI regisitred            | No URLs has been shortened/registered                          |
| 202         | Error Occured                | Error Occured while shortening the URL                         |

![POST/user/login](https://img.shields.io/static/v1?label=POST&message=%2Fuser%2Flogin&colorB=0000cc&style=flat-square)

POST request to login to the bitsy admin portal

#### Request Body
| Feild        | Description                        | Required |
| :----------- | :--------------------------------- | :------- |
| username     | The username of the CODEX admin    | True     |
| password     | The password of the CODEX admin    | True     |

#### Response
| Status Code | Message                      | Reason                                                         |
| :--         | :--------------------------- | :------------------------------------------------------------- |
| 200         | Logged In Succesfully        | User logged in successfully                                    |

![POST/user/logout](https://img.shields.io/static/v1?label=POST&message=%2Fuser%2Flogout&colorB=0000cc&style=flat-square)

POST request to logout from the bitsy admin portal
<br>*Requires Authentication*

#### Request Body
`none`

#### Response
| Status Code | Message                      | Reason                                                         |
| :--         | :--------------------------- | :------------------------------------------------------------- |
| 200         | Logged Out Succesfully       | User logged out successfully                                   |
| 210         | Not Logged In                | User is not logged in                                          |

![POST/new](https://img.shields.io/static/v1?label=POST&message=%2Fnew&colorB=0000cc&style=flat-square)

POST request to register new URL for shortening
<br>*Requires Authentication*

#### Request Body
| Feild        | Description                        | Required |
| :----------- | :--------------------------------- | :------- |
| uri          | The URL to be shortened            | True     |

#### Response
| Status Code | Message                      | Reason                                                         |
| :--         | :--------------------------- | :------------------------------------------------------------- |
| 200         | Uri Registered Successfully  | User logged out successfully                                   |
| 201         | URI already shortened        | The provided long URL alredy has a shortened URL               |
| 202         | Error Occured                | Error Occured while shortening the URL                         |
| 203         | Invalid URI                  | Invalid long URL was provided                                  |
| 205         | Necessary Parameters Missing | One or More of the required/essential parameter is/are missing |
| 210         | Not Logged In                | User is not logged in                                          |

![POST/delete](https://img.shields.io/static/v1?label=POST&message=%2Fdelete&colorB=0000cc&style=flat-square)

POST request for deleteing an obselete registered URL
<br>*Requires Authentication*

#### Request Body
| Feild        | Description                        | Required |
| :----------- | :--------------------------------- | :------- |
| _id          | The unique ID for the short URL    | True     |
| shortUri     | The shortened URL                  | True     |

#### Response
| Status Code | Message                      | Reason                                                         |
| :--         | :--------------------------- | :------------------------------------------------------------- |
| 200         | Deleted Successfully         | The short URL was deleted successfully                         |
| 201         | URI not found                | No such URL matches the provided ID and short URL              |
| 202         | Error Occured                | Error Occured while shortening the URL                         |
| 205         | Necessary Parameters Missing | One or More of the required/essential parameter is/are missing |
| 210         | Not Logged In                | User is not logged in                                          |