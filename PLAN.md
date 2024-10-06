# Technologies

- Frontend: React/Vite
- Backend: Python/Flask

# Skills

- RTG -> Python & JS
- Prodigy -> Python
- Clix -> Python & JS
- Giant Jupiter(ISO ka openhiemer) -> Python
- Godfather -> Python & JS
- Spooky -> Python
- Cheemonster & Enchanted -> Project Manager (Add easter eggs for both)


# Flow

1. Send a unique link -> Add the people -> let people choose their name
2. 1 minute time limit -> add as many prompts as you can, with their answers, convert each prompt to lowercase -> andomise each prompt for each player (*we need to save each user's each prompt till the end of game, maybe keep it in some 2D array or something*)
3. for each prompt -> give 2sec to the player to do uddi/not-uddi -> give strike to players who gave wrong answer (+(3 - num_of_strike) point for correct answer, +1.5 for elimination via prompt) -> if strikes == 3 then remove finger of that player
4. Repeat from step-3 till all prompts are over OR only one player is left
5. Repeat from step-2 till only one player is left (eliminated players can add prompts but can't finger)
6. show all user prompts and vote to remove user's prompts & their points


# Others

- The chidiya uddi/not-uddi fingering is done using a slider, if slider goes **69**% then means ussi otherwise not-uddi, **69**% is a threshold if finger goes above it then register that as uddi for that prompt and user *must* bring their finger out of that **69**% zone to be ready for the next prompt (otherwise the uddi will be again registered for next prompt)


# Future Version

- give user the choice to set all the time limits
- Deployyyyyyyyyyy
- _Make it a AI powered Chidiya Uddi_
- remove duplicate prompts
