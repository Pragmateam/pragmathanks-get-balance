# pragmathanks-get-balance

[![Build Status](https://travis-ci.org/Pragmateam/pragmathanks-get-balance.svg?branch=master)](https://travis-ci.org/Pragmateam/pragmathanks-get-balance)

Mid 2016 we found that people were regularly bringing this objective to life,
whether it be experimenting with new techniques, organising a learning lunch,
presenting at meetups, all with a positive impact on the rest of the team. But
we were lacking a way to naturally yet formally thank, reward and recognise each
other.

With the introduction of [PragmaThanks](https://pragma.team/blog-list/2017/2/1/pragmathanks)
we now have a cadence to allow reflection and public acknowledgement:

Day to day make a public shoutout on Slack using “PragmaThanks @gtramontina for
organising Friday’s Dojo, so many learnings on TDD. ”
All PragmaThanks are automatically logged within a Google Sheet
At our 8 weekly offsite we lead with the PragmaThanks ceremony, each formally
rewarded PragmaPoint, is gifted as $100 for the recipient to spend on education,
conferences, subscriptions
PragmaThanks has been incredibly successful, so much so that “PragmaThanks” has
formed part of our vocab, both verbally and within Slack dialogue. In our two
months we collectively shared 130 PragmaThanks. Below are examples of the great
work from the team.

### Setup

To ensure you're using the correct node.js version, run this command first:

```
$ nvm use $(cat .nvmrc)
```

Then you can install the dependencies.

```
$ make install
```

### Testing

```
$ make test
```

### Running locally

#### Turn on the Google Sheets API

In order to play around with google API it also required to setup a project on
Google Developers Console. Use [this
wizard](https://console.developers.google.com/start/api?id=sheets.googleapis.com)
to create or select a project in the Google Developers Console and automatically
turn on the API. You can also follow the
[step by step guide](https://developers.google.com/sheets/api/quickstart/nodejs#prerequisites)
an learn how to get all those credentials. At the end you
must export them as environment variables as follows:

```
# setup to deploy with claudia.js
export AWS_REGION='<VALUE>'
export FUNCTION_NAME='<VALUE>'
export CLAUDIA_LAMBDA_ROLE='<VALUE>'
export CLAUDIA_LAMBDA_NAME='<VALUE>'
export CLAUDIA_API_ID='<VALUE>'

# setup for reading data from google sheets
export GOOGLE_CLIENT_ID='<VALUE>'
export GOOGLE_CLIENT_SECRET='<VALUE>'
export GOOGLE_PROJECT_ID='<VALUE>'
export GOOGLE_AUTH_URI='<VALUE>'
export GOOGLE_TOKEN_URI='<VALUE>'
export GOOGLE_AUTH_PROVIDER_CERT_URL='<VALUE>'
export GOOGLE_REDIRECT_URIS_FIRST='<VALUE>'
export GOOGLE_REDIRECT_URIS_LAST='<VALUE>'
export SPREADSHEET_ID='<VALUE>'
export GOOGLE_ACCESS_TOKEN='<VALUE>'
export GOOGLE_REFRESH_TOKEN='<VALUE>'
export GOOGLE_TOKEN_EXPIRY_DATE=<time in miliseconds>
```

Running locally:

```
$ make run username=yourname
```

Deploy to AWS Lambda + API Gateway:

```
$ make deploy
```

### Contributing

There are many ways to contribute, such as fixing opened issues, creating them
or suggesting new ideas.
Either way will be very appreciated.

### License

pragmathanks is released under the [MIT License](http://www.opensource.org/licenses/MIT).
