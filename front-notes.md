## React strict

I tried including the ol map in the project and I was observing a weird behavior where useEffect would run
twice for seemingly no reason.
Turns out by default react uses strict mode in development, through wrapping your app in a ReactStrict tag
in the index file. I commented them out for now, I'm not sure if they're going to be useful at some point
in the future so I didn't remove them.
