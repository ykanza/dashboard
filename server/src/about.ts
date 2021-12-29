const about = {
    "client": {
        "host": ''
    },
    "server": {
        "current_time": 0,
        "services": [
            {
                "name": "Weather",
                "widgets": [
                    {
                        "name": "Temperature",
                        "description": "Display temperature for a city",
                        "params": [
                            {
                                "name": "city",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "YouTube",
                "widgets": [
                    {
                        "name": "Channel subscribers",
                        "description": "Display the number of subscribers of a youtube channel",
                        "params": [
                            {
                                "name": "channel",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }

                        ]
                    },
                    {
                        "name": "Video views",
                        "description": "Display the number of views of a youtube video",
                        "params": [
                            {
                                "name": "video_name",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    },
                    {
                        "name": "Video comments",
                        "description": "Display the comments of a youtube video",
                        "params": [
                            {
                                "name": "video_name",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Reddit",
                "widgets": [
                    {
                        "name": "Subreddit details",
                        "description": "Display the details about a subreddit",
                        "params": [
                            {
                                "name": "subreddit_name",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Steam",
                "widgets": [
                    {
                        "name": "Number of players",
                        "description": "Display the number of current players in a game",
                        "params": [
                            {
                                "name": "game_id",
                                "type": "integer"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Exchange",
                "widgets": [
                    {
                        "name": "Exchange Rate",
                        "description": "Display the current change of a money",
                        "params": [
                            {
                                "name": "pair",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    },
                    {
                        "name": "Daily evolution",
                        "description": "Display the evolution of a money in percentage",
                        "params": [
                            {
                                "name": "pair",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    }

                ]
            },
            {
                "name": "Cinema",
                "widgets": [
                    {
                        "name": "Movie series List",
                        "description": "Display the movies or series you want",
                        "params": [
                            {
                                "name": "movie_name",
                                "type": "string"
                            },
                            {
                                "name": "type_req_list",
                                "type": "string"
                            },
                            {
                                "name": "timer",
                                "type": "integer"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export default about;
