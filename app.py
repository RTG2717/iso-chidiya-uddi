import pygame
from sys import exit


w = 800
h = 400
'''
w = 1920
h = 1080
'''

pygame.init()
screen = pygame.display.set_mode((w, h))
pygame.display.set_caption("IndiaSocial: Chidiya Udd")
clock = pygame.time.Clock()


prompt_text = pygame.font.Font('fonts/KirangHaerang-Regular.ttf', 27*(int(w/90+h/130))//12)


bg = pygame.Surface((w, h))
bg.fill((251,176,59))
prompt_box = pygame.Surface((w/4,h/10))
# answer_box = pygame.Surface((w/4,h/10))
table = pygame.Surface((w/2, h - h/16*4 - h/10*2))
font_render = prompt_text.render("Prompt: Chidiya", True, 'white')

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()
    
    screen.blit(bg, (0, 0))
    screen.blit(table, (15*w/80 + w/17, 3*h/20))
    # screen.blit(answer_box, (w/8*3, h/16*2))
    screen.blit(prompt_box, ((w/8*3), h - h/16*2 - h/10))
    screen.blit(font_render, ((w/8*3), h - h/16*2 - h/10))
    pygame.display.update()
    clock.tick(60)
