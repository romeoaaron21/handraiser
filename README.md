# Handraiser Team 3

An application that allows Boom.Camp students to "digitally" raise their hand to
request assistance from a mentor. This makes it easier for Mentors to
efficiently provide assistance and reduces the burden on students to keep
requesting assistance if Mentors forget who is next in the queue.

## SETUP PROJECT

### SETUP FAKEDOMAIN (FOR GOOGLE LOGIN)

1. Copy & paste the command:

   `sudo echo '<IP ADDRESS OF LOCAL SERVER> boom-handraiser.com' | sudo tee -a /etc/hosts`

   example:

   `sudo echo '172.60.61.95 boom-handraiser.com' | sudo tee -a /etc/hosts`

   to setup the fakedomain in your machine.

_this is configured so that google login will work if you access this App to other machine locally_

### Project Init

1. Install dependencies

   `yarn`

2. Start database **(postgres)** using **docker-compose**

   `docker-compose up -d db`

3. Start the App

   `yarn start`

_for admin users sign in page: [Sign-in](boom-handraiser.com:3000/admin/sign-in)_
_default admin account:_
**_username: admin_**
**_password: Admin123_**
