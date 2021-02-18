---
layout: post
title: Snow, Thoughts about being always online, Flutter
categories: [general]
tags: [disco-tray-studio, flutter, sysadmin]
fullview: true
comments: true
---

Over the past week, Arkansas (and much of the South) has been hit with one of the worst snowstorms in quite some time. At Hendrix, we have had ankle-deep snow and weather as low as -17°C. With weather conditions as unusual as these, several things have occurred. 

Going out to enjoy the temporary nature of conditions such as these during a snow day is a thing of the past. We are living in a strange new world where technology is allowing us to become more and more productive, but at what cost? Will our children know what it is like to take a day off of school or work, or will we be permanently tied to those places (be it rain, sickness, or otherwise), unable to escape?

On the topic of other less philosophical and more concrete changes, it was announced last night that there would likely be rolling blackouts in the area. For most people, this means charging their devices, bundling up, and unplugging any devices that they aren't using. Because I manage a small server in the affected area, I needed to find a way to maintain uptime of the applications even if power was cut. This led to a frantic mission to transfer data between the physical server and Amazon EC2 instances, during which the physical server could go down at any time.

During this time, I made several interesting discoveries:

- Debian on EC2 ships with a different version of Python than the ISO's you can download. No triple quote support here.
- Ubuntu has a but with systemd which wouldn't allow me to run my init scripts :(
- RHEL has depreciated the `screen` package, leading me to reconfigure my systemd services that require it in order to use `tmux`. In addition, SELinux prevents you from running systemd files outside of a certain location.

After all of this was done, I went to straight to bed because it was far past my bedtime. May I sleep well knowing my uptime will be much higher now.

#### Flutter

Over the weekend, I worked on implementing a mockup of the Positive Vibes app in Flutter. At first, I was very confused about the documentation, because I didn't quite understand the concept of widgets at first, nor the concept of stateless and stateful widgets. This initially clicked when I realized the similarities between Swift UI and Flutter, which are libraries that can be used to programmatically create objects to make stuff on the screen.

There isn't a scene builder or a markup language, you must program every action that you see. For some things, it can become quite a time-consuming process, but for other things, it can be much quicker since it automatically adapts based on the device that you are using it on, so that you do not need to use constraints to resize UI. 