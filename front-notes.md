## React strict

I tried including the ol map in the project and I was observing a weird behavior where useEffect would run
twice for seemingly no reason.
Turns out by default react uses strict mode in development, through wrapping your app in a ReactStrict tag
in the index file. I commented them out for now, I'm not sure if they're going to be useful at some point
in the future so I didn't remove them.

### Authentication

I don't understand how hard (or easy) authentication is supposed to be with a front-end project and a back-end one.
If I don't have to manually manage cookies it should be an experience quite similar to the one I had with just my previous project.
I just need a state variable to check if a user is logged in and maybe a couple of always necessary informations like his/her username
but the authorization part should be handled by the cookie saved in the browser.

The default state of the authentication should not be false but should check whether there is a non-expired cookie in memory and, if
there is, if there's a session connected to it that is authenticated.
Is there a way to check for this without making a server request? I could use local / sessionstorage if it's not for safety but just
for letting the user know whether he's logged in or not. They might become out of sync though if I don't make sure that react updates the
state whenever the session expires.

The safety of data can be handled by the back-end server, the role of the front-end application is just preventing the user from visiting
protected areas when not logged in. If it were able to visit them and the server didn't send data they would just appear empty.
