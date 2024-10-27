import pygame
from sys import exit

# resolutions tested

w = 800
h = 400
'''
w = 1920
h = 1080
'''

#initialize, screen (mode and caption), clock
pygame.init()
screen = pygame.display.set_mode((w, h))
pygame.display.set_caption("IndiaSocial: Chidiya Udd")
clock = pygame.time.Clock()

# Fonts (may need to download Kirang Haerang) and keep it in "fonts" folder, which will be in the same place as the python program
prompt_text = pygame.font.Font('fonts/KirangHaerang-Regular.ttf', 27*(int(w/90+h/130))//12)

# Background 
bg = pygame.Surface((w, h))
bg.fill((251,176,59))
# Prompt box
prompt_box = pygame.Surface((w/4,h/10))
prompt_rect = prompt_box.get_rect(midtop=(w/2,h - h/16*2 - h/10))
# # Answer box
# answer_box = pygame.Surface((w/4,h/10))
# answer_rect = answer_box.get_rect(midtop=(w/2, h/16*2))
# Table (and people) box
table = pygame.Surface((w/2, h - h/16*4 - h/10*2))
table_rect = table.get_rect(midtop=(w/2, 3*h/20))
# Fonts
font_render = prompt_text.render("Prompt: Chidiya", True, 'white')
font_rect = font_render.get_rect(center=prompt_rect.center)


# Game starts
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()
    
    screen.blit(bg, (0, 0))
    screen.blit(table, table_rect)
    # screen.blit(answer_box, answer_rect)
    screen.blit(prompt_box, prompt_rect)
    # screen.blit(font_render, ((w/8*3), h - h/16*2 - h/10))
    screen.blit(font_render, font_rect)
    pygame.display.update()
    clock.tick(60)
