---
layout: post
title:  "Wordpress on NearlyFreeSpeech"
date:   2013-10-21 13:55:00
---

Last month [NearlyFreeSpeech](http://nearlyfreespeech.net) rolled out new features in the form of new server realms for their users, these realms include Apache 2.4 and PHP 5.4. In addition they have also included the awesome little command line tool [wp-cli](http://wp-cli.org/) for managing your [WordPress](http://wordpress.org) installation. You can read more about the awesome updates that the NFSN team rolled out in their blog post here: [PHP 5.4, PHP 5.5, and Apache 2.4](http://blog.nearlyfreespeech.net/2013/09/21/php-5-4-php-5-5-and-apache-2-4/). In light of these new updates and the inclusion of wp-cli I have decided to write a quick little tutorial about how you can set up a simple little WordPress site in only a couple of minutes!

<!--more-->

This tutorial assumes that you have created a membership with NearlyFreeSpeech, a funds account, and added some money to the account (although you might be able to have the site run for one day using a free trial account). Once you have created your membership, account and added some funds it's time to create a site; log into the NFSN member [control panel](https://members.nearlyfreespeech.net/) and click on the sites tab, here is where you will be creating your first site that will be hosting your blog. Follow the wizard to create your new site, the shortname will be how you reference your site and how you access your site, for this tutorial we will use a shortname of "myawesomeblog". When asked what server type you want to use select "Apache 2.4, PHP 5.4, CGI", this will give you a site that will have PHP enabled and will include the wp-cli tool.

![](http://i.imgur.com/977DjvS.png)

Once we have completed these steps we can access our website by going to `shortname.nfshost.com`, so in our case we can get to our site by visiting `myawesomeblog.nfshost.com`.

Now onto the database, in the member control panel click on the MySQL tab and click "Create a New MySQL Process".

![](http://i.imgur.com/wh45bJq.png)

This will essentially create a MySQL server just for you; you can have multiple users, databases, and tables. Once the server has come online (this usually takes about 3 minutes) you can go to the [phpMyAdmin](https://phpmyadmin.nearlyfreespeech.net) site to administrate the MySQL process. To log in enter the name of your MySQL process that you selected previously with ".db" appended to the end, so if you have a process named "myawesomeblog" the server would be "myawesomeblog.db". For the username and password these are you NFSN member username and password at the time the MySQL process was completed.

![](http://i.imgur.com/bchc2rm.png)

Once we are logged in we can create a database just for your WordPress blog and for added security we will create a specific user so if somehow your site becomes compromised the damage can be mitigated.

![](http://i.imgur.com/NSMqLDT.png)

Click on the Users tab followed by the "Add user" link; a window will come up to create your database user, give it a name like "wordpress" and instead of giving it a password we will generate one. Click the generate button and copy down the resulting password (we only need to remember this for a little bit). Next click the radio button to "Create database with same name and grant all privileges" and finally click the "Add user" button at the bottom to finalize everything.

![](http://i.imgur.com/GzqUcim.png")

We have just created a MySQL server, a new user just for WordPress to use and a database that this user has full access to. In just a moment we will install WordPress, telling it to use this user and database; the WordPress installation will fill the database with all the information it needs and you will have a fully functioning blog in no time.

Time to install WordPress! We will be doing this all through the wp-cli tool which is nice and easy to do, but it is all through the command line. Don't worry though, this part will be nice and detailed to help you every step of the way. Before we can get to the installation we will need to connect to our site through ssh, you can connect using [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) to the host `ssh.phx.nearlyfreespeech.net` with a username as shown in your site information in the NFSN control panel.

![](http://i.imgur.com/wFUsNn7.png)

First we will download all the core WordPress files.

`wp core download`

Now we will configure our installation to connect to our database using the user we made and the generated password.

`wp core config --dbhost=myawesomeblog.db --dbname=wordpress --dbuser=wordpress --dbpass=NTRHHJVqbvfC7VWe`

Let's look at this command in a bit of detail, the `wp core config` is the base command telling the wp-cli tool to start configuring our WordPress install, everything after are the options for our configuration. `--dbhost=myawesomeblog.db` is the host that WordPress will connect to, this is our MySQL process that we've created through the NFSN control panel. `--dbname=wordpress` is the name of the database in our MySQL process, it is in this database that WordPress will store various bits of information such as our posts and comments. `--dbuser=wordpress` is the user that will be used to connect to the database, we could use our NFSN username and password but this will give WordPress **way** too much control over our MySQL process. If our WordPress installation is compromised having a separate user will limit the amount of damage a malicious person can do. Finally, `--dbpass=NTRHHJVqbvfC7VWe` is the password that we've generated.

Now that we have configured the WordPress options it is time to do the final installation, you can do this with the following command:

`wp core install --url=myawesomeblog.nfshost.com --title="My Awesome Blog" --admin_name=matthew --admin_password=mysecretpassword --admin_email=matthew@gmail.com`

Now for the details, `--url=myawesomeblog.nfshost.com` tells our WordPress installation where it can be found on the internet. This is where you will enter in your own shortname for your own site, if you have a domain set up you would enter it here. If I was doing this I would use `--url=mdeabreu.com`. `--title="My Awesome Blog"` is the title of your blog as it will appear on the main page. `--admin_name=matthew` is the first user and the administrator of the blog. `--admin_password=mysecretpassword` is the password for your admin user; and finally, `--admin_email=matthew@gmail.com` is the email address for your admin user. You will receive an email confirmation at this address once the installation is complete.

Now if you visit your site you will see a brand new WordPress installation just begging for some content, click the "Log in" button and log in as the admin user you just created and start posting!

Hopefully this tutorial was helpful, if you have any questions feel free to post a comment and I will try to help as quickly as I can.
