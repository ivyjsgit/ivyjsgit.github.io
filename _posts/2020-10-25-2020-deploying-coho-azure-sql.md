---
layout: post
title: Deploying City Of Hope, Azure SQL woes
categories: [general]
tags: [disco-tray-studio, city-of-hope]
fullview: true
comments: true
---
### Deploying Azure SQL for Hendrix Assessment 

Deploying Azure SQL for Hendrix assessment has been relatively difficult this week. For some reason, Hendrix's network blocks all connections to Azure SQL databases, which means that when you try to connect to the database over the school's connections, you are hit with the following error:

`provider: TCP Provider, error: 40 - Could not open a connection to SQL Server`

It took me quite a while to discover that it was the network blocking the connection, rather than configuration issues. I tried everything: checking and rechecking the server's firewall, checking my connection string, etc, and nothing seemed to work. I tried pinging the server, and all of my pings appeared to just drop.

Because of this, I knew something was up. To get around this error, I needed to use a mobile hotspot to get around the blockage. As soon as I did this, the errors were resolved. 

### Github Actions Breaking

While attempting to switch branches for CI/CD, I needed to disconnect the current GitHub actions and create a new set of actions. In order to do this, Azure needed to generate a new pair of secrets for it to use. For some reason, each time that I ran the build after switching branches, the build would fail. When I checked the logs, it read `Publish Profile does not contain kudu URL`.

I have tried several methods to fix this issue such as renaming the `publishURL`, but none of the fixes appear to work. I believe that the recent Active Directory permission restrictions may be to blame because whenever I run the commands to manually grab the secrets GitHub Actions, it gives me an error regarding AD permissions.

Because of this, I have switched the projects to the Kudu build server, and I haven't had any issues with them.

### City Of Hope Deployment

Using the knowledge gained from the Hendrix Assessment project, I was able to successfully deploy the City of Hope website on Azure with an Azure SQL database!

![CoHo]({{site.baseurl}}/assets/media/coho-deployment.png)

In addition, I have learned a few things:

1. Implenting your own logging system to write to files is useless, as Azure handles it much more elegantly. Because of this, have all logging write to the console and then have Azure write it to disk.
2. Either wrap your DB calls in await tags or close the reader for easier times regarding DB locks. 
3. CSS redesign?