# iso-chidiya-uddi

A multiplayer Chidiya Uddi game built by IndiaSocial (ISO) discord members.

# Rules

If you make GPT write all the code for your PRs, then _aandi mandi sandi..._ applies!

# File system

https://youtu.be/-aqUek49iL8?feature=shared&t=420
We'll follow this file system. This video is important for the frontend guys too to know about the Jinja syntax.

Basically summarizing it,

- The /static directory is for keeping the main contents of the frontend pages. They will be connected using Jinja syntax with the files in the /templates directory.
- The /templates directory will be for the common layouts of the web pages, for example, the website having only the logo, the navbar, the meta tags, the html-head-body tags. Will be connected using Jinja syntax with the files in the /static directory. (Mentioned in Flask docs)
- app.py for setting up the backend with Flask and Python. (Mentioned in Flask docs)
- requirements.txt for naming the libraries which we'll be calling.
