# Grasp 

> HR34 Thesis Project

## Team

  - __Product Owner__: Jeff Campecino, Will Henshaw
  - __Scrum Master__: Abel Wang
  - __Development Team Members__: Abel Wang, Jeff Campecino, Will Henshaw

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Visit our page, currently hosted on AWS http://ec2-52-35-254-62.us-west-2.compute.amazonaws.com:3000/

## Technologies Used

- [Angular](https://angularjs.org)
- [Node](https://nodejs.org/)
- [Socket.IO](www.socket.io/)
- [Express](http://expressjs.com/)
- [Postgres](www.postgresql.org)
- [Knex](http://knexjs.org/) 
- [AWS Deployment](https://aws.amazon.com/)
- [Mocha](https://mochajs.org)
- [Karma](karma-runner.github.io)



## Requirements

- [Node 0.10.x](https://nodejs.org/en/download/)
- [Postgres](http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/)

## Development

### Installing Dependencies

Fork and clone the repository from GitHub

From within the root directory:

```sh
sudo npm install -g bower
npm install
cd public && bower install
```

### Running The App

npm start (for now, go to localhost:8000, and go to /app)
brew info postgres (it will tell you what to run on the last line) then in a seperate terminal 
psql graspdb

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
