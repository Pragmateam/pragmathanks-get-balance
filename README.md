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

### Running

```
$ make run username=yourname
```

### Testing

```
$ make test
```

### Deploy to AWS Lambda + API GATEWAY

Assuming you have your AWS credentials [in
place](https://www.terraform.io/intro/getting-started/build.html) you can just
call `make deploy`.

Before you go, you must install terraform.

The backend configuration at `infrastructure/main.tf` is loaded by Terraform extremely early, before
the core of Terraform can be initialized. This is necessary because the backend
dictates the behavior of that core. The core is what handles interpolation
processing. Because of this, interpolations cannot be used in backend
configuration.

More details backends are available at https://www.terraform.io/docs/backends

You have to replace the bucket name in order to playaround with terraform.
You'll have to export an environment variable with your s3 bucket, where will be
stored your lambda function.

```
export PRAGMATHANKS_S3_BUCKET=yourbucket
```

```
$ make terraform-install
```

Then you should be ready to deploy your lambda:

```
$ make deploy
```

### Contributing

There are many ways to contribute, such as fixing opened issues, creating them
or suggesting new ideas.
Either way will be very appreciated.

### License

pragmathanks is released under the [MIT License](http://www.opensource.org/licenses/MIT).
